import { z } from 'zod';

export const UserCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
  firstName: z.string().min(2).max(50, {
    message: 'First name must be between 2 and 50 characters long.',
  }),
  lastName: z.string().min(2).max(50, {
    message: 'Last name must be between 2 and 50 characters long.',
  }),
  phone: z.string().min(10).max(15, {
    message: 'Phone number must be between 10 and 15 characters long.',
  }),
});

export type TUserCredentialsValidator = z.infer<typeof UserCredentialsValidator>;
