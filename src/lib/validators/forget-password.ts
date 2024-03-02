import { z } from "zod"

export const ForgetPasswordCredentialsValidator = z.object({
  email: z.string().email({
    message: 'El correo electrónico debe ser válido.',
  }),
})

export type TForgetPasswordCredentialsValidator = z.infer<
  typeof ForgetPasswordCredentialsValidator
>