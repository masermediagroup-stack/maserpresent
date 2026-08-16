import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { StatusBadge } from "@/components/studio/status-badge"

describe("StatusBadge", () => {
  it.each([
    ["draft", "Draft"],
    ["review", "Review"],
    ["published", "Published"],
    ["archived", "Archived"],
  ] as const)("renders %s as %s", (status, label) => {
    render(<StatusBadge status={status} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })
})
