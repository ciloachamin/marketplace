import {
  AfterChangeHook,
  BeforeChangeHook,
} from 'payload/dist/collections/config/types'
import { PRODUCT_CATEGORIES } from '../../config'
import { Access, CollectionConfig } from 'payload/types'
import { Product, User } from '../../payload-types'

const addUser: BeforeChangeHook<Product> = async ({
  req,
  data,
}) => {
  // Obtén el valor actual del campo 'user' del producto
  const currentUser = data.user;

  // Si el campo 'user' ya tiene un valor, no lo cambies
  if (currentUser) {
    return data;
  }

  // Si el campo 'user' no tiene un valor, asigna el ID del usuario que realiza la acción
  const user = req.user;
  return { ...data, user: user.id };
};


const syncUser: AfterChangeHook<Product> = async ({
  req,
  doc,
}) => {
  const fullUser = await req.payload.findByID({
    collection: 'users',
    id: req.user.id,
  })

  if (fullUser && typeof fullUser === 'object') {
    const { products } = fullUser

    const allIDs = [
      ...(products?.map((product) =>
        typeof product === 'object' ? product.id : product
      ) || []),
    ]

    const createdProductIDs = allIDs.filter(
      (id, index) => allIDs.indexOf(id) === index
    )

    const dataToUpdate = [...createdProductIDs, doc.id]

    await req.payload.update({
      collection: 'users',
      id: fullUser.id,
      data: {
        products: dataToUpdate,
      },
    })
  }
}

const isAdminOrHasAccess =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined

    if (!user) return false
    if (user.role === 'admin') {
      // Usuario administrador, permitir acceso
      return true;
    } else if (user.role === 'user') {
      // Usuario con rol 'user', denegar acceso
      return false;
    }
  

    const userProductIDs = (user.products || []).reduce<
      Array<string>
    >((acc, product) => {
      if (!product) return acc
      if (typeof product === 'string') {
        acc.push(product)
      } else {
        acc.push(product.id)
      }

      return acc
    }, [])

    return {
      id: {
        in: userProductIDs,
      },
    }
  }

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isAdminOrHasAccess(),
    update: isAdminOrHasAccess(),
    delete: isAdminOrHasAccess(),
  },
  hooks: {
    afterChange: [syncUser],
    beforeChange: [
      addUser,
    ],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'name',
      label: 'Nombre del producto',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Detalles del producto',
    },
    {
      name: 'price',
      label: 'Precio en USD',
      min: 0,
      max: 1000,
      type: 'number',
      required: true,
    },
    
    {
      name: 'stock',
      label: 'Stock disponible (Opcional)',
      min: 0,
      max: 1000,
      type: 'number',
    },

    {
      name: 'category',
      label: 'Categoría del producto',
      type: 'select',
      options: PRODUCT_CATEGORIES.map(
        ({ label, value }) => ({ label, value })
      ),
      required: true,
    },
    {
      name: 'product_files',
      label: 'Archivos del producto',
      type: 'relationship',
      relationTo: 'product_files',
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'approvedForSale',
      label: 'Estado de aprobación para la venta',
      type: 'select',
      defaultValue: 'approved',
      access: {
        create: ({ req }) => req.user.role === 'admin',
        read: ({ req }) => req.user.role === 'admin',
        update: ({ req }) => req.user.role === 'admin',
      },
      options: [
        {
          label: 'Pendiente Verificación',
          value: 'pending',
        },
        {
          label: 'Aprobado para la venta',
          value: 'approved',
        },
        {
          label: 'Denegado para la venta',
          value: 'denied',
        },
      ],
    },
    {
      name: 'priceId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Imagenes del producto',
      minRows: 1,
      maxRows: 10,
      required: true,
      labels: {
        singular: 'Imagen',
        plural: 'Imagenes',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
