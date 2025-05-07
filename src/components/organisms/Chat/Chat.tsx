"use client"

import { Button } from "@/components/atoms"
import { ChatBox } from "@/components/cells/ChatBox/ChatBox"
import { Modal } from "@/components/molecules"
import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { SellerProps } from "@/types/seller"
import { MessageIcon } from "@/icons"

export const Chat = ({
  user,
  seller,
  buttonClassNames,
  icon,
  product,
  subject,
  order_id,
}: {
  user: HttpTypes.StoreCustomer | null
  seller: SellerProps
  buttonClassNames?: string
  icon?: boolean
  product?: HttpTypes.StoreProduct
  subject?: string
  order_id?: string
}) => {
  const [modal, setModal] = useState(false)

  return (
    <>
      <Button
        variant="tonal"
        onClick={() => setModal(true)}
        className={buttonClassNames}
      >
        {icon ? <MessageIcon size={20} /> : "Write to seller"}
      </Button>
      {modal && (
        <Modal heading="Chat" onClose={() => setModal(false)}>
          <div className="px-4">
            <ChatBox
              order_id={order_id}
              product_id={product?.id}
              subject={subject || product?.title || null}
              currentUser={{
                id: user?.id || "",
                name: `${user?.first_name} ${user?.last_name}` || "",
                email: user?.email || "",
                photoUrl: seller.photo || "/images/avatar.png",
              }}
              supportUser={{
                id: seller?.id || "",
                name: seller?.name || "",
                email: seller?.email || "",
                photoUrl: seller.photo || "/images/avatar.png",
                role: "seller",
              }}
            />
          </div>
        </Modal>
      )}
    </>
  )
}
