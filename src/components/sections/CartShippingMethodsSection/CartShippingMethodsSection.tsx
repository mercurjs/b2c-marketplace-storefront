"use client"

import { RadioGroup, Radio } from "@headlessui/react"
import { calculatePriceForShippingOption } from "@/lib/data/fulfillment"
import { HttpTypes } from "@medusajs/types"
import { useEffect, useState } from "react"
import { setShippingMethod } from "@/lib/data/cart"
import clsx from "clsx"

type CartShippingMethodsSection = HttpTypes.StoreCartShippingOption & {
  service_zone?: any
}

export const CartShippingMethodsSection = async ({
  cart,
  availableShippingMethods,
}: {
  cart: HttpTypes.StoreCart | null
  availableShippingMethods: CartShippingMethodsSection[] | null
}) => {
  if (!cart) {
    return null
  }

  const [isLoadingPrices, setIsLoadingPrices] = useState(true)
  const [calculatedPricesMap, setCalculatedPricesMap] = useState<
    Record<string, number>
  >({})
  const [shippingMethodId, setShippingMethodId] = useState<string | null>(
    cart.shipping_methods?.at(-1)?.shipping_option_id || null
  )
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const _shippingMethods = availableShippingMethods?.filter(
    (sm) => sm.service_zone?.fulfillment_set?.type !== "pickup"
  )

  useEffect(() => {
    setIsLoadingPrices(true)

    if (_shippingMethods?.length) {
      const promises = _shippingMethods
        .filter((sm) => sm.price_type === "calculated")
        .map((sm) => calculatePriceForShippingOption(sm.id, cart.id))

      if (promises.length) {
        Promise.allSettled(promises).then((res) => {
          const pricesMap: Record<string, number> = {}
          res
            .filter((r) => r.status === "fulfilled")
            .forEach((p) => (pricesMap[p.value?.id || ""] = p.value?.amount!))

          setCalculatedPricesMap(pricesMap)
          setIsLoadingPrices(false)
        })
      }
    }
  }, [availableShippingMethods])

  const handleSetShippingMethod = async (id: string | null) => {
    setError(null)

    let currentId: string | null = null
    setIsLoading(true)
    setShippingMethodId((prev) => {
      currentId = prev
      return id
    })

    await setShippingMethod({ cartId: cart.id, shippingMethodId: id! })
      .catch((err) => {
        setShippingMethodId(currentId)

        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="border p-4 rounded-sm bg-ui-bg-interactive">
      <h2 className="heading-md mb-8">Delivery Method</h2>
      <RadioGroup
        value={shippingMethodId}
        onChange={(v) => handleSetShippingMethod(v)}
      >
        {_shippingMethods?.map((option) => {
          const isDisabled =
            option.price_type === "calculated" &&
            !isLoadingPrices &&
            typeof calculatedPricesMap[option.id] !== "number"

          return (
            <Radio
              key={option.id}
              value={option.id}
              data-testid="delivery-option-radio"
              disabled={isDisabled}
              className={clsx(
                "flex items-center justify-between text-small-regular cursor-pointer py-4 border rounded-rounded px-8 mb-2 hover:shadow-borders-interactive-with-active",
                {
                  "border-ui-border-interactive":
                    option.id === shippingMethodId,
                  "hover:shadow-brders-none cursor-not-allowed": isDisabled,
                }
              )}
            >
              <div className="flex items-center gap-x-4">
                {/* <MedusaRadio checked={option.id === shippingMethodId} /> */}
                <span className="text-base-regular">{option.name}</span>
              </div>
              <span className="justify-self-end text-ui-fg-base">
                {/* {option.price_type === "flat" ? (
                  convertToLocale({
                    amount: option.amount!,
                    currency_code: cart?.currency_code,
                  })
                ) : calculatedPricesMap[option.id] ? (
                  convertToLocale({
                    amount: calculatedPricesMap[option.id],
                    currency_code: cart?.currency_code,
                  })
                ) : isLoadingPrices ? (
                  <Loader />
                ) : (
                  "-"
                )} */}
              </span>
            </Radio>
          )
        })}
      </RadioGroup>
    </div>
  )
}
