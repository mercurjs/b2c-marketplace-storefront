import { SkeletonProductCard } from "@/components/organisms/ProductCard/SkeletonProductCard"
import { PRODUCT_LIMIT } from "@/const"

const ProductListingLoadingView = () => (
  <div className="flex flex-wrap gap-4">
    {Array.from({ length: PRODUCT_LIMIT }).map((_, idx) => (
      <SkeletonProductCard key={idx} />
    ))}
  </div>
)

export default ProductListingLoadingView