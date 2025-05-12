import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"

import { HttpTypes } from "@medusajs/types"
import NativeSelect, {
  NativeSelectProps,
} from "@/components/molecules/NativeSelect/NativeSelect"
import clsx from "clsx"

const CountrySelect = forwardRef<
  HTMLSelectElement,
  NativeSelectProps & {
    region?: HttpTypes.StoreRegion
  }
>(({ placeholder = "Country", region, defaultValue, ...props }, ref) => {
  const innerRef = useRef<HTMLSelectElement>(null)

  useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
    ref,
    () => innerRef.current
  )

  const countryOptions = useMemo(() => {
    if (!region) {
      return []
    }

    return region.countries?.map((country) => ({
      value: country.iso_2,
      label: country.display_name,
    }))
  }, [region])

  return (
    <label className="label-md">
      <p className="mb-2">Country</p>
      <NativeSelect
        ref={innerRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={clsx("w-full h-12 flex items-center bg-component-secondary")}
        {...props}
      >
        {countryOptions?.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </NativeSelect>
    </label>
  )
})

CountrySelect.displayName = "CountrySelect"

export default CountrySelect
