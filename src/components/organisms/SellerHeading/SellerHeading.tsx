import { Button } from "@/components/atoms"
import { SellerInfo } from "@/components/molecules"
import { MessageIcon } from "@/icons"

export const SellerHeading = ({ seller }: { seller: SellerProps }) => {
  return (
    <div className="flex justify-between flex-col lg:flex-row">
      <SellerInfo seller={seller} />
      <div className="flex items-center gap-2 mt-4 lg:mt-0">
        <Button size="large" className="uppercase w-1/2 lg:w-auto">
          Follow
        </Button>
        <Button
          variant="tonal"
          className="w-1/2 lg:w-10 h-10 p-0 flex items-center justify-center uppercase label-md"
        >
          <p className="lg:hidden">Message</p>
          <MessageIcon size={22} className="hidden lg:block" />
        </Button>
      </div>
    </div>
  )
}
