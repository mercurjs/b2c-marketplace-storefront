import { wishlistTabs } from "@/app/[locale]/(main)/wishlist/page"
import { TabsContent, TabsList } from "@/components/molecules"
import { Suspense } from "react"

export const WishlistTabs = ({ tab }: { tab: string }) => {
  return (
    <div>
      <TabsList list={wishlistTabs} activeTab={tab} />
      <TabsContent value="all" activeTab={tab}>
        <Suspense fallback={<>Loading...</>}>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-8">All</div>
        </Suspense>
      </TabsContent>
      <TabsContent value="products" activeTab={tab}>
        <Suspense fallback={<>Loading...</>}>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-8">
            Products
          </div>
        </Suspense>
      </TabsContent>
      <TabsContent value="collections" activeTab={tab}>
        <Suspense fallback={<>Loading...</>}>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-8">
            Collections
          </div>
        </Suspense>
      </TabsContent>
    </div>
  )
}
