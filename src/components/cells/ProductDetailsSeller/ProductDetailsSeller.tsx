import { Link } from "@/i18n/routing"
import { CollapseIcon, DoneIcon } from "@/icons"
import { SingleProductSeller } from "@/types/product"
import { SellerInfo } from "@/components/molecules"

export const ProductDetailsSeller = ({
  seller,
}: {
  seller?: SingleProductSeller
}) => {
  if (!seller) return null

  return (
    <div className="border rounded-sm">
      <div className="p-4">
        <div className="flex justify-between">
          <SellerInfo seller={seller} />

          <Link href={`/sellers/${seller.handle}`}>
            <CollapseIcon className="-rotate-90" />
          </Link>
        </div>
      </div>
      {/*{seller.verified && (
        <div className='flex items-center gap-2 label-md text-secondary p-4 border-t'>
          <DoneIcon size={20} />
          Verified seller
        </div>
      )} */}
    </div>
  )
}
