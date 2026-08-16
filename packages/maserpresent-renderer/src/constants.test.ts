import { describe, expect, it } from "vitest"

import { IDENTITY_CHAPTER_STARTER_LABELS } from "./constants"

describe("IDENTITY_CHAPTER_STARTER_LABELS", () => {
  it("matches the Figma identity starter set", () => {
    expect(IDENTITY_CHAPTER_STARTER_LABELS).toEqual([
      "Typography",
      "Logo",
      "Brand Design",
      "Do's and Don'ts",
      "Look Book",
    ])
  })
})
