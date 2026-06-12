export function createCycler(key: string, options: string[]) {
	function cycle() {
		const dataValue = document.documentElement.dataset[key]
		const current = options.indexOf(dataValue || '')
		const nextValue = current < 0 ? options[0] : options[(current + 1) % options.length]
		document.documentElement.dataset[key] = nextValue
		localStorage.setItem(key, nextValue)
		return nextValue
	}

	function use(value: string) {
		if (!options.includes(value)) return
		document.documentElement.dataset[key] = value
		localStorage.setItem(key, value)
	}

	function get() {
		return document.documentElement.dataset[key]
	}

	return { cycle, use, get }
}
