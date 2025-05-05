import { SellerInfo } from "@/components/molecules"
import { SellerProps } from "@/types/seller"
import { Chat } from "../Chat/Chat"
import { HttpTypes } from "@medusajs/types"

export const SellerHeading = ({
  seller,
  user,
}: {
  seller: SellerProps
  user: HttpTypes.StoreCustomer | null
}) => {
  console.log({ user, seller })
  return (
    <div className="flex justify-between flex-col lg:flex-row">
      <SellerInfo seller={seller} />
      {user && (
        <div className="flex items-center gap-2 mt-4 lg:mt-0">
          <Chat
            user={user}
            seller={seller}
            icon
            buttonClassNames="w-10 h-10 flex justify-center items-center p-0"
          />
        </div>
      )}
    </div>
  )
}
