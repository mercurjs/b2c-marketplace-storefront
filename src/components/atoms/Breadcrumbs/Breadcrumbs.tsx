"use client"
import { cn } from "@/lib/utils"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"

import { ForwardIcon } from "@/icons"
import { usePathname } from "next/navigation"

interface BreadcrumbsProps {
  items: { label: string; path: string }[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center gap-2">
        {items.map(({ path, label }, index) => {
          const isActive = pathname === path
          return (
            <li key={path} className="inline-flex items-center">
              {index > 0 && <ForwardIcon size={16} />}
              <LocalizedClientLink
                href={path}
                className={cn(
                  "inline-flex items-center label-md text-primary",
                  index > 0 && "ml-2",
                  isActive && "text-secondary"
                )}
              >
                {label}
              </LocalizedClientLink>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
