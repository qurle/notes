/** Get the next or previous value in a list, looping back around. */
export function cycle<T>(array: T[], current: T | undefined, direction: 'next' | 'prev' = 'next') {
	const index = array.indexOf(current as T)
	if (index < 0) return direction === 'next' ? array[0] : array[array.length - 1]
	const step = direction === 'next' ? 1 : -1
	return array[(index + step + array.length) % array.length]
}
