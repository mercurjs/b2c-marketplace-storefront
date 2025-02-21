import { wishlistTabs } from "@/app/[locale]/(main)/wishlist/page"
import { TabsContent, TabsList } from "@/components/molecules"
import { Suspense } from "react"
import { ProductsList } from "../ProductsList/ProductsList"
import { products } from "@/data/productsMock"
import { ProductsPagination } from "../ProductsPagination/ProductsPagination"

export const WishlistTabs = ({ tab }: { tab: string }) => {
  return (
    <div>
      <TabsList list={wishlistTabs} activeTab={tab} />
      <TabsContent value="all" activeTab={tab}>
        <Suspense fallback={<>Loading...</>}>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-8">
            {/* <ProductsList products={products} /> */}
          </div>
          {/* <ProductsPagination pages={2} /> */}
        </Suspense>
      </TabsContent>
      <TabsContent value="products" activeTab={tab}>
        <Suspense fallback={<>Loading...</>}>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-8">
            {/* <ProductsList products={products} /> */}
          </div>
          {/* <ProductsPagination pages={2} /> */}
        </Suspense>
      </TabsContent>
      <TabsContent value="collections" activeTab={tab}>
        <Suspense fallback={<>Loading...</>}>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 mt-8">
            {/* <ProductsList products={products} /> */}
          </div>
          {/* <ProductsPagination pages={2} /> */}
        </Suspense>
      </TabsContent>
    </div>
  )
}
