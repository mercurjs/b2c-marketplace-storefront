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
import { SingleProductSeller } from "@/types/product"
import { HttpTypes } from "@medusajs/types"

export const ProductDetails = ({
  product,
  locale,
}: {
  product: HttpTypes.StoreProduct & { seller?: SellerProps }
  locale: string
}) => {
  return (
    <div>
      <ProductDetailsHeader product={product} locale={locale} />
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
