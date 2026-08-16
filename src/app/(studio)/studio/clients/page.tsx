import { EmptyState } from "@/components/studio/empty-state"
import { Button } from "@/components/ui/button"
import { UsersIcon } from "lucide-react"

export const metadata = {
  title: "Clients",
}

export default function ClientsPage() {
  return (
    <div className="studio-page">
      <div className="flex flex-col gap-1">
        <h1 className="studio-page-title">Clients</h1>
        <p className="studio-page-description">
          Manage client records before attaching projects. Create and archive
          clients in Phase 3.
        </p>
      </div>
      <EmptyState
        icon={UsersIcon}
        title="No clients yet"
        description="Client list, create, and detail views ship in Phase 3."
        action={<Button disabled>Add client</Button>}
      />
    </div>
  )
}
