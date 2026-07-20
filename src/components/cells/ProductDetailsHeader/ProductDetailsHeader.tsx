"use client"

import { Button } from "@/components/atoms"
import { ProductVariants } from "@/components/molecules"
import { Chat } from "@/components/organisms/Chat/Chat"
import { useCartContext } from "@/components/providers"
import useGetAllSearchParams from "@/hooks/useGetAllSearchParams"
import { addOfferToCart } from "@/lib/data/offer-cart"
import { getProductPrice } from "@/lib/helpers/get-product-price"
import { toast } from "@/lib/helpers/toast"
import type { StoreOffer } from "@/types/offer"
import { SellerProps } from "@/types/seller"
import { Wishlist } from "@/types/wishlist"
import { HttpTypes } from "@medusajs/types"
import { WishlistButton } from "../WishlistButton/WishlistButton"

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce(
    (
      acc: Record<string, string>,
      varopt: HttpTypes.StoreProductOptionValue
    ) => {
      acc[varopt.option?.title.toLowerCase() || ""] = varopt.value
      return acc
    },
    {}
  )
}

export const ProductDetailsHeader = ({
  product,
  offers,
  locale,
  user,
  wishlist,
}: {
  product: HttpTypes.StoreProduct & { seller?: SellerProps }
  offers: StoreOffer[]
  locale: string
  user: HttpTypes.StoreCustomer | null
  wishlist?: Wishlist
}) => {
  const { onAddToCart, cart, refreshCart, isAddingItem } = useCartContext()
  const { allSearchParams } = useGetAllSearchParams()

  const { cheapestVariant, cheapestPrice } = getProductPrice({ product })
  const hasAnyPrice = cheapestPrice !== null && cheapestVariant !== null

  const selectedVariant = hasAnyPrice
    ? {
        ...optionsAsKeymap(cheapestVariant.options ?? null),
        ...allSearchParams,
      }
    : allSearchParams

  const variantId =
    product.variants?.find(({ options }: { options: any }) =>
      options?.every((option: any) =>
        selectedVariant[option.option?.title.toLowerCase() || ""]?.includes(
          option.value
        )
      )
    )?.id || ""

  const selectedOffer = offers
    .filter((offer) => offer.variant_id === variantId)
    .sort((a, b) => {
      const aAvailable = a.in_stock !== false && (a.inventory_quantity ?? 0) > 0
      const bAvailable = b.in_stock !== false && (b.inventory_quantity ?? 0) > 0
      if (aAvailable !== bAvailable) return aAvailable ? -1 : 1
      return (
        (a.calculated_price?.calculated_amount ?? Number.POSITIVE_INFINITY) -
        (b.calculated_price?.calculated_amount ?? Number.POSITIVE_INFINITY)
      )
    })[0]

  const { variantPrice } = getProductPrice({ product, variantId })
  const variantStock = selectedOffer?.inventory_quantity ?? 0
  const variantInStock = selectedOffer?.in_stock ?? variantStock > 0
  const variantHasPrice =
    !!selectedOffer?.calculated_price ||
    !!product.variants?.find(({ id }) => id === variantId)?.calculated_price

  const isVariantStockMaxLimitReached =
    (cart?.items?.find((item) => item.variant_id === variantId)?.quantity ?? 0) >=
    variantStock

  const handleAddToCart = async () => {
    if (
      !variantId ||
      !selectedOffer?.id ||
      !hasAnyPrice ||
      !variantInStock ||
      isVariantStockMaxLimitReached
    ) {
      return
    }

    const subtotal = +(variantPrice?.calculated_price_without_tax_number || 0)
    const total = +(variantPrice?.calculated_price_number || 0)

    const storeCartLineItem = {
      thumbnail: product.thumbnail || "",
      product_title: product.title,
      quantity: 1,
      subtotal,
      total,
      tax_total: total - subtotal,
      variant_id: variantId,
      product_id: product.id,
      variant: product.variants?.find(({ id }) => id === variantId),
    }

    onAddToCart(storeCartLineItem, variantPrice?.currency_code || "eur")

    try {
      await addOfferToCart({
        variantId,
        offerId: selectedOffer.id,
        quantity: 1,
        countryCode: locale,
      })
      await refreshCart()
    } catch (error) {
      await refreshCart()
      toast.error({
        title: "Error adding to cart",
        description: "The selected seller offer could not be added to the cart",
      })
    }
  }

  const isAddToCartDisabled =
    !selectedOffer?.id ||
    !variantStock ||
    !variantInStock ||
    !variantHasPrice ||
    !hasAnyPrice ||
    isVariantStockMaxLimitReached

  return (
    <div className="border rounded-sm p-5" data-testid="product-details-header">
      <div className="flex justify-between">
        <div>
          <h2 className="label-md text-secondary">
            {selectedOffer?.seller?.name || product.seller?.name || ""}
          </h2>
          <h1 className="heading-lg text-primary" data-testid="product-title">
            {product.title}
          </h1>
          <div className="mt-2 flex gap-2 items-center" data-testid="product-price-container">
            {hasAnyPrice && variantPrice ? (
              <>
                <span className="heading-md text-primary" data-testid="product-price-current">
                  {variantPrice.calculated_price}
                </span>
                {variantPrice.calculated_price_number !==
                  variantPrice.original_price_number && (
                  <span className="label-md text-secondary line-through" data-testid="product-price-original">
                    {variantPrice.original_price}
                  </span>
                )}
              </>
            ) : (
              <span className="label-md text-secondary pt-2 pb-4" data-testid="product-price-unavailable">
                Not available in your region
              </span>
            )}
          </div>
        </div>
        <WishlistButton
          productId={product.id}
          wishlist={wishlist}
          user={user}
        />
      </div>

      {hasAnyPrice && (
        <ProductVariants product={product} selectedVariant={selectedVariant} />
      )}

      <Button
        onClick={handleAddToCart}
        disabled={isAddToCartDisabled}
        loading={isAddingItem}
        className="w-full uppercase mb-4 py-3 flex justify-center"
        size="large"
        data-testid="product-add-to-cart-button"
      >
        {!hasAnyPrice
          ? "NOT AVAILABLE IN YOUR REGION"
          : variantInStock && variantHasPrice && selectedOffer?.id
          ? "ADD TO CART"
          : "OUT OF STOCK"}
      </Button>

      {user && (selectedOffer?.seller || product.seller) && (
        <Chat
          user={user}
          seller={(selectedOffer?.seller || product.seller) as SellerProps}
          buttonClassNames="w-full uppercase"
          product={product}
        />
      )}
    </div>
  )
}
