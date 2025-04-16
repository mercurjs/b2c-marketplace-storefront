"use client"
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { addressSchema, AddressFormData } from "./schema"
import { LabeledInput } from "@/components/cells"
import { Button } from "@/components/atoms"
import { addCustomerAddress } from "@/lib/data/customer"
import { HttpTypes } from "@medusajs/types"

interface Props {
  defaultValues?: AddressFormData
  regions: HttpTypes.StoreRegion[]
}

export const AddressForm: React.FC<Props> = ({ defaultValues, ...props }) => {
  const methods = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues || {
      addressName: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      countryCode: "",
      postalCode: "",
      company: "",
      province: "",
      phone: "",
      metadata: {},
    },
  })

  return (
    <FormProvider {...methods}>
      <Form {...props} />
    </FormProvider>
  )
}

const Form: React.FC<Props> = ({ regions }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext()

  const countries = regions.flatMap((region) => region.countries)

  const submit = async (data: FieldValues) => {
    const formData = new FormData()
    formData.append("address_name", data.addressName)
    formData.append("first_name", data.firstName)
    formData.append("last_name", data.lastName)
    formData.append("address", data.address)
    formData.append("city", data.city)
    formData.append("country_code", data.countryCode)
    formData.append("postal_code", data.postalCode)
    formData.append("company", data.company)
    formData.append("phone", data.phone)

    await addCustomerAddress(formData)

    // TODO - revalidate customer's addresses after submit
    // TODO - close modal after submit
    // TODO - show success message / handle error
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="px-4 space-y-4">
        <div className="max-w-full grid grid-cols-2 items-top gap-4 mb-4">
          <LabeledInput
            label="Address name"
            placeholder="Type address name"
            className="md:col-span-2"
            error={errors.firstName as FieldError}
            {...register("addressName")}
          />
          <LabeledInput
            label="First name"
            placeholder="Type first name"
            error={errors.firstName as FieldError}
            {...register("firstName")}
          />
          <LabeledInput
            label="Last name"
            placeholder="Type last name"
            error={errors.firstName as FieldError}
            {...register("lastName")}
          />
          <LabeledInput
            label="Company (optional)"
            placeholder="Type company"
            error={errors.company as FieldError}
            {...register("company")}
          />
          <LabeledInput
            label="Address"
            placeholder="Type address"
            error={errors.address as FieldError}
            {...register("address")}
          />
          <LabeledInput
            label="City"
            placeholder="Type city"
            error={errors.city as FieldError}
            {...register("city")}
          />
          {/* TODO - change to select input */}
          <LabeledInput
            label="Country"
            placeholder="Type country"
            error={errors.countryCode as FieldError}
            {...register("countryCode")}
          />
          <LabeledInput
            label="Postal code"
            placeholder="Type postal code"
            error={errors.postalCode as FieldError}
            {...register("postalCode")}
          />
          <LabeledInput
            label="Phone"
            placeholder="Type phone number"
            error={errors.phone as FieldError}
            {...register("phone")}
          />
          {/* TODO - checkboxes */}
        </div>
        <Button className="w-full ">Save address</Button>
      </div>
    </form>
  )
}
