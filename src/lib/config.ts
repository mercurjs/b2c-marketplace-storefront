import Medusa from "@medusajs/js-sdk"

// Defaults to standard port for Medusa server
const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"

export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
})

type FetchQueryOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string | null | { tags: string[] }>
}

export async function fetchQuery(url: string, options: FetchQueryOptions) {
  const res = await fetch(`${MEDUSA_BACKEND_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
      "x-publishable-api-key": process.env
        .NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string,
    },
  })

  let data
  try {
    data = await res.json()
  } catch {
    data = { message: res.statusText || "Unknown error" }
  }

  return {
    ok: res.ok,
    status: res.status,
    error: res.ok ? null : { message: data?.message },
    data: res.ok ? data : null,
  }
}
