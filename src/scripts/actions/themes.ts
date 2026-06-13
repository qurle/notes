import { cycle } from '@scripts/utils/cycle'
import { store } from '@scripts/utils/store'

const themes = ['light', 'dark', 'digital']

/** Switch to the next theme and remember it. */
export function cycleThemes() {
	const next = cycle(themes, document.documentElement.dataset.theme)
	store('theme', next)
	return next
}

/** Apply a specific theme, ignoring unknown values. */
export function useTheme(theme: string) {
	if (!themes.includes(theme)) return
	store('theme', theme)
}
