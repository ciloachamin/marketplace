import { z } from 'zod'
import {
  privateProcedure,
  publicProcedure,
  router,
} from './trpc'
import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../get-payload'


export const paymentRouter = router({

  createSession: privateProcedure
    .input(z.object({ productIds: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      const { productIds } = input;
      if (productIds.length === 0) {
        throw new TRPCError({ code: 'BAD_REQUEST' });
      }
      const payload = await getPayloadClient();
      const { docs: products } = await payload.find({
        collection: 'products',
        where: {
          id: {
            in: productIds,
          },
        },
      });

      // Actualizar el stock de cada producto
      for (const product of products) {
        if (product && typeof product.id === 'string' && typeof product.stock === 'number') {
          const result = await payload.update({
            collection: 'products',
            where: {
              id: {
                equals: product.id,
              },
            },
            data: {
              stock: product.stock - 1, // Restar uno al stock actual
            },
          });
        }
      }

      const filteredProducts = products.filter((prod) =>
        Boolean(prod.price)
      );
      const order = await payload.create({
        collection: 'orders',
        data: {
          _isPaid: false,
          products: filteredProducts.map((prod) => prod.id),
          user: user.id,
        },
      });


      // Actualizar el stock de cada producto
      for (const product of products) {
        if (product && typeof product.id === 'string' && typeof product.stock === 'number') {
          const result = await payload.update({
            collection: 'products',
            where: {
              id: {
                equals: product.id,
              },
            },
            data: {
              stock: product.stock - 1, // Restar uno al stock actual
            },
          });
        }
      }
      // Devuelve la URL como parte de la respuesta
      const thankYouUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`;

      return { url: thankYouUrl };
    }),

  

  pollOrderStatus: privateProcedure
    .input(z.object({ orderId: z.string() }))
    .query(async ({ input }) => {
      const { orderId } = input

      const payload = await getPayloadClient()

      const { docs: orders } = await payload.find({
        collection: 'orders',
        where: {
          id: {
            equals: orderId,
          },
        },
      })

      if (!orders.length) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const [order] = orders

      return { isPaid: order._isPaid }
    }),
})
