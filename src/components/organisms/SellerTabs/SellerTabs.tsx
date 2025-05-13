import { Suspense } from "react"
import { ProductListingSkeleton } from "../ProductListingSkeleton/ProductListingSkeleton"
import { ProductListing } from "@/components/sections"
import { TabsContent, TabsList } from "@/components/molecules"
import { SellerReviewTab } from "@/components/cells"

export const SellerTabs = ({
  tab,
  seller_handle,
  seller_id,
}: {
  tab: string
  seller_handle: string
  seller_id: string
}) => {
  const tabsList = [
    { label: "products", link: `/sellers/${seller_handle}/` },
    // {
    //   label: "sold",
    //   link: `/sellers/${seller}/sold`,
    // },
    {
      label: "reviews",
      link: `/sellers/${seller_handle}/reviews`,
    },
  ]

  return (
    <div className="mt-8">
      <TabsList list={tabsList} activeTab={tab} />
      <TabsContent value="products" activeTab={tab}>
        <Suspense fallback={<ProductListingSkeleton />}>
          <ProductListing seller_id={seller_id} />
        </Suspense>
      </TabsContent>
      {/* <TabsContent value="sold" activeTab={tab}>
        <Suspense fallback={<ProductListingSkeleton />}>
          <ProductListing />
        </Suspense>
      </TabsContent> */}
      <TabsContent value="reviews" activeTab={tab}>
        <Suspense>
          <SellerReviewTab seller_handle={seller_handle} />
        </Suspense>
      </TabsContent>
    </div>
  )
}
