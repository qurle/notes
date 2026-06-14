import { cycle } from '@scripts/utils/cycle'

const restoreKeyPrefix = 'focusRestore:'

function getLinks() {
	return Array.from(document.querySelectorAll<HTMLAnchorElement>('.entries a'))
}

/**
 * Cycle through search and entries and pseudo focus entries when searching 
 */
export function initFolderNavigation() {
	const restoreKey = restoreKeyPrefix + window.location.pathname

	// Restore focus when returning from a subfolder entered via keyboard
	const savedHref = sessionStorage.getItem(restoreKey)
	if (savedHref) {
		sessionStorage.removeItem(restoreKey)
		getLinks()
			.find((l) => l.getAttribute('href') === savedHref)
			?.focus()
	}

	// Enter fires a click with detail 0; remember that entry so focus can be
	// restored on return. Delegated so it covers search results rendered later.
	document.addEventListener('click', (e) => {
		const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
			'.entries a',
		)
		if (!link || e.detail !== 0) return
		sessionStorage.setItem(restoreKey, link.getAttribute('href')!)
	})

	// Arrows cycle the box with the entries — they fire even while typing (no text)
	document.addEventListener('keydown', (e) => {
		if (e.code !== 'ArrowDown' && e.code !== 'ArrowUp') return
		if (e.metaKey || e.ctrlKey || e.altKey) return

		const links = getLinks()
		const search = document.querySelector<HTMLInputElement>('.search-input')
		const active = document.activeElement as HTMLElement
		const dir = e.code === 'ArrowDown' ? 'next' : 'prev'

		// Non-empty query: keep focus on the box, move the `.selected` pseudo-focus
		if (search && active === search && search.value.trim() && links.length) {
			const current =
				links.find((a) => a.classList.contains('selected')) ?? links[0]
			const next = cycle(links, current, dir)
			links.forEach((a) => a.classList.toggle('selected', a === next))
			next.scrollIntoView({ block: 'nearest' })
			e.preventDefault()
			return
		}

		// Move real focus, cycling the box with the entries; from an unfocused
		// state ArrowDown jumps straight to the first entry (skipping the box)
		const order: HTMLElement[] = search ? [search, ...links] : links
		if (!order.length) return
		const current = order.includes(active) ? active : undefined
		const target =
			!current && dir === 'next'
				? (links[0] ?? order[0])
				: cycle(order, current, dir)
		e.preventDefault()
		target?.focus()
	})
}
