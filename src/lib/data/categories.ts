import { sdk } from "@/lib/config"
import { HttpTypes } from "@medusajs/types"

interface CategoriesProps {
  query?: Record<string, any>
  headingCategories?: string[]
}

export const listCategories = async ({
  query,
}: Partial<CategoriesProps> = {}) => {
  const limit = query?.limit || 100

  const categories = await sdk.client
    .fetch<{
      product_categories: HttpTypes.StoreProductCategory[]
    }>("/store/product-categories", {
      query: {
        // fields: "handle, name, rank",
        limit,
        // Start by fetching only top-level categories
        parent_category_id: "null",
        // Crucially, this parameter includes all nested children
        include_descendants_tree: "true",
        ...query,
      },
      cache: "force-cache",
      next: { revalidate: 3600 },
    })
    .then(({ product_categories }) => product_categories)

  return {
    categories: categories,
  }
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children",
          handle,
        },
        cache: "force-cache",
        next: { revalidate: 300 },
      }
    )
    .then(({ product_categories }) => product_categories[0])
}
