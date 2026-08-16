import { ProjectSubnav } from "@/components/studio/project-subnav"

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  return (
    <>
      <ProjectSubnav projectId={projectId} />
      {children}
    </>
  )
}
