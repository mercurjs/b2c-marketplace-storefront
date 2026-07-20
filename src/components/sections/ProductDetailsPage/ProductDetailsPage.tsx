import NotFound from "@/app/not-found"
import { ProductDetails, ProductGallery } from "@/components/organisms"
import { listOffers } from "@/lib/data/offers"
import { listProducts } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import { HomeProductSection } from "../HomeProductSection/HomeProductSection"

export const ProductDetailsPage = async ({
  handle,
  locale,
}: {
  handle: string
  locale: string
}) => {
  const region = await getRegion(locale)

  const prod = await listProducts({
    countryCode: locale,
    queryParams: { handle, limit: 1 },
    forceCache: true,
  }).then(({ response }) => response.products[0])

  if (!prod || !region) return null

  const offers = await listOffers({
    productIds: [prod.id],
    regionId: region.id,
  })

  const seller = prod.seller ?? offers.find((offer) => offer.seller)?.seller

  if (seller?.store_status === "SUSPENDED") {
    return NotFound()
  }

  const product = {
    ...prod,
    seller,
  }

  return (
    <>
      <div className="flex flex-col md:flex-row lg:gap-12" data-testid="product-details-page">
        <div className="md:w-1/2 md:px-2" data-testid="product-gallery-container">
          <ProductGallery images={product.images || []} />
        </div>
        <div className="md:w-1/2 md:px-2" data-testid="product-details-container">
          <ProductDetails product={product} offers={offers} locale={locale} />
        </div>
      </div>
      <div className="my-8">
        <HomeProductSection
          heading="More from this seller"
          products={seller?.products}
          locale={locale}
        />
      </div>
    </>
  )
}
