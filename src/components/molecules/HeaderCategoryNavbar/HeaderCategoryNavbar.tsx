"use client"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { cn } from "@/lib/utils"
import { Button } from "@/components/atoms"

export const HeaderCategoryNavbar = ({
  categories,
  onClose,
}: {
  categories: HttpTypes.StoreProductCategory[]
  onClose?: (state: boolean) => void
}) => {
  return (
    <nav className="flex items-center flex-col p-1 gap-1">
      {categories?.map(({ id, handle, name }) => (
        <LocalizedClientLink
          key={id}
          href={`/categories/${handle}`}
          onClick={() => (onClose ? onClose(false) : null)}
          className={cn("label-md uppercase w-full")}
        >
          <Button className="w-full rounded-sm">{name}</Button>
        </LocalizedClientLink>
      ))}
    </nav>
  )
}
