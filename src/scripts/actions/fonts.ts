import { createCycler } from './createCycler'

const fonts = ['serif', 'mono', 'sans']

export const { cycle: cycleFonts, use: useFont } = createCycler('font', fonts)
