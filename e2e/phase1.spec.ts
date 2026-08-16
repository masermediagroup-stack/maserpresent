import { test, expect } from "@playwright/test"

import { product } from "../src/config/product"

test.describe("Studio shell", () => {
  test("dashboard shows sidebar and product name", async ({ page }) => {
    await page.goto("/studio")

    await expect(page.getByRole("link", { name: product.name })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible()
    await expect(page.getByRole("navigation", { name: "Studio" })).toBeVisible()
  })
})

test.describe("Presentation deck shell", () => {
  test("demo shows stage, tabs, and next-only arrow", async ({ page }) => {
    await page.goto("/present/demo")

    await expect(page.getByText("Welcome to")).toBeVisible()
    await expect(page.getByRole("navigation", { name: "Presentation chapters" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Typography" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Look Book" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Next slide" })).toBeVisible()
    await expect(page.getByRole("button", { name: "Previous slide" })).toHaveCount(0)
  })
})
