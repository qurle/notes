import { cycle } from '@scripts/utils/cycle'
import { store } from '@scripts/utils/store'

const fonts = ['serif', 'mono', 'sans']

/** Switch to the next font and remember it. */
export function cycleFonts() {
	const next = cycle(fonts, document.documentElement.dataset.font)
	store('font', next)
	return next
}

/** Apply a specific font, ignoring unknown values. */
export function useFont(font: string) {
	if (!fonts.includes(font)) return
	store('font', font)
}
