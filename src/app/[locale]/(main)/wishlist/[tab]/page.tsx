import { WishlistPage } from "@/components/sections"

export default async function Wishlist({
  params,
}: {
  params: Promise<{ tab: string }>
}) {
  const { tab } = await params

  return (
    <main className="container">
      <WishlistPage tab={tab} />
    </main>
  )
}
