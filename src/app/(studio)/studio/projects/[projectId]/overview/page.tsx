import { EmptyState } from "@/components/studio/empty-state"
import { StatusBadge } from "@/components/studio/status-badge"

export const metadata = {
  title: "Overview",
}

export default async function ProjectOverviewPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  return (
    <div className="studio-page">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="studio-page-title">Overview</h1>
        <StatusBadge status="draft" />
      </div>
      <p className="studio-page-description">
        Project {projectId} — title, client, slug, summary, and status fields
        ship in Phase 3.
      </p>
      <EmptyState
        title="Overview editor pending"
        description="Editable project metadata and hero selection arrive in Phase 3."
      />
    </div>
  )
}
