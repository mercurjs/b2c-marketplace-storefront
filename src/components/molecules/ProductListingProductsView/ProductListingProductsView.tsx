import { HttpTypes } from "@medusajs/types"
import { BaseHit, Hit } from "instantsearch.js"
import { ProductCard } from "@/components/organisms"

interface Props {
  products: Hit<BaseHit>[]
  apiProducts: HttpTypes.StoreProduct[] | null
}

const ProductListingProductsView = ({
  products,
  apiProducts,
}: Props) => (
  <div className="w-full">
    <ul className="flex flex-wrap gap-4">
      {products.map(
        (hit) =>
          apiProducts?.find((p) => p.id === hit.objectID) && (
            <ProductCard
              api_product={apiProducts?.find((p) => p.id === hit.objectID)}
              key={hit.objectID}
              product={hit}
            />
          )
      )}
    </ul>
  </div>
)

export default ProductListingProductsView