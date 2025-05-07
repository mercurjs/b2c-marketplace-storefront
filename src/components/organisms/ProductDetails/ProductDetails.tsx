import {
  ProductDetailsFooter,
  ProductDetailsHeader,
  ProductDetailsMeasurements,
  ProductDetailsSeller,
  ProductDetailsSellerReviews,
  ProductDetailsShipping,
  ProductPageDetails,
} from "@/components/cells"
import { singleProduct } from "@/data/singleProductMock"
import { retrieveCustomer } from "@/lib/data/customer"
import { getUserWishlists } from "@/lib/data/wishlist"
import { SellerProps } from "@/types/seller"
import { Wishlist } from "@/types/wishlist"
import { HttpTypes } from "@medusajs/types"

export const ProductDetails = async ({
  product,
  locale,
}: {
  product: HttpTypes.StoreProduct & { seller?: SellerProps }
  locale: string
}) => {
  const user = await retrieveCustomer()

  let wishlist: Wishlist[] = []
  if (user) {
    const response = await getUserWishlists()
    wishlist = response.wishlists
  }

  return (
    <div>
      <ProductDetailsHeader
        product={product}
        locale={locale}
        user={user}
        wishlist={wishlist}
      />
      <ProductPageDetails details={product?.description || ""} />
      <ProductDetailsMeasurements measurements={singleProduct.measurements} />
      <ProductDetailsShipping />
      <ProductDetailsSeller seller={product?.seller} />
      {/* <ProductDetailsSellerReviews
        reviews={seller.reviews}
      /> */}
      <ProductDetailsFooter
        tags={product?.tags || []}
        posted={product?.created_at}
      />
    </div>
  )
}
