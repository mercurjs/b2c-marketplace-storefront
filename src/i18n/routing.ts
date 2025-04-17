import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

const locale = process.env.NEXT_PUBLIC_DEFAULT_REGION || "pl"
export const routing = defineRouting({
  locales: [locale, "gb"],
  defaultLocale: locale,
  localeDetection: false,
  alternateLinks: false,
  localePrefix: "never", // Comment this line to show locale in pathname
})

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
