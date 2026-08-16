import { EmptyState } from "@/components/studio/empty-state"

export const metadata = {
  title: "Project settings",
}

export default async function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  return (
    <div className="studio-page">
      <h1 className="studio-page-title">Project settings</h1>
      <p className="studio-page-description">
        Theme, visibility, and presentation defaults for {projectId} ship in
        later phases.
      </p>
      <EmptyState
        title="Project settings pending"
        description="Per-project theme tokens and visibility controls arrive with story and publish work."
      />
    </div>
  )
}
