import { describe, expect, it } from "vitest"

import { product } from "@/config/product"

describe("product config", () => {
  it("exposes the Maserpresent name and slug", () => {
    expect(product.name).toBe("Maserpresent")
    expect(product.slug).toBe("maserpresent")
  })

  it("defines public and studio origins", () => {
    expect(product.publicOrigin).toContain("masermedia.co")
    expect(product.studioOrigin).toBeTruthy()
  })
})
