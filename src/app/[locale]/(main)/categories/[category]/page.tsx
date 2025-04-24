import { ProductListingSkeleton } from "@/components/organisms/ProductListingSkeleton/ProductListingSkeleton"
import { getCategoryByHandle } from "@/lib/data/categories"
import { Suspense } from "react"

import type { Metadata } from "next"
import { generateCategoryMetadata } from "@/lib/helpers/seo"
import { Breadcrumbs } from "@/components/atoms"
import { AlgoliaProductsListing, ProductListing } from "@/components/sections"

const ALGOLIA_ID = process.env.NEXT_PUBLIC_ALGOLIA_ID
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}): Promise<Metadata> {
  const { category } = await params

  const cat = await getCategoryByHandle([category])

  return generateCategoryMetadata(cat)
}

async function Category({
  params,
}: {
  params: Promise<{
    category: string
  }>
}) {
  const { category: handle } = await params

  const category = await getCategoryByHandle([handle])

  const breadcrumbsItems = [
    {
      path: category.handle,
      label: category.name,
    },
  ]

  return (
    <main className="container">
      <div className="hidden md:block mb-2">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>

      <h1 className="heading-xl uppercase">{category.name}</h1>

      <Suspense fallback={<ProductListingSkeleton />}>
        {!ALGOLIA_ID || !ALGOLIA_SEARCH_KEY ? (
          <ProductListing category_id={category.id} showSidebar />
        ) : (
          <AlgoliaProductsListing category_id={category.id} />
        )}
      </Suspense>
    </main>
  )
}

export default Category
