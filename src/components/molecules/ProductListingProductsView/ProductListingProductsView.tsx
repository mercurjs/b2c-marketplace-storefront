import { HttpTypes } from "@medusajs/types"
import { BaseHit, Hit } from "instantsearch.js"
import { ProductCard } from "@/components/organisms"

interface Props {
  products: Hit<BaseHit>[]
  apiProducts: HttpTypes.StoreProduct[] | null
}

const ProductListingProductsView = ({ products, apiProducts }: Props) => (
  <div className="w-full">
    <ul className="flex flex-wrap gap-4">
      {products.map(
        (hit) =>
          apiProducts?.find((p) => p.id === hit.objectID) && (
            <li key={hit.objectID} className="w-full lg:w-[calc(25%-1rem)] min-w-[250px]">
              <ProductCard
                api_product={apiProducts?.find((p) => p.id === hit.objectID)}
                product={hit}
                className="w-full h-full lg:w-full min-w-0"
              />
            </li>
          )
      )}
    </ul>
  </div>
)

export default ProductListingProductsView
