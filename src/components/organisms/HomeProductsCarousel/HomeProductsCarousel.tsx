import { Carousel } from "@/components/cells"
import { ProductCard } from "../ProductCard/ProductCard"
import { listProducts } from "@/lib/data/products"
import { Product } from "@/types/product"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@/lib/helpers/get-product-price"

export const HomeProductsCarousel = async ({
  locale,
  sellerProducts,
  home,
}: {
  locale: string
  sellerProducts: Product[]
  home: boolean
}) => {
  const {
    response: { products },
  } = await listProducts({
    countryCode: locale,
    queryParams: {
      limit: home ? 4 : undefined,
      order: "created_at",
      handle: home
        ? undefined
        : sellerProducts.map((product) => product.handle),
    },
    forceCache: !home,
  })

  if (!products.length && !sellerProducts.length) return null

  return (
    <div className="flex justify-center w-full">
      <Carousel
        align="start"
        items={(sellerProducts.length ? sellerProducts : products).map(
          (product) => (
            <ProductCard
              key={product.id}
              product={product}
              api_product={
                home
                  ? (product as HttpTypes.StoreProduct)
                  : products.find((p) => {
                      const { cheapestPrice } = getProductPrice({
                        product: p,
                      })
                      return (
                        cheapestPrice &&
                        p.id === product.id &&
                        Boolean(cheapestPrice)
                      )
                    })
              }
            />
          )
        )}
      />
    </div>
  )
}
