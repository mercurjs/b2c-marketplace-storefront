import { Button } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"

export const EmptyCart = () => {
  return (
    <div className="py-4 h-full w-full flex flex-col items-center justify-center">
      <h4 className="heading-md uppercase text-center">
        Your shopping cart is empty
      </h4>
      <p className="text-lg text-center py-4">
        Are you looging for inspiration?
      </p>
      <LocalizedClientLink href="/categories" className="max-md:w-full">
        <Button className="w-full py-3 md:px-24">Explore Home Page</Button>
      </LocalizedClientLink>
    </div>
  )
}
