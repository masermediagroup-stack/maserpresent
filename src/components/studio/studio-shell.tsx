import { StudioSidebar } from "@/components/studio/studio-sidebar"
import { StudioTopbar } from "@/components/studio/studio-topbar"

type StudioShellProps = {
  title?: string
  children: React.ReactNode
}

export function StudioShell({ title, children }: StudioShellProps) {
  return (
    <div className="studio-shell flex min-h-dvh bg-background text-foreground">
      <StudioSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <StudioTopbar title={title} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
