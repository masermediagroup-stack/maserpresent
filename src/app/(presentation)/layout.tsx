import "@maser/maserpresent-renderer/styles.css"
import "@/styles/presentation.css"

export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="presentation-root">{children}</div>
}
