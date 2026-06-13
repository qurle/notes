import { cycle } from '@scripts/utils/cycle'

const restoreKeyPrefix = 'focusRestore:'

/**
 * Wire up keyboard navigation for a folder listing: arrow keys move focus
 * between entries, and focus is restored on return.
 */
export function initFolderNavigation() {
	const links = Array.from(
		document.querySelectorAll<HTMLAnchorElement>('.entries a'),
	)

	const restoreKey = restoreKeyPrefix + window.location.pathname
	let keyboardUsed = false

	// Restore focus when returning from a subfolder entered via keyboard
	const savedHref = sessionStorage.getItem(restoreKey)
	if (savedHref) {
		sessionStorage.removeItem(restoreKey)
		links.find((l) => l.getAttribute('href') === savedHref)?.focus()
	}

	// Save focus target when navigating to any entry via keyboard
	links.forEach((link) => {
		link.addEventListener('click', () => {
			if (keyboardUsed) {
				sessionStorage.setItem(restoreKey, link.getAttribute('href')!)
			}
		})
	})

	document.addEventListener('keydown', (e) => {
		if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
		e.preventDefault()
		keyboardUsed = true

		const current = document.activeElement as HTMLAnchorElement
		const direction = e.key === 'ArrowDown' ? 'next' : 'prev'
		cycle(links, current, direction).focus()
	})
}
