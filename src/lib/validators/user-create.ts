import { z } from 'zod';

export const UserCredentialsValidator = z.object({
  email: z.string().email({
    message: 'El correo electrónico debe ser válido.',
  }),
  password: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.',
  }),
  campus: z.enum(['matriz', 'iasa', 'latacunga'], {
    errorMap: () => ({ message: "El campus debe ser uno de los siguientes: Matriz, IASA, Latacunga" })
  }),
  firstName: z.string().min(2).max(50, {
    message: 'El nombre debe tener entre 2 y 50 caracteres.',
  }),
  lastName: z.string().min(2).max(50, {
    message: 'El apellido debe tener entre 2 y 50 caracteres.',
  }),
  phone: z.string().length(10, {
    message: 'El número de teléfono debe tener 10 caracteres.',
  }),
  
});

export type TUserCredentialsValidator = z.infer<typeof UserCredentialsValidator>;
