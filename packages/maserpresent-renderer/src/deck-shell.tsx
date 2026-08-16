"use client"

import type { DeckChromeProps } from "./types"
import { ChapterTabBar } from "./chapter-tab-bar"
import { DeckArrow } from "./deck-arrow"
import { Stage } from "./stage"

export function DeckShell({
  chapters,
  activeChapterId,
  showPrevious = false,
  showNext = false,
  onPrevious,
  onNext,
  onChapterSelect,
  children,
}: DeckChromeProps) {
  return (
    <div className="maserpresent-deck">
      <div className="maserpresent-deck__frame">
        <Stage>{children}</Stage>
        {showPrevious ? (
          <DeckArrow direction="previous" onClick={onPrevious} />
        ) : null}
        {showNext ? <DeckArrow direction="next" onClick={onNext} /> : null}
      </div>
      <ChapterTabBar
        chapters={chapters}
        activeChapterId={activeChapterId}
        onChapterSelect={onChapterSelect}
      />
    </div>
  )
}
