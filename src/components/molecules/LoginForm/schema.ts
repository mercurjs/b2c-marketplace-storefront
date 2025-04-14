import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().nonempty("Please enter email").email("Invalid email"),
  password: z.string().nonempty("Please enter password"),
})

export type LoginFormData = z.infer<typeof loginFormSchema>
