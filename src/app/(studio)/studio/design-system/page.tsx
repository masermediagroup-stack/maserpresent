import { DesignSystemGallery } from "@/components/studio/design-system-gallery"

export const metadata = {
  title: "Design system",
}

export default function DesignSystemPage() {
  return (
    <div className="studio-page">
      <div className="flex flex-col gap-1">
        <h1 className="studio-page-title">Design system</h1>
        <p className="studio-page-description">
          Development reference for studio primitives and tokens. Not shipped to
          client viewers.
        </p>
      </div>
      <DesignSystemGallery />
    </div>
  )
}
