/**
 * Create value-unique array from original one
 */
export function unique(array: any[]) {
	return [...new Set(array)]
}