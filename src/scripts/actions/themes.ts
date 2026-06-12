import { createCycler } from './createCycler'

const themes = ['light', 'dark', 'digital']

export const { cycle: cycleThemes, use: useTheme, get: getTheme } = createCycler('theme', themes)
