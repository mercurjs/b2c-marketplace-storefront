import { Footer, Header } from "@/components/organisms"
import { retrieveCustomer } from "@/lib/data/customer"
import { Session } from "@talkjs/react"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const APP_ID = process.env.NEXT_PUBLIC_TALKJS_APP_ID

  const user = await retrieveCustomer()

  if (!APP_ID || !user)
    return (
      <>
        <Header />
        {children}
        <Footer />
      </>
    )

  return (
    <>
      <Session appId={APP_ID} userId={user.id}>
        <Header />
        {children}
        <Footer />
      </Session>
    </>
  )
}
