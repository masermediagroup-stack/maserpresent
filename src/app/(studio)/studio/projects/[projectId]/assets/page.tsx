import { EmptyState } from "@/components/studio/empty-state"

export const metadata = {
  title: "Assets",
}

export default async function ProjectAssetsPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  return (
    <div className="studio-page">
      <h1 className="studio-page-title">Assets</h1>
      <p className="studio-page-description">
        Media library for {projectId} ships in Phase 4.
      </p>
      <EmptyState
        title="Asset library pending"
        description="Uploads, tags, and signed downloads arrive in Phase 4."
      />
    </div>
  )
}
