import express from 'express'
import { getPayloadClient } from './get-payload'
import { nextApp, nextHandler } from './next-utils'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './trpc'
import { inferAsyncReturnType } from '@trpc/server'
import bodyParser from 'body-parser'
import { IncomingMessage } from 'http'
import nextBuild from 'next/dist/build'
import path from 'path'
import { PayloadRequest } from 'payload/types'
import { parse } from 'url'
import { Request, Response, NextFunction } from 'express';
import { mediaManagement } from "payload-cloudinary-plugin";


const app = express()


app.use(mediaManagement());




const PORT = Number(process.env.PORT) || 3000



const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
})

export type ExpressContext = inferAsyncReturnType<
  typeof createContext
>

export type WebhookRequest = IncomingMessage & {
  rawBody: Buffer
}

const start = async () => {
  const webhookMiddleware = bodyParser.json({
    verify: (req: WebhookRequest, _, buffer) => {
      req.rawBody = buffer
    },
  })

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  })

  if (process.env.NEXT_BUILD) {
    app.listen(PORT,"0.0.0.0", async () => {
      payload.logger.info(
        'Next.js is building for production'
      )

      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))

      process.exit()
    })

    return
  }

  const cartRouter = express.Router()

  cartRouter.use(payload.authenticate)

  cartRouter.get('/', (req, res) => {
    const request = req as PayloadRequest

    if (!request.user)
      return res.redirect('/sign-in?origin=cart')

    const parsedUrl = parse(req.url, true)
    const { query } = parsedUrl

    return nextApp.render(req, res, '/cart', query)
  })

  app.use('/cart', cartRouter)
  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )






  const routers = express.Router()

  // Note: Payload must be initialized before the `payload.authenticate` middleware can be used
  routers.use(payload.authenticate)

  routers.get('/', (req, res) => {
    const request = req as PayloadRequest
    if (request.user.role === 'admin') {
      return res.send(`Authenticated successfully as admin ${request.user.email}.`)
    }
    return res.send('Not authenticated')
  })

  app.use('/hola', routers)



  const searchProducts = async (req: Request, res: Response) => {
    try {
      const { q, userId } = req.query;
      let whereCondition: any = { approvedForSale: { equals: 'approved' } };
  
      if (userId) {
        whereCondition.user = { equals: userId };
      }
  
      // Consulta para obtener productos del usuario con roles "sellpremium" y "sellbasic"
      const paginatedProducts = await payload.find({
        collection: 'products',
        where: whereCondition,
        page: 1,
        limit: 1000,
      });
      // Convertir PaginatedDocs a un array
      const products = paginatedProducts.docs || [];
  
      // Implementar la búsqueda por palabra clave
      if (q) {
        const results = products.filter((product) => {
          // Asegúrate de que 'product.name' sea una cadena
          const productName =
            typeof product.name === 'string' ? product.name : '';
          return productName.toLowerCase().includes(q.toString().toLowerCase());
        });
  
        return res.status(200).json(results);
      }
  
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  
  app.get('/api/search', searchProducts);
  



  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Next.js started')

    app.listen(PORT, "0.0.0.0", async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      )
    })
  })
}

start()
