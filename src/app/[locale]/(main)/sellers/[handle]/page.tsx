import { SellerTabs } from "@/components/organisms"
import { SellerPageHeader } from "@/components/sections"
import { getSellerByHandle } from "@/lib/data/seller"

export default async function SellerPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params

  const seller = await getSellerByHandle(handle)

  const tab = "products"

  if (!seller) {
    return null
  }

  return (
    <main className="container">
      <SellerPageHeader seller={seller} />
      <SellerTabs
        tab={tab}
        seller_id={seller.id}
        seller_handle={seller.handle}
      />
    </main>
  )
}
