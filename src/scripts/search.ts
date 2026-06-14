import fuzzysort from 'fuzzysort'

type Entry = { name: string; href: string; type: 'folder' | 'page' }

/**
 * Scoped, in-folder fuzzy search. Folders and pages of the current listing are
 * mixed into one ranked list. The query lives in the `?s=` URL param while in
 * search mode and is removed on exit (Escape or the close button). The first
 * result is preselected — arrow keys move the selection and Enter follows it,
 * all without leaving the input; Cmd/Ctrl+F focuses the box. Leaves the
 * server-rendered listing untouched when not searching.
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

	const escapeHtml = (s: string) =>
		s.replace(
			/[&<>"]/g,
			(c) =>
				({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!,
		)

	let activeIndex = -1
	const links = () =>
		Array.from(entries!.querySelectorAll<HTMLAnchorElement>('a'))

	// Mark the active result — the one Enter follows. Index wraps around.
	function setActive(i: number) {
		const ls = links()
		if (!ls.length) {
			activeIndex = -1
			return
		}
		activeIndex = ((i % ls.length) + ls.length) % ls.length
		ls.forEach((a, idx) => a.classList.toggle('selected', idx === activeIndex))
		ls[activeIndex].scrollIntoView({ block: 'nearest' })
	}

	function render(query: string) {
		// threshold: 0 (any match) … 1 (perfect) — higher is less fuzzy
		const results = fuzzysort.go(query, items, {
			key: 'name',
			limit: 100,
			threshold: 0.5,
		})
		if (!results.length) {
			entries!.innerHTML = `<li class="search-empty">nothing here</li>`
			activeIndex = -1
			return
		}
		entries!.innerHTML = results
			.map((r) => {
				const { href, type } = r.obj
				// fuzzysort's highlight doesn't escape, so escape every segment
				// ourselves and wrap only the matched parts in <mark>
				const label = r
					.highlight((match) => ({ match }))
					.map((part) =>
						typeof part === 'string'
							? escapeHtml(part)
							: `<mark>${escapeHtml(part.match)}</mark>`,
					)
					.join('')
				const cls = type === 'folder' ? ' class="folder"' : ''
				return `<li${cls}><a href="${escapeHtml(href)}">${label}</a></li>`
			})
			.join('')
		setActive(0)
	}

	function setUrl(query: string | null) {
		const url = new URL(window.location.href)
		if (query) url.searchParams.set('s', query)
		else url.searchParams.delete('s')
		// replaceState keeps every keystroke out of the back/forward history
		history.replaceState(null, '', url)
	}

	function apply(value: string) {
		const query = value.trim()
		if (query) {
			render(query)
			clearBtn!.hidden = false
			setUrl(query)
		} else {
			entries!.innerHTML = original
			activeIndex = -1
			clearBtn!.hidden = true
			setUrl(null)
		}
	}

	function leave() {
		input!.value = ''
		apply('')
		input!.blur()
	}

	input.addEventListener('input', () => apply(input.value))
	clearBtn.addEventListener('click', leave)

	document.addEventListener('keydown', (e) => {
		// Cmd/Ctrl+F focuses the search box (overriding find-in-page)
		if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
			e.preventDefault()
			input!.focus()
			input!.select()
			return
		}
		if (e.key === 'Escape') {
			leave()
			return
		}
		// Arrow keys move the selection and Enter follows it, all while the
		// input keeps focus
		if (document.activeElement !== input || !input!.value.trim()) return
		if (!links().length) return
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault()
				setActive(activeIndex + 1)
				break
			case 'ArrowUp':
				e.preventDefault()
				setActive(activeIndex - 1)
				break
			case 'Enter':
				e.preventDefault()
				links()[activeIndex]?.click()
				break
		}
	})

	// Restore search mode from a shared/reloaded `?s=` link.
	const initial = new URL(window.location.href).searchParams.get('s')
	if (initial) {
		input.value = initial
		apply(initial)
		input.focus()
	}
}
