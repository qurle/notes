/** Apply a value to the root element's dataset and persist it to localStorage. */
export function store(key: string, value: string) {
	document.documentElement.dataset[key] = value
	localStorage.setItem(key, value)
}
