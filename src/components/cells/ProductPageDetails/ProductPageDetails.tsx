import { ProductPageAccordion } from "@/components/molecules"

export const ProductPageDetails = ({ details }: { details: string }) => {
  if (!details) return null

  return (
    <ProductPageAccordion heading="Product details" defaultOpen={false}>
      <div
        className="product-details"
        dangerouslySetInnerHTML={{
          __html: details,
        }}
      />
    </ProductPageAccordion>
  )
}
