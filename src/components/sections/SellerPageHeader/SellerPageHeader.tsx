import { SellerFooter, SellerHeading } from "@/components/organisms"

export const SellerPageHeader = ({ seller }: { seller: SellerProps }) => {
  return (
    <div className="border rounded-sm p-4">
      <SellerHeading seller={seller} />
      <p
        dangerouslySetInnerHTML={{
          __html: seller.description,
        }}
        className="label-md my-5"
      />
      <SellerFooter seller={seller} />
    </div>
  )
}
