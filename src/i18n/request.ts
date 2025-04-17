import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  const locale = process.env.NEXT_PUBLIC_DEFAULT_REGION
  return {
    locale,
    messages: (await import(`../translations/gb.json`)).default,
  }
})
