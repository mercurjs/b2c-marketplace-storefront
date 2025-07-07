import { Button } from "@/components/atoms"
import { ArrowRightIcon } from "@/icons"
import Link from "next/link"

export const SellNowButton = () => {
  return (
    <Link
      href={
        process.env.NEXT_PUBLIC_ALGOLIA_ID === "UO3C5Y8NHX"
          ? "https://vendor-sandbox.vercel.app/"
          : "https://vendor.mercurjs.com"
      }
    >
      <Button className="group uppercase !font-bold pl-12 gap-1 flex items-center">
        Sell now
        <ArrowRightIcon
          color="white"
          className="w-5 h-5 group-hover:opacity-100 opacity-0 transition-all duration-300"
        />
      </Button>
    </Link>
  )
}
