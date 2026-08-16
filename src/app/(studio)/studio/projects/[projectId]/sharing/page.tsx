import { EmptyState } from "@/components/studio/empty-state"
import { product } from "@/config/product"

export const metadata = {
  title: "Sharing",
}

export default async function ProjectSharingPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  return (
    <div className="studio-page">
      <h1 className="studio-page-title">Sharing</h1>
      <p className="studio-page-description">
        Private review at {product.publicOrigin}/p/[slug] and publish to Work
        ship in Phase 7. Until the maser-media PR lands, copied URLs 404 on
        production.
      </p>
      <EmptyState
        title={`Sharing for ${projectId} pending`}
        description="Review links, passcodes, and publish controls arrive in Phase 7."
      />
    </div>
  )
}
