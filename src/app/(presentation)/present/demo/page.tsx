import {
  DeckShell,
  IDENTITY_CHAPTER_STARTER_LABELS,
} from "@maser/maserpresent-renderer"

const chapters = IDENTITY_CHAPTER_STARTER_LABELS.map((label, index) => ({
  id: `chapter-${index + 1}`,
  label,
}))

export default function PresentationDemoPage() {
  return (
    <DeckShell
      chapters={chapters}
      activeChapterId={chapters[0]?.id}
      showNext
    >
      <div className="flex flex-col items-center gap-4 px-8 text-center">
        <p className="text-2xl text-[#151515]">Welcome to</p>
        <p
          className="text-5xl font-semibold tracking-tight text-[#151515] sm:text-6xl"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Maser Media
        </p>
        <p className="text-lg text-[#151515]/80">By MaserMedia</p>
      </div>
    </DeckShell>
  )
}
