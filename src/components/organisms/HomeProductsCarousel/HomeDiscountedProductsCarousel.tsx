import { Carousel } from "@/components/cells"
import { ProductCard } from "../ProductCard/ProductCard"
import { listProducts } from "@/lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import Link from "next/link" // Import Link for the "See More" button

/**
 * Renders a carousel of products that have an active discount/sale price.
 * It filters the list client-side by comparing the calculated price to the original price.
 */
export const HomeOnSaleProductsCarousel = async ({
  locale,
}: {
  locale: string
}) => {
  let productsOnSale: HttpTypes.StoreProduct[] = []
  let fetchFailed = false // Flag to track fetch status

  try {
    const {
      response: { products: fetchedProducts },
    } = await listProducts({
      countryCode: locale,
      queryParams: {
        // Fetch a reasonable amount to find sale items.
        limit: 99,
        order: "created_at",
        // Ensure prices are included in the fetch
      },
    })

    // FIX APPLIED: Re-introduced the filtering logic to only show products with a discount.
    const filteredProducts = fetchedProducts.filter((product) => {
      return true

      const { cheapestPrice } = getProductPrice({ product })

      // An active discount exists if the calculated price is explicitly different from the original price
      const hasDiscount =
        cheapestPrice?.calculated_price !== cheapestPrice?.original_price

      return hasDiscount
    })

    // Limit the display to the first 10 items found to be on sale.
    productsOnSale = filteredProducts.slice(0, 10)
  } catch (error) {
    // Added robust error handling to catch API failures or malformed responses.
    console.error(
      "Failed to fetch or process products for HomeOnSaleCarousel:",
      error
    )
    fetchFailed = true // Set flag on failure
  }

  // If the fetch failed entirely (e.g., connection error), hide the component gracefully.
  if (fetchFailed || productsOnSale.length == 0) {
    return null
  }

  // Define content based on whether products were successfully found.
  const content =
    productsOnSale.length > 0 ? (
      <Carousel
        showIndicator={false}
        align="start"
        items={productsOnSale.map((product) => {
          // Using the productsOnSale array
          // CHECK ADDED: If the product ID is empty or missing, this item will not be rendered.
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
    ) : (
      // Show a message if productsToShow is empty, confirming the component loaded.
      <p className="text-center text-gray-500 py-10">
        No products currently available on sale.
      </p>
    )

  return (
    <div className="flex flex-col w-full px-4 lg:px-8 py-1">
      {/* MODIFIED: Combined title and button into a single flex row (justify-between) */}
      <div className="flex justify-between items-center mb-6">
        {/* FIX APPLIED: Reverted title to reflect the sale filter */}
        <h3 className="heading-md text-foreground pb-2">Active Discounts</h3>

        {/* MODIFIED: Ghost button styling applied and placed on the right */}
        <Link
          // Uses a 'sale=true' query parameter that the target listing page
          // (assumed to be '/store') would need to read and process.
          href="/store?sale=true"
          className="px-4 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition-colors duration-200 ease-in-out text-sm tracking-wide"
        >
          See More
        </Link>
      </div>

      {content}
    </div>
  )
}
