"use client"

import { Button, Card } from "@/components/atoms"
import { LabeledInput } from "@/components/cells"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle } from "@medusajs/icons"
import {
  FieldError,
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
  UseFormReturn,
} from "react-hook-form"
import { ProfilePasswordFormData, profilePasswordSchema } from "./schema"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { HttpTypes } from "@medusajs/types"
import { updateCustomerPassword } from "@/lib/data/customer"

function validatePassword(password: string) {
  const errors = {
    tooShort: password.length < 8,
    noLower: !/[a-z]/.test(password),
    noUpper: !/[A-Z]/.test(password),
    noDigitOrSymbol: !/[0-9!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~`]/.test(password),
  }

  return {
    isValid: !Object.values(errors).some(Boolean),
    errors,
  }
}

export const ProfilePasswordForm = ({
  user,
  token,
}: {
  user?: HttpTypes.StoreCustomer
  token?: string
}) => {
  const form = useForm<ProfilePasswordFormData>({
    resolver: zodResolver(profilePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  return (
    <FormProvider {...form}>
      <Form form={form} user={user} token={token} />
    </FormProvider>
  )
}

const Form = ({
  form,
  user,
  token,
}: {
  form: UseFormReturn<ProfilePasswordFormData>
  user?: HttpTypes.StoreCustomer
  token?: string
}) => {
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    FieldError | undefined
  >(undefined)
  const [newPasswordError, setNewPasswordError] = useState({
    isValid: false,
    lower: false,
    upper: false,
    "8chars": false,
    symbolOrDigit: false,
  })

  useEffect(() => {
    const password = form.getValues("newPassword")
    const validation = validatePassword(password)

    setNewPasswordError({
      isValid: validation.isValid,
      lower: validation.errors.noLower,
      upper: validation.errors.noUpper,
      "8chars": validation.errors.tooShort,
      symbolOrDigit: validation.errors.noDigitOrSymbol,
    })
  }, [form.watch("newPassword")])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext()

  const updatePassword = async (data: FieldValues) => {
    if (form.getValues("confirmPassword") !== form.getValues("newPassword")) {
      setConfirmPasswordError({
        message: "New password and old password cannot be identical",
        type: "custom",
      } as FieldError)
      return
    }

    setConfirmPasswordError(undefined)

    if (newPasswordError.isValid) {
      try {
        const res = await updateCustomerPassword(data.newPassword, token!)
        console.log(res)
      } catch (err) {
        console.log(err)
        return
      }
    }
  }
  return (
    <form
      className="flex flex-col gap-4 px-4"
      onSubmit={handleSubmit(updatePassword)}
    >
      <LabeledInput
        label="Current password"
        type="password"
        error={errors.currentPassword as FieldError}
        {...register("currentPassword")}
      />
      <LabeledInput
        label="New password"
        type="password"
        error={errors.newPassword as FieldError}
        {...register("newPassword")}
      />
      <Card className="p-4">
        <p
          className={cn(
            "label-md flex items-center gap-2 mb-2",
            newPasswordError["8chars"] ? "text-red-700" : "text-green-700"
          )}
        >
          <CheckCircle /> At least 8 characters
        </p>
        <p
          className={cn(
            "label-md flex items-center gap-2 mb-2",
            newPasswordError["lower"] ? "text-red-700" : "text-green-700"
          )}
        >
          <CheckCircle /> One lowercase letter
        </p>
        <p
          className={cn(
            "label-md flex items-center gap-2 mb-2",
            newPasswordError["upper"] ? "text-red-700" : "text-green-700"
          )}
        >
          <CheckCircle /> One uppercase letter
        </p>
        <p
          className={cn(
            "label-md flex items-center gap-2 mb-2",
            newPasswordError["symbolOrDigit"]
              ? "text-red-700"
              : "text-green-700"
          )}
        >
          <CheckCircle /> One number or symbol
        </p>
      </Card>
      <LabeledInput
        label="Confirm new password"
        type="password"
        error={confirmPasswordError as FieldError}
        {...register("confirmPassword")}
      />
      <Button className="w-full my-4">Change password</Button>
    </form>
  )
}
