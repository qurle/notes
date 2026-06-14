import fuzzysort from 'fuzzysort'

type Entry = { name: string; href: string; type: 'folder' | 'page' }

function escapeHtml(s: string) {
	return s.replace(
		/[&<>"]/g,
		(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!,
	)
}

/** 
 * One result row; matched parts wrapped in <mark>, every segment escaped. 
 * */
function resultHtml(result: Fuzzysort.KeyResult<Entry>) {
	const { href, type } = result.obj
	// fuzzysort's highlight doesn't escape, so escape every segment ourselves
	const label = result
		.highlight((match) => ({ match }))
		.map((part) =>
			typeof part === 'string'
				? escapeHtml(part)
				: `<mark>${escapeHtml(part.match)}</mark>`,
		)
		.join('')
	const cls = type === 'folder' ? ' class="folder"' : ''
	return `<li${cls}><a href="${escapeHtml(href)}">${label}</a></li>`
}

/** 
 * Change URL without affecting history
 */
function setUrl(query: string | null) {
	const url = new URL(window.location.href)
	if (query) url.searchParams.set('s', query)
	else url.searchParams.delete('s')
	history.replaceState(null, '', url)
}

/**
 * Scoped, in-folder fuzzy search. Folders and pages of the current listing are
 * mixed into one ranked list. The query lives in the `?s=` URL param while in
 * search mode and is removed on exit (Escape or the close button). While the
 * box is focused and non-empty the first result is preselected (shown via
 * `.selected`); arrows move that selection (navigate.ts) and Enter follows it.
 * Cmd/Ctrl+F focuses the box. Leaves the server-rendered listing untouched when
 * idle.
 */
export function initSearch() {
	const input = document.querySelector<HTMLInputElement>('.search-input')
	const clearBtn = document.querySelector<HTMLButtonElement>('.search-clear')
	const entries = document.querySelector<HTMLUListElement>('.entries')
	const dataEl = document.getElementById('search-data')
	if (!input || !clearBtn || !entries || !dataEl) return

	const items: Entry[] = JSON.parse(dataEl.textContent || '[]')
	// The original listing, restored verbatim when search mode is left.
	const original = entries.innerHTML

	function links() {
		return Array.from(entries.querySelectorAll<HTMLAnchorElement>('a'))
	}
	function clearSelected() {
		links().forEach((a) => a.classList.remove('selected'))
	}
	// First result is preselected while the box holds focus; Enter follows it.
	function selectFirst() {
		clearSelected()
		links()[0]?.classList.add('selected')
	}

	function render(query: string) {
		// threshold: 0 (any match) … 1 (perfect) — higher is less fuzzy
		const results = fuzzysort.go(query, items, {
			key: 'name',
			limit: 100,
			threshold: 0.5,
		})
		if (!results.length) {
			entries.innerHTML = `<li class="search-empty">nothing here</li>`
			return
		}
		entries.innerHTML = results.map(resultHtml).join('')
		selectFirst()
	}

	function apply(value: string) {
		const query = value.trim()
		if (!query) {
			entries.innerHTML = original
			clearBtn.hidden = true
			setUrl(null)
			return
		}
		render(query)
		clearBtn.hidden = false
		setUrl(query)
	}

	function leave() {
		input.value = ''
		apply('')
		input.blur()
	}

	input.addEventListener('input', () => apply(input.value))
	clearBtn.addEventListener('click', leave)
	// Preselection only shows while the box itself holds focus
	input.addEventListener('focus', () => input.value.trim() && selectFirst())
	input.addEventListener('blur', clearSelected)

	document.addEventListener('keydown', (e) => {
		// Cmd/Ctrl+F focuses the search box (overriding find-in-page)
		if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
			e.preventDefault()
			input.focus()
			input.select()
			return
		}
		if (e.key === 'Escape') {
			leave()
			return
		}
		// While typing, Enter follows the preselected result (else the first)
		if (
			e.key === 'Enter' &&
			document.activeElement === input &&
			input.value.trim()
		) {
			e.preventDefault()
			const target =
				links().find((a) => a.classList.contains('selected')) ?? links()[0]
			target?.click()
		}
	})

	// Restore search mode from a shared/reloaded `?s=` link.
	const initial = new URL(window.location.href).searchParams.get('s')
	if (!initial) return
	input.value = initial
	apply(initial)
	input.focus()
}
