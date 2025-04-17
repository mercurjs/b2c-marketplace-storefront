import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

const region = process.env.NEXT_PUBLIC_DEFAULT_REGION || "pl"
export const routing = defineRouting({
  locales: [region, "gb"],
  defaultLocale: region,
  localeDetection: false,
  alternateLinks: false,
  localePrefix: "never", // Comment this line to show locale in pathname
})

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
