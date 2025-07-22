import { listRegions } from "../data/regions"

export const checkRegion = async (locale: string) => {
  const regions = await listRegions()
  const countries = regions
    ?.map((r) => {
      return r.countries?.map((c) => c.iso_2)
    })
    .flat()

  const region =
    locale === "robot.txt" ? false : countries.includes(locale) ? true : false

  return region
}
