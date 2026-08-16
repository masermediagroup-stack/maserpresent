"use client"

type DeckArrowProps = {
  direction: "previous" | "next"
  onClick?: () => void
  disabled?: boolean
}

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      aria-hidden
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "previous" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  )
}

export function DeckArrow({ direction, onClick, disabled }: DeckArrowProps) {
  const label =
    direction === "previous" ? "Previous slide" : "Next slide"

  return (
    <button
      type="button"
      className={`maserpresent-deck__arrow maserpresent-deck__arrow--${direction}`}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      <ArrowIcon direction={direction} />
    </button>
  )
}
