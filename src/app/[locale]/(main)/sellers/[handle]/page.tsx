import { SellerTabs } from "@/components/organisms"
import { SellerPageHeader } from "@/components/sections"
import { retrieveCustomer } from "@/lib/data/customer"
import { getSellerByHandle } from "@/lib/data/seller"

export default async function SellerPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params

  const seller = await getSellerByHandle(handle)

  const user = await retrieveCustomer()

  const tab = "products"

  if (!seller) {
    return null
  }

  return (
    <main className="container">
      <SellerPageHeader seller={seller} user={user} />
      <SellerTabs
        tab={tab}
        seller_id={seller.id}
        seller_handle={seller.handle}
      />
    </main>
  )
}
