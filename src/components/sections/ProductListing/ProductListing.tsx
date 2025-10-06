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
  collection_id,
  seller_id,
  filters,
  showSidebar = false,
  locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "pl",
}: {
  category_id?: string
  collection_id?: string
  seller_id?: string
  showSidebar?: boolean
  filters: any
  locale?: string
}) => {
  const { response } = await listProductsWithSort({
    seller_id,
    category_id,
    collection_id,
    countryCode: locale,
    sortBy: "created_at",
    // ...filters,
    queryParams: {
      limit: PRODUCT_LIMIT,
    },
  })

  const { products } = await response

  const count = products.length

  const pages = Math.ceil(count / PRODUCT_LIMIT) || 1

  console.log(filters)
  console.log(category_id)
  console.log(products[0]?.images) // Added optional chaining for safety

  return (
    <div className="py-4 pb-24">
      <ProductListingHeader total={count} />
      <div className="hidden md:block">
        <ProductListingActiveFilters />
      </div>
      {/* 1. Main Layout Grid: Use responsive grid for overall layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6 gap-4">
        {/* Sidebar is hidden on small screens, takes col-span-1 on md and up */}
        {showSidebar && <ProductSidebar />}

        {/* 2. Product Listing Area: Spans 4 on mobile, adjusts based on sidebar on md+ */}
        <section
          className={
            showSidebar
              ? "col-span-1 md:col-span-3"
              : "col-span-1 md:col-span-4"
          }
        >
          {/* 3. Products Grid (The Fix): 1 column on small screens, 2 columns on medium screens and larger (md:grid-cols-2) */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <ProductsList products={products} />
          </div>
          <ProductsPagination pages={pages} />
        </section>
      </div>
    </div>
  )
}
