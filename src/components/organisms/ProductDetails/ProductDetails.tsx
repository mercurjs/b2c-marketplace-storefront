import {
  ProductDetailsFooter,
  ProductDetailsHeader,
  ProductDetailsSeller,
  ProductDetailsShipping,
  ProductPageDetails,
  ProductAdditionalAttributes,
} from "@/components/cells"

import { retrieveCustomer } from "@/lib/data/customer"
import { getUserWishlists } from "@/lib/data/wishlist"
import type { StoreOffer } from "@/types/offer"
import { AdditionalAttributeProps } from "@/types/product"
import { SellerProps } from "@/types/seller"
import { Wishlist } from "@/types/wishlist"
import { HttpTypes } from "@medusajs/types"

export const ProductDetails = async ({
  product,
  offers,
  locale,
}: {
  product: HttpTypes.StoreProduct & {
    seller?: SellerProps
    attribute_values?: AdditionalAttributeProps[]
  }
  offers: StoreOffer[]
  locale: string
}) => {
  const user = await retrieveCustomer()

  let wishlist: Wishlist = { products: [] }
  if (user) {
    wishlist = await getUserWishlists({ countryCode: locale })
  }

  return (
    <div>
      <ProductDetailsHeader
        product={product}
        offers={offers}
        locale={locale}
        user={user}
        wishlist={wishlist}
      />
      <ProductPageDetails details={product.description || ""} />
      <ProductAdditionalAttributes attributes={product.attribute_values || []} />
      <ProductDetailsShipping />
      <ProductDetailsSeller seller={product.seller} />
      <ProductDetailsFooter
        tags={product.tags || []}
        posted={product.created_at}
      />
    </div>
  )
}
