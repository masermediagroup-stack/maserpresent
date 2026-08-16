export const product = {
  name: "Maserpresent",
  slug: "maserpresent",
  publicOrigin:
    process.env.NEXT_PUBLIC_PUBLIC_ORIGIN ?? "https://masermedia.co",
  studioOrigin:
    process.env.NEXT_PUBLIC_STUDIO_ORIGIN ?? "http://localhost:3000",
} as const

export type ProductConfig = typeof product
