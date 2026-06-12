export function indexOfChar(str: string, char: string, occurance = 1) {
	let count = 0
	for (let i = 0; i < str.length; i++) {
		if (str[i] === char) count++
		if (count === occurance) return i
	}
	return -1
}