import { Carousel, CarouselContent, CarouselItem } from "@/components/cells"
import { ProductCard } from "../ProductCard/ProductCard"
import { listProducts } from "@/lib/data/products"
import type { Product } from "@/types/product"
import type { HttpTypes } from "@medusajs/types"
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
    response: { products = [] },
  } = await listProducts({
    countryCode: locale,
    queryParams: {
      limit: home ? 4 : undefined,
      order: "created_at",
      handle:
        !home && sellerProducts.length
          ? sellerProducts.map((p) => p.handle)
          : undefined,
    },
    forceCache: !home,
  })

  if (!products.length && !sellerProducts.length) return null

  const allProducts = sellerProducts.length ? sellerProducts : products

  // For the non-home case, precompute a lookup of API products that have a price
  const apiById: Map<unknown, HttpTypes.StoreProduct> | undefined =
    !home && products.length
      ? new Map(
          products
            .filter((p) => {
              const { cheapestPrice } = getProductPrice({ product: p })
              return !!cheapestPrice
            })
            .map((p) => [p.id, p] as const)
        )
      : undefined

  return (
    <div className="flex justify-center w-full">
      <Carousel opts={{ align: "start" }}>
        <CarouselContent>
          {allProducts.map((product) => {
            const api_product = home
              ? // If `product` is not actually a HttpTypes.StoreProduct, adapt it.
                (product as unknown as HttpTypes.StoreProduct)
              : apiById?.get(product.id)

            return (
              <CarouselItem
                key={product.id}
                className="basis-full md:basis-1/2 lg:basis-1/4"
              >
                <ProductCard product={product} api_product={api_product} />
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
