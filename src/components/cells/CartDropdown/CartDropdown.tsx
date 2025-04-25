"use client"

import { Badge, Button } from "@/components/atoms"
import { CartDropdownItem, Dropdown } from "@/components/molecules"
import { Link } from "@/i18n/routing"
import { CartIcon } from "@/icons"
import { convertToLocale } from "@/lib/helpers/money"
import { HttpTypes } from "@medusajs/types"
import { useEffect, useState } from "react"

export const CartDropdown = ({
  cart,
}: {
  cart: HttpTypes.StoreCart | null
}) => {
  const [open, setOpen] = useState(false)
  const cartItemsCount = (cart && cart.items?.length) || 0

  const total = convertToLocale({
    amount: cart?.item_total || 0,
    currency_code: cart?.currency_code || "eur",
  })

  useEffect(() => {
    if (cart!.items?.length! > 0) {
      setOpen(true)
    }

    const timeout = setTimeout(() => {
      setOpen(false)
    }, 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [cart])

  return (
    <div
      className="relative"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href="/cart" className="relative">
        <CartIcon size={20} />
        {Boolean(cartItemsCount) && (
          <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0">
            {cartItemsCount}
          </Badge>
        )}
      </Link>
      <Dropdown show={open}>
        <div className="lg:w-[460px] shadow-lg">
          <h3 className="uppercase heading-md border-b p-4">Shopping cart</h3>
          <div className="p-4">
            {Boolean(cartItemsCount) ? (
              <div>
                <div className="overflow-y-scroll max-h-[360px] no-scrollbar">
                  {cart?.items?.map((item) => (
                    <CartDropdownItem
                      key={item.id}
                      item={item}
                      currency_code={cart.currency_code}
                    />
                  ))}
                </div>
                <div className="pt-4">
                  <div className="text-secondary flex justify-between items-center">
                    Total <p className="label-xl text-primary">{total}</p>
                  </div>
                  <Link href="/cart">
                    <Button className="w-full mt-4 py-3">Go to cart</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="px-8">
                <h4 className="heading-md uppercase text-center">
                  Your shopping cart is empty
                </h4>
                <p className="text-lg text-center py-4">
                  Are you looging for inspiration?
                </p>
                <Link href="/categories">
                  <Button className="w-full py-3">Explore Home Page</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Dropdown>
    </div>
  )
}
