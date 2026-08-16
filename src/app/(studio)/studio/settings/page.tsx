import { EmptyState } from "@/components/studio/empty-state"

export const metadata = {
  title: "Settings",
}

export default function StudioSettingsPage() {
  return (
    <div className="studio-page">
      <div className="flex flex-col gap-1">
        <h1 className="studio-page-title">Studio settings</h1>
        <p className="studio-page-description">
          Studio name, mark, accent, and contact details for chrome. Phase 8
          wires persistence.
        </p>
      </div>
      <EmptyState
        title="Defaults in use"
        description="Global studio appearance settings are not editable until Phase 8."
      />
    </div>
  )
}
