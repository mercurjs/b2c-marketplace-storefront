import { Carousel } from "@/components/cells"
import { ProductCard } from "../ProductCard/ProductCard"
import { listProducts } from "@/lib/data/products"
import { Product } from "@/types/product"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import Link from "next/link" // Added Link import

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
      limit: home ? 4 : 99999,
      order: "created_at",
      ...(home
        ? { fields: "id,title,handle,thumbnail,*variants.calculated_price" }
        : {}),
    },
  })

  if (!products.length && !sellerProducts.length) return null

  return (
    <div className="flex flex-col w-full px-4 lg:px-8 py-1 relative z-10">
      {/* MODIFIED: Combined title and button into a single flex row (justify-between) */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="heading-md text-foreground pb-2">Featured Products</h3>

        {/* FIX APPLIED: Removed 'hidden sm:block' to ensure visibility on all mobile screens. */}
        <Link
          // Links to the main store page, optionally with a 'newest' sort query
          href="/store?sort=newest"
          className="px-4 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 ease-in-out text-sm tracking-wide"
        >
          See More
        </Link>
      </div>

      <Carousel
        align="start"
        showIndicator={false}
        items={(sellerProducts.length ? sellerProducts : products).map(
          (product) => (
            // CRITICAL: w-1/2 ensures 2 cards fit side-by-side on mobile view.
            <div
              key={product.id}
              className="w-1/2 pr-3 sm:w-1/3 md:w-1/4 lg:w-1/6"
            >
              <ProductCard
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
            </div>
          )
        )}
      />

      {/* Removed the original SEE MORE BUTTON div */}
    </div>
  )
}
