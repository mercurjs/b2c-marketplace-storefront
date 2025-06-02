import { Divider } from "@/components/atoms"
import { convertToLocale } from "@/lib/helpers/money"
import { cn } from "@/lib/utils"
import Image from "next/image"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { Fragment } from "react"

export const OrderProductListItem = ({
  item,
  currency_code,
  withDivider,
}: {
  item: any
  currency_code: string
  withDivider?: boolean
}) => (
  <Fragment>
    {withDivider && <Divider className="mt-4" />}
    <li className={cn("flex items-center", withDivider && "mt-4")}>
      <div className="w-[66px] h-24 relative rounded-xs overflow-hidden">
        {item.thumbnail ? (
          <Image src={item.thumbnail} alt={item.title} fill objectFit="cover" />
        ) : (
          <Image
            src={"/images/placeholder.svg"}
            alt={item.title}
            width={66}
            height={66}
            className="opacity-25"
          />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 w-full px-4 sm:gap-4">
        <div className="sm:col-span-2">
          <p className="label-md text-secondary">{item.product_title}</p>
          <LocalizedClientLink
            href={`/products/${item.variant?.product?.handle}`}
            target="_blank"
            className="heading-xs text-primary"
          >
            {item.variant?.product?.title}
          </LocalizedClientLink>
        </div>
        <div className="sm:col-span-2 flex flex-col justify-center">
          <p className="label-md text-secondary">
            {`Variant: `}
            <span className="text-primary">{item?.variant?.title}</span>
          </p>
        </div>
        <div className="flex sm:justify-end label-lg text-primary sm:items-center">
          {convertToLocale({
            amount: item.unit_price,
            currency_code: currency_code,
          })}
        </div>
      </div>
    </li>
  </Fragment>
)
