import type { Metadata } from "next"
import { Funnel_Display } from "next/font/google"
import "./globals.css"

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${
      process.env.NEXT_PUBLIC_SITE_NAME ||
      "Mercur B2C Demo - Marketplace Storefront"
    }`,
    default:
      process.env.NEXT_PUBLIC_SITE_NAME ||
      "Mercur B2C Demo - Marketplace Storefront",
  },
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "Mercur B2C Demo - Marketplace Storefront",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  return (
    <html lang={locale} className="">
      <body
        className={`${funnelDisplay.className} antialiased bg-primary text-secondary`}
      >
        {children}
      </body>
    </html>
  )
}
