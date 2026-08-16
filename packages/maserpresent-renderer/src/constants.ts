export const DECK_CSS_VARS = {
  stageBg: "--deck-stage-bg",
  stageFg: "--deck-stage-fg",
  barBg: "--deck-bar-bg",
  barHeight: "--deck-bar-height",
  tabFg: "--deck-tab-fg",
  tabActiveBg: "--deck-tab-active-bg",
  arrowSize: "--deck-arrow-size",
  arrowBg: "--deck-arrow-bg",
  arrowFg: "--deck-arrow-fg",
} as const

/** Optional brand-identity starter labels from the Figma mock. */
export const IDENTITY_CHAPTER_STARTER_LABELS = [
  "Typography",
  "Logo",
  "Brand Design",
  "Do's and Don'ts",
  "Look Book",
] as const

export const defaultPresentationTheme = {
  background: "#ffffff",
  foreground: "#151515",
  accent: "#222222",
  displayFont: "var(--font-sans, Inter, system-ui, sans-serif)",
  bodyFont: "var(--font-sans, Inter, system-ui, sans-serif)",
  mediaRadius: "0px",
  transitionStyle: "slide",
} as const
