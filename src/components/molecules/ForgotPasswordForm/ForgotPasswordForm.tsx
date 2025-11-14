"use client"
import {
  FieldError,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form"
import { Button } from "@/components/atoms"
import { zodResolver } from "@hookform/resolvers/zod"
import { LabeledInput } from "@/components/cells"
import { forgotPasswordSchema, ForgotPasswordFormData } from "./schema"
import { useState } from "react"
import { sendResetPasswordEmail } from "@/lib/data/customer"
import { toast } from "@/lib/helpers/toast"
import Link from "next/link"
import { FetchError } from "@medusajs/js-sdk"

export const ForgotPasswordForm = () => {
  const methods = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  )
}

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useFormContext<ForgotPasswordFormData>()

  const submit = async (data: ForgotPasswordFormData) => {
    if (!data.email) return

    const result = await sendResetPasswordEmail(data.email)

    if (!result.success) {
      toast.error({ title: result.error || "An error occurred. Please try again." })
      return
    }

    reset({ email: "" })

    toast.success({
      title: `A password reset has been requested for ${data.email}. Check your inbox and spam folder. Remember, the link is only active for one hour.`,
    })
  }

  return (
    <div className="max-w-xl w-full mx-auto mt-6 space-y-4 rounded-sm border p-4">
      <h1 className="heading-md uppercase my-0 mb-2">Forgot your password?</h1>
      <p className="text-md">
        Enter the email you used to sign up and we’ll send you a password reset
        email.
      </p>
      <form onSubmit={handleSubmit(submit)}>
        <div className="space-y-4">
          <LabeledInput
            label="E-mail"
            placeholder="Your e-mail address"
            error={errors.email as FieldError}
            {...register("email")}
          />
        </div>

        <div className="space-y-4 mt-8">
          <Button className="w-full uppercase" disabled={isSubmitting}>
            Reset Password
          </Button>

          <Link href="/user" className="flex">
            <Button
              variant="tonal"
              className="w-full flex justify-center uppercase"
            >
              Back to log in
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
