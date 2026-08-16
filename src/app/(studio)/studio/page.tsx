import Link from "next/link"
import { PlusIcon } from "lucide-react"

import { EmptyState } from "@/components/studio/empty-state"
import { StatusBadge } from "@/components/studio/status-badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Dashboard",
}

const placeholderProjects = [
  {
    id: "northline",
    title: "Northline Public Market",
    status: "draft" as const,
    client: "Northline",
  },
]

export default function StudioDashboardPage() {
  return (
    <div className="studio-page">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="studio-page-title">Dashboard</h1>
          <p className="studio-page-description">
            Recent case studies and brand-identity projects. Phase 3 adds live
            data and filters.
          </p>
        </div>
        <Button render={<Link href="/studio/projects/new" />}>
          <PlusIcon data-icon="inline-start" />
          New project
        </Button>
      </div>

      <section aria-labelledby="recent-projects-heading">
        <h2 id="recent-projects-heading" className="mb-3 text-sm font-medium">
          Recent projects
        </h2>
        <ul className="divide-y border">
          {placeholderProjects.map((project) => (
            <li key={project.id}>
              <Link
                href={`/studio/projects/${project.id}/overview`}
                className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-muted/50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{project.title}</p>
                  <p className="text-xs text-muted-foreground">{project.client}</p>
                </div>
                <StatusBadge status={project.status} />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="loading-preview-heading" className="hidden sm:block">
        <h2 id="loading-preview-heading" className="sr-only">
          Loading preview
        </h2>
        <Skeleton className="h-24 w-full" />
      </section>

      <EmptyState
        title="No client activity yet"
        description="Sharing, review links, and publish status appear here after Phase 3."
      />
    </div>
  )
}
