import { redirect } from "next/navigation"

export default async function PresentationTokenPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  if (token === "demo") {
    redirect("/present/demo")
  }

  return (
    <div className="flex min-h-dvh items-center justify-center p-8 text-center text-[#fafafa]">
      <div className="flex max-w-md flex-col gap-2">
        <h1 className="text-lg font-medium">Presentation preview</h1>
        <p className="text-sm text-[#fafafa]/70">
          Token-based preview is wired in Phase 6. Use /present/demo for the
          static deck shell.
        </p>
      </div>
    </div>
  )
}
