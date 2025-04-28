import { Link } from "@/i18n/routing"
import { CollapseIcon } from "@/icons"
import { SellerInfo } from "@/components/molecules"
import { SellerProps } from "@/types/seller"

export const ProductDetailsSeller = ({ seller }: { seller?: SellerProps }) => {
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
    </div>
  )
}
