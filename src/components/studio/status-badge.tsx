import { cva, type VariantProps } from "class-variance-authority"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva("", {
  variants: {
    status: {
      draft: "bg-muted text-muted-foreground",
      review: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
      published: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
      archived: "bg-secondary text-secondary-foreground",
    },
  },
  defaultVariants: {
    status: "draft",
  },
})

const statusLabels = {
  draft: "Draft",
  review: "Review",
  published: "Published",
  archived: "Archived",
} as const

export type ProjectStatus = keyof typeof statusLabels

type StatusBadgeProps = VariantProps<typeof statusBadgeVariants> & {
  status: ProjectStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(statusBadgeVariants({ status }), className)}
    >
      {statusLabels[status]}
    </Badge>
  )
}
