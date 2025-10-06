"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, ChevronDown } from "lucide-react"
import type { HttpTypes } from "@medusajs/types"

const CategoryItem = ({
  category,
  level = 0,
}: {
  category: HttpTypes.StoreProductCategory
  level?: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren =
    category.category_children && category.category_children.length > 0

  return (
    <div className="border-b last:border-b-0">
      <div
        className={`flex items-center justify-between p-4 hover:bg-muted/30 transition-colors ${
          level > 0 ? `pl-${4 + level * 4}` : ""
        }`}
        style={{ paddingLeft: level > 0 ? `${16 + level * 16}px` : "16px" }}
      >
        <div className="flex-1">
          <Link
            href={`/categories/${category.handle}`}
            className="block hover:text-primary transition-colors"
          >
            <h3 className="font-medium">{category.name}</h3>
            {category.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {category.description}
              </p>
            )}
          </Link>
        </div>

        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="bg-muted/20">
          {category.category_children.map((childCategory) => (
            <CategoryItem
              key={childCategory.id}
              category={childCategory}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const CategoriesList = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  return (
    <div className="p-4 space-y-6">
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted/50 p-4 border-b">
          <h2 className="font-semibold text-lg">Categories</h2>
        </div>
        <div>
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}
