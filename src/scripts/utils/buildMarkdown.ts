import type { CollectionEntry } from "astro:content";

export function buildMarkdown(entry: CollectionEntry<'skills'>) {
	let md = ''
	const frontmatter = entry.rendered?.metadata?.frontmatter
	if (frontmatter) {
		md += `---\n${Object.entries(frontmatter).map(([k, v]) => `${k}: ${v}`).join('\n')}\n---\n`
	}
	md += entry.body
	return md
}