import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order Success",
  description: "Orderd placed successfully",
}

export default function OrderSuccessPage({}) {
  return (
    <main className="container text-center mt-20">
      <h1 className="heading-md">Order Successfully Placed!</h1>
      <p className="text-md mt-8 max-w-[320px] mx-auto">
        Thank you for shopping in our demo marketplace. In a live store, you
        would see a full order summary here. To view an example order go to the
        Vendor Panel or Admin Panel
      </p>
    </main>
  )
}
