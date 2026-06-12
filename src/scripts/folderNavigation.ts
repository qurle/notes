const restoreKeyPrefix = 'focusRestore:'

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
		if (e.key === 'Escape') {
			document.querySelector<HTMLAnchorElement>('.back')?.click()
			return
		}
		if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
		e.preventDefault()
		keyboardUsed = true

		const idx = links.indexOf(document.activeElement as HTMLAnchorElement)
		const next =
			e.key === 'ArrowDown'
				? idx === -1
					? 0
					: (idx + 1) % links.length
				: idx === -1
					? links.length - 1
					: (idx - 1 + links.length) % links.length
		links[next].focus()
	})
}
