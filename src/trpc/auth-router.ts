import { UserCredentialsValidator } from '../lib/validators/user-create'
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator'
import { publicProcedure, router } from './trpc'
import { getPayloadClient } from '../get-payload'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(UserCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password, firstName,lastName,phone } = input
      const payload = await getPayloadClient()

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })


      if (users.length !== 0)
        throw new TRPCError({ code: 'CONFLICT' })

      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          firstName,
          lastName,
          phone,
          role: 'user',
        },
      })

      return { success: true, sentToEmail: email }
    }),

  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input

      const payload = await getPayloadClient()

      const isVerified = await payload.verifyEmail({
        collection: 'users',
        token,
      })

      if (!isVerified)
        throw new TRPCError({ code: 'UNAUTHORIZED' })

      return { success: true }
    }),

  signIn: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input
      const { res } = ctx
      const payload = await getPayloadClient()
      try {
        await payload.login({
          collection: 'users',
          data: {
            email,
            password,
          },
          res,
        })

        return { success: true }
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),


    forgotPassword: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      const { email } = input;
      const payload = await getPayloadClient();
      try {
        const token = await payload.forgotPassword({
          collection: 'users',
          data: {
            email: email,
          },
        })
        return { success: true , sentToEmail: email}
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),

    resetPassword: publicProcedure
    .input(z.object({ token: z.string(), password: z.string() }))
    .query(async ({ input }) => {
      const { token, password } = input;
      const payload = await getPayloadClient();
      try {
        const result= await payload.resetPassword({
          collection: 'users',
          data: {
            token: token,
            password: password,
          },
          overrideAccess : true
        })
        return { success: true }
      } catch (err) {
        
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }
    }),
})
