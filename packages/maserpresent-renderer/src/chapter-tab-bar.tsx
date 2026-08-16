"use client"

import type { ChapterTab } from "./types"

type ChapterTabBarProps = {
  chapters: ChapterTab[]
  activeChapterId?: string
  onChapterSelect?: (chapterId: string) => void
}

export function ChapterTabBar({
  chapters,
  activeChapterId,
  onChapterSelect,
}: ChapterTabBarProps) {
  return (
    <nav className="maserpresent-deck__tabbar" aria-label="Presentation chapters">
      {chapters.map((chapter) => {
        const isActive = chapter.id === activeChapterId

        return (
          <button
            key={chapter.id}
            type="button"
            className="maserpresent-deck__tab"
            data-active={isActive ? "true" : "false"}
            aria-current={isActive ? "page" : undefined}
            onClick={onChapterSelect ? () => onChapterSelect(chapter.id) : undefined}
          >
            <span className="maserpresent-deck__tab-label">{chapter.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
