import { SellerTabs } from "@/components/organisms"
import { SellerPageHeader } from "@/components/sections"
import { seller } from "@/data/sellerMock"

export default async function SellerPage({
  params,
  searchParams,
}: {
  params: Promise<{ params: string[] }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}) {
  const urlParams = await params

  const sellerId = urlParams.params[0] || ""
  const tab = urlParams.params[1] || ""

  return (
    <main className="container">
      <SellerPageHeader seller={seller} />
      <SellerTabs
        tab={tab ? tab : "all"}
        seller={sellerId}
        searchParams={searchParams}
      />
    </main>
  )
}
