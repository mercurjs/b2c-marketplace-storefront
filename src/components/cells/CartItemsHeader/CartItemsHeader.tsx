import { Divider } from "@/components/atoms"
import { SingleProductSeller } from "@/types/product"
import { format } from "date-fns"
import { SellerAvatar } from "../SellerAvatar/SellerAvatar"
import { Link } from "@/i18n/routing"

export const CartItemsHeader = ({
  seller,
}: {
  seller: SingleProductSeller
}) => {
  return (
    <Link href={`/sellers/${seller.handle}`}>
      <div className="border rounded-sm p-4 flex gap-4 items-center">
        <SellerAvatar photo={seller.photo} size={32} alt={seller.name} />

        <div className="lg:flex gap-2">
          <p className="uppercase heading-xs">{seller.name}</p>
          {seller.id !== "fleek" && (
            <div className="flex items-center gap-2">
              <Divider square />
              <p className="label-md text-secondary">
                Joined: {format(seller.created_at || "", "yyyy-MM-dd")}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
