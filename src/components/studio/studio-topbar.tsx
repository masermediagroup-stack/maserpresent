import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type StudioTopbarProps = {
  title?: string
}

export function StudioTopbar({ title }: StudioTopbarProps) {
  return (
    <header className="studio-topbar flex items-center justify-between gap-4 bg-background px-4">
      <div className="min-w-0">
        {title ? (
          <h1 className="truncate text-sm font-medium">{title}</h1>
        ) : (
          <span className="text-sm text-muted-foreground">Studio</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground" aria-live="polite">
          Saved
        </span>
        <Separator orientation="vertical" className="h-4" />
        <Button variant="outline" size="sm" render={<Link href="/present/demo" />}>
          Preview
          <ExternalLinkIcon data-icon="inline-end" />
        </Button>
      </div>
    </header>
  )
}
