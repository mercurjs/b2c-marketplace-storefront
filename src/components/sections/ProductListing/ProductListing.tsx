import {
  ProductListingActiveFilters,
  ProductListingHeader,
  ProductSidebar,
  ProductsList,
  ProductsPagination,
} from "@/components/organisms"
import { PRODUCT_LIMIT } from "@/const"
import { listProductsWithSort } from "@/lib/data/products"
import { SortOptions } from "@/types/product"

export const ProductListing = async ({
  searchParams,
  category_id,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
  category_id?: string
}) => {
  const { sortBy, page } = await searchParams

  const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "gb"

  const { response } = await listProductsWithSort({
    category_id,
    countryCode: DEFAULT_REGION,
    page: parseInt((page || "1") as string),
    sortBy: (sortBy || "created_at") as SortOptions,
    queryParams: {
      limit: PRODUCT_LIMIT,
    },
  })

  const { count, products } = await response

  const pages = Math.ceil(count / PRODUCT_LIMIT) || 1

  return (
    <div className="py-4">
      <ProductListingHeader total={count} />
      <div className="hidden md:block">
        <ProductListingActiveFilters />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6">
        {/* <ProductSidebar /> */}
        <section className="col-span-4">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <ProductsList products={products} />
          </div>
          <ProductsPagination pages={pages} />
        </section>
      </div>
    </div>
  )
}
