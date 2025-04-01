export default async function SellerReviewsPage() {
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
