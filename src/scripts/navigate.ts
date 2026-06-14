import { cycle } from '@scripts/utils/cycle'
import { isTyping } from '@scripts/utils/isTyping'

const restoreKeyPrefix = 'focusRestore:'

/**
 * Wire up keyboard navigation for a folder listing: arrow keys move focus
 * between entries, and focus is restored on return. Links are read fresh on
 * each keypress so navigation keeps working after search swaps the listing.
 */
export function initFolderNavigation() {
	const getLinks = () =>
		Array.from(document.querySelectorAll<HTMLAnchorElement>('.entries a'))

	const restoreKey = restoreKeyPrefix + window.location.pathname
	let keyboardUsed = false

	// Restore focus when returning from a subfolder entered via keyboard
	const savedHref = sessionStorage.getItem(restoreKey)
	if (savedHref) {
		sessionStorage.removeItem(restoreKey)
		getLinks()
			.find((l) => l.getAttribute('href') === savedHref)
			?.focus()
	}

	// Save focus target when navigating to any entry via keyboard. Delegated so
	// it covers search-result links rendered after load too.
	document.addEventListener('click', (e) => {
		const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(
			'.entries a',
		)
		if (link && keyboardUsed) {
			sessionStorage.setItem(restoreKey, link.getAttribute('href')!)
		}
	})

	document.addEventListener('keydown', (e) => {
		// Never hijack browser shortcuts (e.g. Cmd+J) or typing in the search box
		if (e.metaKey || e.ctrlKey || e.altKey) return
		if (isTyping()) return

		const links = getLinks()
		if (!links.length) return

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

		if (e.shiftKey && e.code === 'KeyG') target = links[links.length - 1]

		e.preventDefault()
		keyboardUsed = true
		target?.focus()
	})
}
