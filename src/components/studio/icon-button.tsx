import { Button, type buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"

type IconButtonProps = React.ComponentProps<typeof Button> &
  VariantProps<typeof buttonVariants> & {
    label: string
  }

export function IconButton({
  label,
  className,
  children,
  ...props
}: IconButtonProps) {
  return (
    <Button
      type="button"
      size="icon"
      aria-label={label}
      className={cn(className)}
      {...props}
    >
      {children}
    </Button>
  )
}
