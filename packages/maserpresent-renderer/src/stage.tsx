import type { ReactNode } from "react"

type StageProps = {
  children: ReactNode
  className?: string
}

export function Stage({ children, className }: StageProps) {
  return (
    <div className={`maserpresent-deck__stage${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  )
}
