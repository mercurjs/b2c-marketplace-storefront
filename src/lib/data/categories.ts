import { sdk } from "@/lib/config"
import { HttpTypes } from "@medusajs/types"

interface CategoriesProps {
  query?: Record<string, any>
  headingCategories?: string[]
}

export const listCategories = async ({
  query,
  headingCategories = [],
}: Partial<CategoriesProps> = {}) => {
  const limit = query?.limit || 100

  const categories = await sdk.client
    .fetch<{
      product_categories: HttpTypes.StoreProductCategory[]
    }>("/store/product-categories", {
      query: {
        fields: "handle, name, rank",
        limit,
        ...query,
      },
      cache: "no-cache",
    })
    .then(({ product_categories }) => product_categories)

  const parentCategories = categories.filter(({ name }) =>
    headingCategories.includes(name.toLowerCase())
  )

  const childrenCategories = categories.filter(
    ({ name }) => !headingCategories.includes(name.toLowerCase())
  )

  return {
    categories: childrenCategories,
    parentCategories: parentCategories,
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
        // next,
        cache: "no-cache",
      }
    )
    .then(({ product_categories }) => product_categories[0])
}
