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
	if (!links.length) return

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
		// Never hijack browser shortcuts (e.g. Cmd+J)
		if (e.metaKey || e.ctrlKey || e.altKey) return

		const current = document.activeElement as HTMLAnchorElement
		let target: HTMLAnchorElement | undefined

		// Arrow keys, plus Vim motions (j/k to move, g/G to jump to ends)
		switch (e.code) {
			case 'ArrowDown':
			case 'KeyJ':
				target = cycle(links, current, 'next')
				break
			case 'ArrowUp':
			case 'KeyK':
				target = cycle(links, current, 'prev')
				break
			case 'KeyG':
				target = links[0]
				break
			default:
				return
		}

		if (e.shiftKey && e.code === 'KeyG')
			target = links[links.length - 1]

		e.preventDefault()
		keyboardUsed = true
		target.focus()
	})
}
