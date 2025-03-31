import { Suspense } from "react"
import { ProductListingSkeleton } from "../ProductListingSkeleton/ProductListingSkeleton"
import { ProductListing } from "@/components/sections"
import { TabsContent, TabsList } from "@/components/molecules"
import { SellerReviewTab } from "@/components/cells"

export const SellerTabs = ({
  searchParams,
  tab,
  seller,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
  tab: string
  seller: string
}) => {
  const tabsList = [
    { label: "all", link: `/sellers/${seller}/` },
    {
      label: "sold",
      link: `/sellers/${seller}/sold?sold=1`,
    },
    {
      label: "reviews",
      link: `/sellers/${seller}/reviews`,
    },
  ]

  return (
    <div className="mt-8">
      <TabsList list={tabsList} activeTab={tab} />
      <TabsContent value="all" activeTab={tab}>
        <Suspense fallback={<ProductListingSkeleton />}>
          <ProductListing searchParams={searchParams} />
        </Suspense>
      </TabsContent>
      <TabsContent value="sold" activeTab={tab}>
        <Suspense fallback={<ProductListingSkeleton />}>
          <ProductListing searchParams={searchParams} />
        </Suspense>
      </TabsContent>
      <TabsContent value="reviews" activeTab={tab}>
        <Suspense>
          <SellerReviewTab />
        </Suspense>
      </TabsContent>
    </div>
  )
}
