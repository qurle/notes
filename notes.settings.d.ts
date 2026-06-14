// Ambient type for the `@settings` alias -> notes.settings.jsonc.
// TypeScript can't resolve `.jsonc` files, so we describe the shape here.
// Keep this in sync with notes.settings.jsonc.
declare module '@settings' {
  interface FooterLink {
    label: string
    href?: string
    target?: "_blank" | "_self" | "_parent" | "_top"
  }

  const config: {
    title: string
    description: string
    appearance: {
      theme: {
        switch: boolean
        default: "light" | "dark" | "digital"
      }
      font: {
        switch: boolean
        default: "serif" | "mono" | "sans"
      }
    }
    indexable: boolean
    footer: {
      show: boolean
      content: FooterLink[]
    }
  }

  export default config
}
