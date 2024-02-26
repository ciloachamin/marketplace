import { z } from "zod"

export const ResetPasswordCredentialsValidator = z.object({
  password: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.',
  }),
})

export type TResetPasswordCredentialsValidator = z.infer<
  typeof ResetPasswordCredentialsValidator
>
