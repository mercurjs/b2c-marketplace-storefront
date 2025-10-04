import { Suspense } from "react"
import { Breadcrumbs } from "@/components/atoms"
import { listSellers } from "@/lib/data/seller"
import { SellerCard } from "@/components/organisms/SellerCard/SellerCard"
import { ProductListingSkeleton } from "@/components/organisms/ProductListingSkeleton/ProductListingSkeleton"

export default async function Sellers() {
  const sellers = await listSellers()

  const breadcrumbsItems = [
    {
      path: "/",
      label: "Sellers",
    },
  ]

  return (
    <main className="container">
      <div className="hidden md:block mb-2">
        <Breadcrumbs items={breadcrumbsItems} />
      </div>

      <h1 className="heading-xl uppercase">All Sellers</h1>

      <Suspense fallback={<ProductListingSkeleton />}>
        {sellers && sellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">No sellers found.</p>
          </div>
        )}
      </Suspense>
    </main>
  )
}
