"use client"
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { Button } from "@/components/atoms"
import { zodResolver } from "@hookform/resolvers/zod"
import LocalizedClientLink from "@/components/molecules/LocalizedLink/LocalizedLink"
import { LabeledInput } from "@/components/cells"
import { registerFormSchema, RegisterFormData } from "./schema"
import { signup } from "@/lib/data/customer"
import { useState } from "react"
import { cn } from "@/lib/utils"

export const RegisterForm = () => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  )
}

const Form = () => {
  const [error, setError] = useState()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext()

  const submit = async (data: FieldValues) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    formData.append("first_name", data.firstName)
    formData.append("last_name", data.lastName)
    formData.append("phone", data.phone)

    const res = await signup(formData)

    if (res && !res?.id) setError(res)
  }

  return (
    <main className="container">
      <h1 className="heading-xl text-center uppercase my-6">
        Join our community
      </h1>
      <form onSubmit={handleSubmit(submit)}>
        <div className="w-96 max-w-full mx-auto space-y-4">
          <LabeledInput
            label="First name"
            placeholder="Your first name"
            error={errors.firstName as FieldError}
            {...register("firstName")}
          />
          <LabeledInput
            label="Last name"
            placeholder="Your last name"
            error={errors.lastName as FieldError}
            {...register("lastName")}
          />
          <LabeledInput
            label="E-mail"
            placeholder="Your e-mail address"
            error={errors.email as FieldError}
            {...register("email")}
          />
          <LabeledInput
            label="Password"
            placeholder="Your password"
            type="password"
            error={errors.password as FieldError}
            {...register("password")}
          />
          <LabeledInput
            label="Confirm password"
            placeholder="Your password again"
            type="password"
            error={errors.confirmPassword as FieldError}
            {...register("confirmPassword")}
          />
          <LabeledInput
            label="Phone"
            placeholder="Your phone number"
            error={errors.phone as FieldError}
            {...register("phone")}
          />
          {error && <p className="label-md text-negative">{error}</p>}
          <Button
            className="w-full flex justify-center"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Register
          </Button>
          <p className="text-center label-md">
            Already have an account?{" "}
            <LocalizedClientLink href="/user" className="underline">
              Sign in!
            </LocalizedClientLink>
          </p>
        </div>
      </form>
    </main>
  )
}
