import { SellerTabs } from "@/components/organisms"
import { SellerPageHeader } from "@/components/sections"
import { retrieveCustomer } from "@/lib/data/customer"
import { getSellerByHandle } from "@/lib/data/seller"
import { SellerProps } from "@/types/seller"

export default async function SellerReviewsPage({
  params,
  searchParams,
}: {
  params: any
  searchParams: any
}) {
  const { handle, locale } = await params

  const seller = (await getSellerByHandle(handle)) as SellerProps

  const user = await retrieveCustomer()

  const tab = "reviews"

  return (
    <main className="container">
      <SellerPageHeader header seller={seller} user={user} />
      <SellerTabs
        filters={searchParams}
        tab={tab}
        seller_id={seller.id}
        seller_handle={seller.handle}
        locale={locale}
      />
    </main>
  )
}
