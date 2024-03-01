import { z } from 'zod'
import { authRouter } from './auth-router'
import { publicProcedure, privateProcedure, router } from './trpc'
import { QueryValidator } from '../lib/validators/query-validator'
import { getPayloadClient } from '../get-payload'
import { paymentRouter } from './payment-router'


const getProductSellerPremiumInputSchema = z.object({
  limit: z.number().min(1).max(100),
  cursor: z.number().nullish(),
  query: QueryValidator,
});

export const appRouter = router({
  auth: authRouter,
  payment: paymentRouter,
  getProductUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor, userId } = input
      const { sort, limit, ...queryOpts } = query

      const payload = await getPayloadClient()

      const parsedQueryOpts: Record<
        string,
        { equals: string }
      > = {}

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        }
      })

      const page = cursor || 1

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: 'products',
        where: {
          user: {
            equals: userId,
          },
          approvedForSale: {
            equals: 'approved',
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      })
      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      }
    }),

  getInfiniteProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
        query: QueryValidator,
      })
    )
    .query(async ({ input }) => {
      const { query, cursor } = input
      const { sort, limit, ...queryOpts } = query     
      const payload = await getPayloadClient()

      const parsedQueryOpts: Record<
        string,
        { equals: string }
      > = {}

      Object.entries(queryOpts).forEach(([key, value]) => {
        parsedQueryOpts[key] = {
          equals: value,
        }
      })

      const page = cursor || 1

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: 'products',
        where: {
          approvedForSale: {
            equals: 'approved',
          },
          ...parsedQueryOpts,
        },
        sort,
        depth: 1,
        limit,
        page,
      })

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      }
    }),
// Nueva función getProductSellerPremium
getProductSellerPremium: publicProcedure
  .input(getProductSellerPremiumInputSchema)
  .query(async ({ input }) => {
    const { query, cursor } = input;
    const { sort, limit, ...queryOpts } = query;

    const payload = await getPayloadClient();

    const parsedQueryOpts: Record<string, { equals: string }> = {};
    Object.entries(queryOpts).forEach(([key, value]) => {
      parsedQueryOpts[key] = {
        equals: value,
      };
    });

    const page = cursor || 1;

    // Primero, obtenemos los usuarios con los roles 'sellpremium' y 'sellbasic'
    // CAmbiar a me muestra solo los sellpremium
    const { docs: users } = await payload.find({
      collection: 'users',
      where: {
        role: {
          in: ['sellpremium', 'sellbasic', 'admin'],
        },
      },

    });
   // console.log('users', users)
    

    // Luego, obtenemos los productos que están aprobados para la venta y cuyo campo 'user' se encuentra en la lista de usuarios obtenidos en la primera consulta
    const {
      docs: items,
      hasNextPage,
      nextPage,
    } = await payload.find({
      collection: 'products',
      where: {
        approvedForSale: {
          equals: 'approved',
        },
        user: {
          in: users.map(user => user.id), // Aquí utilizamos el array de usuarios obtenidos en la primera consulta
        },
        ...parsedQueryOpts,
      },
      sort,
      depth: 1,
      limit,
      page,
    });
    return {
      items,
      nextPage: hasNextPage ? nextPage : null,
    };
  }),


})

export type AppRouter = typeof appRouter
