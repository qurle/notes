/**
 * True when the user is typing into a field (input, textarea, or
 * contenteditable). Used to stop global keyboard shortcuts from hijacking
 * keystrokes meant for the search box.
 */
export function isTyping() {
	const el = document.activeElement
	return (
		el instanceof HTMLElement &&
		(el.tagName === 'INPUT' ||
			el.tagName === 'TEXTAREA' ||
			el.isContentEditable)
	)
}
