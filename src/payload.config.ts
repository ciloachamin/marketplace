import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { Users } from './collections/Users'
import dotenv from 'dotenv'
import { Products } from './collections/Products/Products'
import { Media } from './collections/Media'
import { ProductFiles } from './collections/ProductFile'
import { Orders } from './collections/Orders'
import { Membership } from './collections/Membership'
import cloudinaryPlugin from "payload-cloudinary-plugin/dist/plugins";

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

export default buildConfig({
  plugins: [cloudinaryPlugin()],
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '', 
  collections: [Users, Products, Media, ProductFiles, Orders, Membership], 
  routes: {
    admin: '/sell',
    
    
  },
  admin: {
    user: 'users',
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- ESPE SHOP',
      favicon: '/favicon.ico',
      ogImage: '/thumbnail.jpg',
    },
  },
  rateLimit: {
    max: 2000,
  },

  csrf: [ // whitelist of domains to allow cookie auth from
  'http://localhost:3000',
  'https://www.smrtuc.com',
  'https://smrtuc.com',
  'https://marketplace-production-8aec.up.railway.app',
  ],
  cors: '*',

  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },


})
