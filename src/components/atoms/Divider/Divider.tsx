import { cn } from "@/lib/utils"

interface DividerProps {
  orientation?: "horizontal" | "vertical"
  square?: boolean
  variant?: "primary" | "secondary"
  className?: string
}

export function Divider({
  orientation = "horizontal",
  variant = "primary",
  square = false,
  className,
}: DividerProps) {
  const baseClasses =
    variant === "primary"
      ? "border-t border-l"
      : "border border-t-secondary border-l-secondary"
  const orientationClasses =
    orientation === "horizontal"
      ? "w-full h-1px border-l-0"
      : "h-full w-1px border-t-0"
  const formClasses = square
    ? "!w-[4px] !h-[4px] lg:!w-[4px] lg:!h-[4px] !border-0 bg-tertiary/50 rotate-45"
    : ""

  return (
    <div
      className={cn(baseClasses, orientationClasses, formClasses, className)}
      role="separator"
    />
  )
}
