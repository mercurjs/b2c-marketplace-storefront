import {
  ProductDetailsFooter,
  ProductDetailsHeader,
  ProductDetailsMeasurements,
  ProductDetailsSeller,
  ProductDetailsSellerReviews,
  ProductDetailsShipping,
  ProductPageDetails,
} from "@/components/cells"
import { seller } from "@/data/sellerMock"
import { singleProduct } from "@/data/singleProductMock"
import { retrieveCustomer } from "@/lib/data/customer"
import { SellerProps } from "@/types/seller"
import { HttpTypes } from "@medusajs/types"

export const ProductDetails = async ({
  product,
  locale,
}: {
  product: HttpTypes.StoreProduct & { seller?: SellerProps }
  locale: string
}) => {
  const user = await retrieveCustomer()
  return (
    <div>
      <ProductDetailsHeader product={product} locale={locale} user={user} />
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
