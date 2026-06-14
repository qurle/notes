import { cycle } from '@scripts/utils/cycle'
import { store } from '@scripts/utils/store'

const themes = ['light', 'dark', 'digital']

const themeColors: Record<string, string> = {
	light: '#f8f8f8',
	dark: '#161616',
	digital: '#001108',
}

/** Match the browser chrome (address bar) color to the active theme. */
function setThemeColor(theme: string) {
	const meta = document.querySelector('meta[name="theme-color"]')
	meta?.setAttribute('content', themeColors[theme] ?? themeColors.light)
}

/** Switch to the next theme and remember it. */
export function cycleThemes() {
	const next = cycle(themes, document.documentElement.dataset.theme)
	store('theme', next)
	setThemeColor(next)
	return next
}

/** Apply a specific theme, ignoring unknown values. */
export function useTheme(theme: string) {
	if (!themes.includes(theme)) return
	store('theme', theme)
	setThemeColor(theme)
}
