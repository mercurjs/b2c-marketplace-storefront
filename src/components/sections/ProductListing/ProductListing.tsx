import {
  ProductListingActiveFilters,
  ProductListingHeader,
  ProductSidebar,
  ProductsList,
  ProductsPagination,
} from "@/components/organisms"
import { PRODUCT_LIMIT } from "@/const"
import { listProductsWithSort } from "@/lib/data/products"

export const ProductListing = async ({
  category_id,
  seller_id,
}: {
  category_id?: string
  seller_id?: string
}) => {
  const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "gb"

  const { response } = await listProductsWithSort({
    seller_id,
    category_id,
    countryCode: DEFAULT_REGION,
    sortBy: "created_at",
    queryParams: {
      limit: PRODUCT_LIMIT,
    },
  })

  const { products } = await response
  const count = products.length

  const pages = Math.ceil(count / PRODUCT_LIMIT) || 1

  return (
    <div className="py-4">
      <ProductListingHeader total={count} />
      <div className="hidden md:block">
        <ProductListingActiveFilters />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-4">
        <ProductSidebar />
        <section className="col-span-3">
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <ProductsList products={products} />
          </div>
          <ProductsPagination pages={pages} />
        </section>
      </div>
    </div>
  )
}
