import { Footer, Header } from "@/components/organisms"
import { retrieveCustomer } from "@/lib/data/customer"
import { checkRegion } from "@/lib/helpers/check-region"
import { Session } from "@talkjs/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/atoms"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { CollapseIcon } from "@/icons"
import Image from "next/image"

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const APP_ID = process.env.NEXT_PUBLIC_TALKJS_APP_ID
  const { locale } = await params

  const user = await retrieveCustomer()
  const regionCheck = await checkRegion(locale)

  if (!regionCheck) {
    return redirect("/")
  }

  if (!APP_ID || !user)
    return (
      <>
        <div className="min-h-screen">
          <Header />
          <main className=" px-0 py-3">
            <header>
              <div className="relative w-full py-2 lg:px-8 px-4">
                <div className="absolute top-3">
                  <LocalizedClientLink href="/cart">
                    <Button variant="tonal" className="flex items-center gap-2">
                      <CollapseIcon className="rotate-90" />
                      <span className="hidden lg:block">Back to cart</span>
                    </Button>
                  </LocalizedClientLink>
                </div>
                <div className="flex items-center justify-center pl-4 lg:pl-0 w-full">
                  <LocalizedClientLink href="/" className="text-2xl font-bold">
                    <Image
                      src="/Logo.svg"
                      width={126}
                      height={40}
                      alt="Logo"
                      priority
                    />
                  </LocalizedClientLink>
                </div>
              </div>
            </header>
            {children}
          </main>
        </div>
        ){/* <Footer /> */}
      </>
    )

  return (
    <>
      <Session appId={APP_ID} userId={user.id}>
        <div className="min-h-screen">
          <Header />
          <main className=" px-0 py-3">
            <header>
              <div className="relative w-full py-2 lg:px-8 px-4">
                <div className="absolute top-3">
                  <LocalizedClientLink href="/cart">
                    <Button variant="tonal" className="flex items-center gap-2">
                      <CollapseIcon className="rotate-90" />
                      <span className="hidden lg:block">Back to cart</span>
                    </Button>
                  </LocalizedClientLink>
                </div>
                <div className="flex items-center justify-center pl-4 lg:pl-0 w-full">
                  <LocalizedClientLink href="/" className="text-2xl font-bold">
                    <Image
                      src="/Logo.svg"
                      width={126}
                      height={40}
                      alt="Logo"
                      priority
                    />
                  </LocalizedClientLink>
                </div>
              </div>
            </header>
            {children}
          </main>
        </div>
      </Session>
    </>
  )
}
