import { Carousel } from "@/components/cells"
import { ProductCard } from "../ProductCard/ProductCard"
import { listProducts } from "@/lib/data/products"
import { Product } from "@/types/product"

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
      limit: 4,
      order: "created_at",
    },
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
              sellerPage={Boolean(sellerProducts.length) || home}
            />
          )
        )}
      />
    </div>
  )
}
