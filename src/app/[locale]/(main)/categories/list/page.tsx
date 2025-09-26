import { listCategories } from "@/lib/data/categories"
import type { HttpTypes } from "@medusajs/types"
import { CategoriesList } from "@/components/organisms/CategoryCard/CategoryList"

export default async function CategoriesPage() {
  const { categories } = (await listCategories()) as {
    categories: HttpTypes.StoreProductCategory[]
  }

  console.log(categories)

  return (
    <div className="min-h-screen pb-20">
      <div className="p-4 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Categories</h1>
      </div>
      <CategoriesList categories={categories} />
    </div>
  )
}
