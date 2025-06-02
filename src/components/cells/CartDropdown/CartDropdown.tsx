"use client"

import { Badge, Button } from "@/components/atoms"
import { CartDropdownItem, Dropdown } from "@/components/molecules"
import { usePrevious } from "@/hooks/usePrevious"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { CartIcon } from "@/icons"
import { convertToLocale } from "@/lib/helpers/money"
import { HttpTypes } from "@medusajs/types"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const getItemCount = (cart: HttpTypes.StoreCart | null) => {
  return cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
}

export const CartDropdown = ({
  cart,
}: {
  cart: HttpTypes.StoreCart | null
}) => {
  const [open, setOpen] = useState(false)

  const previousItemCount = usePrevious(getItemCount(cart))
  const cartItemsCount = (cart && getItemCount(cart)) || 0
  const pathname = usePathname()

  const total = convertToLocale({
    amount: cart?.item_total || 0,
    currency_code: cart?.currency_code || "eur",
  })

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        setOpen(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [open])

  useEffect(() => {
    if (
      previousItemCount !== undefined &&
      cartItemsCount > previousItemCount &&
      pathname.split("/")[2] !== "cart"
    ) {
      setOpen(true)
    }
  }, [cartItemsCount, previousItemCount])

  return (
    <div
      className="relative"
      onMouseOver={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <LocalizedClientLink href="/cart" className="relative">
        <CartIcon size={20} />
        {Boolean(cartItemsCount) && (
          <Badge className="absolute -top-2 -right-2 w-4 h-4 p-0">
            {cartItemsCount}
          </Badge>
        )}
      </LocalizedClientLink>
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
                  <LocalizedClientLink href="/cart">
                    <Button className="w-full mt-4 py-3">Go to cart</Button>
                  </LocalizedClientLink>
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
                <LocalizedClientLink href="/categories">
                  <Button className="w-full py-3">Explore Home Page</Button>
                </LocalizedClientLink>
              </div>
            )}
          </div>
        </div>
      </Dropdown>
    </div>
  )
}
