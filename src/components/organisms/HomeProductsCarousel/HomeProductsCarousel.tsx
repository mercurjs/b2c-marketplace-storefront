import { Carousel } from "@/components/cells"
import { ProductCard } from "../ProductCard/ProductCard"
import { listProducts } from "@/lib/data/products"

export const HomeProductsCarousel = async ({ locale }: { locale: string }) => {
  const {
    response: { products },
  } = await listProducts({
    countryCode: locale,
    queryParams: {
      limit: 4,
      order: "created_at",
    },
  })

  if (!products.length) return null

  return (
    <div className="flex justify-center w-full">
      <Carousel
        items={products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      />
    </div>
  )
}
