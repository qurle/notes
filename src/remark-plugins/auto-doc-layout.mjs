export function autoDocLayout() {
  return (_tree, file) => {
    const frontmatter = file.data.astro?.frontmatter

    if (frontmatter && !frontmatter.layout) {
      frontmatter.layout = '@layouts/DocLayout.astro'
    }
  }
}
