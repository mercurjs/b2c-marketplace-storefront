import { ProductListingSkeleton } from "@/components/organisms/ProductListingSkeleton/ProductListingSkeleton"
import { getCategoryByHandle } from "@/lib/data/categories"
import { Suspense } from "react"

import type { Metadata } from "next"
import { generateCategoryMetadata } from "@/lib/helpers/seo"
import { Breadcrumbs } from "@/components/atoms"
import { AlgoliaProductsListing, ProductListing } from "@/components/sections"

export async function generateMetadata({
  params,
}: {
  params: { category: Promise<any> }
}): Promise<Metadata> {
  const { category } = await params

  const cat = await getCategoryByHandle([category])

  return generateCategoryMetadata(cat)
}

async function Category({
  params,
}: // searchParams,
{
  params: { category: Promise<any> }
  // searchParams: Promise<{
  //   [key: string]: string | string[] | undefined
  // }>
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
        <AlgoliaProductsListing category_id={category.id} />
        {/* <ProductListing
          searchParams={searchParams}
          category_id={category.id}
        /> */}
      </Suspense>
    </main>
  )
}

export default Category
