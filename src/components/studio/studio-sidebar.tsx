"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  FolderKanbanIcon,
  LayoutDashboardIcon,
  PaletteIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { product } from "@/config/product"
import { cn } from "@/lib/utils"

const mainNav = [
  { href: "/studio", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/studio/clients", label: "Clients", icon: UsersIcon },
  { href: "/studio/settings", label: "Settings", icon: SettingsIcon },
] as const

const devNav = [
  { href: "/studio/design-system", label: "Design system", icon: PaletteIcon },
] as const

export function StudioSidebar() {
  const pathname = usePathname()

  return (
    <aside className="studio-sidebar flex h-full shrink-0 flex-col bg-background">
      <div className="flex h-12 items-center border-b px-4">
        <Link href="/studio" className="text-sm font-semibold tracking-tight">
          {product.name}
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2" aria-label="Studio">
        {mainNav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            data-active={pathname === href ? "true" : "false"}
            className="studio-nav-link"
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </Link>
        ))}
        <div className="my-2 border-t" />
        {devNav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            data-active={pathname === href ? "true" : "false"}
            className={cn("studio-nav-link", "text-muted-foreground/80")}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t p-3 text-xs text-muted-foreground">
        <FolderKanbanIcon className="mb-1 size-3.5" aria-hidden />
        Case study authoring
      </div>
    </aside>
  )
}
