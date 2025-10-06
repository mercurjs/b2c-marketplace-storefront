import { Carousel } from "@/components/cells"
import { ProductCard } from "../ProductCard/ProductCard"
import { listProducts } from "@/lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import Link from "next/link" // Import Link for the "See More" button

/**
 * Renders a carousel of the top-selling products, simulated by client-side sorting
 * on a custom sales count field, as the Medusa API doesn't natively support this.
 */
export const HomeTopSellingProductsCarousel = async ({
  locale,
}: {
  locale: string
}) => {
  const {
    response: { products: fetchedProducts },
  } = await listProducts({
    countryCode: locale,
    queryParams: {
      // Fetch a large number to ensure we have a good sample for sorting
      limit: 99999,
    },
  })

  // --- START SIMULATED SALES COUNT LOGIC (MUST BE REPLACED WITH REAL METADATA FIELD) ---
  const productsWithSalesCount = fetchedProducts.map((p) => ({
    ...p,
    // Simulate reading a metadata field, assuming a realistic scenario where sales data is attached.
    // Replace 'p.metadata?.sales_count' with the actual path to your sales metric field.
    sales_count:
      (p.metadata as any)?.sales_count || Math.floor(Math.random() * 1000),
  }))
  // --- END SIMULATED SALES COUNT LOGIC ---

  // Sort by sales count (descending) and take the top 12
  const topSellingProducts = productsWithSalesCount
    .sort((a, b) => (b.sales_count as number) - (a.sales_count as number))
    .slice(0, 12)

  if (!topSellingProducts.length) return null

  return (
    <div className="flex flex-col w-full px-4 lg:px-8 py-1">
      {/* MODIFIED: Combined title and button into a single flex row (justify-between) */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="heading-md text-foreground pb-2">Top Selling</h3>

        {/* MODIFIED: Ghost button styling applied and placed on the right */}
        <Link
          // Uses a query parameter that the target listing page would read
          // to trigger the top-selling sort/filter logic.
          href="/store?sort=topselling"
          className="px-4 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors duration-200 ease-in-out text-sm tracking-wide"
        >
          See More
        </Link>
      </div>

      <Carousel
        showIndicator={false}
        align="start"
        items={topSellingProducts.map((product) => {
          if (!product.id) {
            return null
          }

          return (
            // CRITICAL: w-1/2 ensures 2 cards fit side-by-side on mobile view.
            <div
              key={product.id}
              className="w-1/2 pr-3 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <ProductCard
                product={product}
                api_product={product as HttpTypes.StoreProduct}
              />
            </div>
          )
        })}
      />

      {/* Removed the original SEE MORE BUTTON div */}
    </div>
  )
}
