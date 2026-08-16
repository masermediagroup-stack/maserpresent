import { EmptyState } from "@/components/studio/empty-state"

export const metadata = {
  title: "Story",
}

export default async function ProjectStoryPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  return (
    <div className="studio-page">
      <h1 className="studio-page-title">Story</h1>
      <p className="studio-page-description">
        Chapters, slides, and blocks for {projectId} ship in Phase 5.
      </p>
      <EmptyState
        title="Story builder pending"
        description="Chapter tabs, slide order, and block editors arrive in Phase 5."
      />
    </div>
  )
}
