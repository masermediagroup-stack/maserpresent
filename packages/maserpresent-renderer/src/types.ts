export type PresentationTransitionStyle = "slide" | "fade" | "none"

export type PresentationTheme = {
  background: string
  foreground: string
  accent: string
  displayFont: string
  bodyFont: string
  mediaRadius: string
  transitionStyle: PresentationTransitionStyle
}

export type ChapterTab = {
  id: string
  label: string
}

export type DeckChromeProps = {
  chapters: ChapterTab[]
  activeChapterId?: string
  showPrevious?: boolean
  showNext?: boolean
  onPrevious?: () => void
  onNext?: () => void
  onChapterSelect?: (chapterId: string) => void
  children: React.ReactNode
}
