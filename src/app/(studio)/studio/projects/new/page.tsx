import { EmptyState } from "@/components/studio/empty-state"

export const metadata = {
  title: "New project",
}

export default function NewProjectPage() {
  return (
    <div className="studio-page">
      <div className="flex flex-col gap-1">
        <h1 className="studio-page-title">New project</h1>
        <p className="studio-page-description">
          Project creation form ships in Phase 3.
        </p>
      </div>
      <EmptyState
        title="Project wizard not wired"
        description="Overview fields, slug validation, and client assignment arrive in Phase 3."
      />
    </div>
  )
}
