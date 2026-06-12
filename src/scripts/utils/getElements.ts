// Little helper that casts everything
// as HTML elements or HTML Collections
export function getByClass(className: string, parent?: HTMLElement, multiple?: false): HTMLElement
export function getByClass(className: string, parent?: HTMLElement, multiple?: true): HTMLCollectionOf<HTMLElement>
export function getByClass(
	className: string,
	parent: HTMLElement = document.documentElement,
	multiple = false,
) {
	const elements = parent.getElementsByClassName(
		className,
	) as HTMLCollectionOf<HTMLElement>
	return multiple ? elements : elements[0]
}
