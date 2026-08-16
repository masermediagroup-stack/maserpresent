"use client"

import { useState } from "react"
import { toast } from "sonner"

import { EmptyState } from "@/components/studio/empty-state"
import { IconButton } from "@/components/studio/icon-button"
import { StatusBadge, type ProjectStatus } from "@/components/studio/status-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MoreHorizontalIcon, SearchIcon } from "lucide-react"

const statuses: ProjectStatus[] = ["draft", "review", "published", "archived"]

export function DesignSystemGallery() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Tabs defaultValue="primitives">
      <TabsList>
        <TabsTrigger value="primitives">Primitives</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
      </TabsList>

      <TabsContent value="primitives" className="flex flex-col gap-8 pt-4">
        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">Buttons</h2>
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <IconButton label="Search">
              <SearchIcon />
            </IconButton>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">Form controls</h2>
          <FieldGroup className="max-w-md">
            <Field>
              <FieldLabel htmlFor="ds-input">Input</FieldLabel>
              <Input id="ds-input" placeholder="Project title" />
            </Field>
            <Field>
              <FieldLabel htmlFor="ds-textarea">Textarea</FieldLabel>
              <Textarea id="ds-textarea" placeholder="Summary" rows={3} />
            </Field>
            <Field>
              <FieldLabel htmlFor="ds-select">Select</FieldLabel>
              <Select defaultValue="editorial">
                <SelectTrigger id="ds-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editorial">Editorial</SelectItem>
                  <SelectItem value="immersive">Immersive</SelectItem>
                  <SelectItem value="systematic">Systematic</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox defaultChecked />
                Checkbox
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Switch defaultChecked />
                Switch
              </label>
            </div>
          </FieldGroup>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">Status badges</h2>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <StatusBadge key={status} status={status} />
            ))}
            <Badge variant="outline">Outline badge</Badge>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">Overlays</h2>
          <div className="flex flex-wrap gap-2">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger render={<Button variant="outline" />}>
                Open dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Dialog title</DialogTitle>
                  <DialogDescription>
                    Compact studio dialogs use shadcn base-nova primitives.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="icon" aria-label="More actions" />}>
                <MoreHorizontalIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Tooltip
              </TooltipTrigger>
              <TooltipContent>Studio tooltip</TooltipContent>
            </Tooltip>

            <Button
              variant="outline"
              onClick={() => toast("Saved", { description: "Autosave is Phase 5." })}
            >
              Show toast
            </Button>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-medium">Loading & empty</h2>
          <Skeleton className="h-10 w-48" />
          <EmptyState
            title="Empty state"
            description="Used when a list or section has no items yet."
          />
        </section>
      </TabsContent>

      <TabsContent value="tokens" className="flex flex-col gap-4 pt-4">
        <section className="flex flex-col gap-2 text-sm">
          <h2 className="font-medium">Studio tokens</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li className="rounded-md border p-3">
              <code className="text-xs">--studio-sidebar-width</code>
              <p className="text-muted-foreground">220px compact rail</p>
            </li>
            <li className="rounded-md border p-3">
              <code className="text-xs">--studio-topbar-height</code>
              <p className="text-muted-foreground">48px operational header</p>
            </li>
            <li className="rounded-md border p-3">
              <code className="text-xs">--studio-radius-md</code>
              <p className="text-muted-foreground">6px control radius</p>
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-2 text-sm">
          <h2 className="font-medium">Deck tokens (presentation)</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            <li className="rounded-md border p-3">
              <code className="text-xs">--deck-stage-bg</code>
              <p className="text-muted-foreground">#ffffff</p>
            </li>
            <li className="rounded-md border p-3">
              <code className="text-xs">--deck-bar-bg</code>
              <p className="text-muted-foreground">#222222 / 92px bar</p>
            </li>
            <li className="rounded-md border p-3">
              <code className="text-xs">--deck-tab-active-bg</code>
              <p className="text-muted-foreground">#151515 active tab</p>
            </li>
          </ul>
        </section>
      </TabsContent>
    </Tabs>
  )
}
