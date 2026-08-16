import type { Metadata } from "next"

import { product } from "@/config/product"

export const metadata: Metadata = {
  title: "Sign in",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm">
        <p className="mb-6 text-center text-xs text-muted-foreground">
          {product.name}
        </p>
        {children}
      </div>
    </div>
  )
}
