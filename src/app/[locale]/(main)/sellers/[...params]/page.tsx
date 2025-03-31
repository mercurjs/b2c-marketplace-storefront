import { SellerTabs } from "@/components/organisms"
import { SellerPageHeader } from "@/components/sections"
import { getSellerByHandle } from "@/lib/data/seller"

export default async function SellerPage({
  params,
  searchParams,
}: {
  params: { params: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const urlParams = params?.params ?? []
  const sellerHandle = urlParams[0]

  if (!sellerHandle) {
    return null
  }

  const tab = urlParams[1] || "all"

  return (
    <main className="container">
      <SellerPageContent
        handle={sellerHandle}
        tab={tab}
        searchParams={searchParams}
      />
    </main>
  )
}

const SellerPageContent = async ({
  handle,
  tab,
  searchParams,
}: {
  handle: string
  tab: string
  searchParams: any
}) => {
  const seller = await getSellerByHandle(handle)

  if (!seller) {
    return null
  }

  return (
    <main className="container">
      <SellerPageHeader seller={seller} />
      <SellerTabs tab={tab} seller={seller.id} searchParams={searchParams} />
    </main>
  )
}
