import { retrieveCarts } from "@/lib/data/cart"
// import { getCustomer } from "@lib/data";
import { Bag as BagSection } from "@/components/sections"
import { Suspense } from "react"

export default async function Bag() {
  //   const customer = await getCustomer();

  //   return <BagTemplate carts={carts} customer={customer} />;
  return (
    // <main className="container grid grid-cols-12">
    <main>
      <Suspense fallback={<>Loading...</>}>
        <BagSection/>;
      </Suspense>
    </main>
  )
}
