import { ProductListingSkeleton } from "@/components/organisms/ProductListingSkeleton/ProductListingSkeleton"
import { Suspense } from "react"

import { Breadcrumbs } from "@/components/atoms"
import { AlgoliaProductsListing, ProductListing } from "@/components/sections"

async function AllCategories() {
  const breadcrumbsItems = [
    {
      path: "/",
      label: "All Products",
    },
  ]

  return (
    <main className="container">
      <div className="hidden md:block mb-2">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>

      <h1 className="heading-xl uppercase">All Products</h1>

      <Suspense fallback={<ProductListingSkeleton />}>
        <AlgoliaProductsListing />
      </Suspense>
    </main>
  )
}

export default AllCategories
