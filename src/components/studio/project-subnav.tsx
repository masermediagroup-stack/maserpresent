"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const projectNav = [
  { href: "overview", label: "Overview" },
  { href: "story", label: "Story" },
  { href: "assets", label: "Assets" },
  { href: "sharing", label: "Sharing" },
  { href: "settings", label: "Settings" },
] as const

type ProjectSubnavProps = {
  projectId: string
}

export function ProjectSubnav({ projectId }: ProjectSubnavProps) {
  const pathname = usePathname()
  const base = `/studio/projects/${projectId}`

  return (
    <nav
      className="flex flex-wrap gap-1 border-b px-6 py-2"
      aria-label="Project sections"
    >
      {projectNav.map(({ href, label }) => {
        const path = `${base}/${href}`
        const isActive = pathname === path

        return (
          <Link
            key={href}
            href={path}
            data-active={isActive ? "true" : "false"}
            className="studio-nav-link"
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
