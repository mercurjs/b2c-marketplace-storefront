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
import { loginFormSchema, LoginFormData } from "./schema"
import { useState } from "react"
import { login } from "@/lib/data/customer"
import { useRouter } from "next/navigation"

export const LoginForm = () => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  )
}

const Form = () => {
  const [error, setError] = useState("")
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext()
  const router = useRouter()

  const submit = async (data: FieldValues) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)

    const res = await login(formData)
    if (res) {
      setError(res)
      return
    }
    setError("")
    router.push("/user")
  }

  return (
    <main className="container">
      <h1 className="heading-xl text-center uppercase my-6">
        Log in to your account
      </h1>
      <form onSubmit={handleSubmit(submit)}>
        <div className="w-96 max-w-full mx-auto space-y-4">
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
          {error && <p className="label-md text-negative">{error}</p>}
          <Button className="w-full" disabled={isSubmitting}>
            Log in
          </Button>
          <p className="text-center label-md">
            Don&apos;t have an account yet?{" "}
            <LocalizedClientLink href="/user/register" className="underline">
              Sign up!
            </LocalizedClientLink>
          </p>
        </div>
      </form>
    </main>
  )
}
