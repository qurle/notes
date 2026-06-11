export function autoNoteLayout() {
  return (_tree, file) => {
    const frontmatter = file.data.astro?.frontmatter

    if (frontmatter && !frontmatter.layout) {
      frontmatter.layout = '@layouts/NoteLayout.astro'
    }
  }
}
