import { PrimaryActionEmailHtml } from '../components/emails/PrimaryActionEmail'
import { Access, CollectionConfig } from 'payload/types'

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user.role === 'admin') return true

  return {
    id: {
      equals: user.id,
    },
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  
  auth: {
    
    verify: {
      generateEmailHTML: ({ token }) => {
        return PrimaryActionEmailHtml({
          actionLabel: "verify your account",
          buttonText: "Verify Account",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`
        })
      },
    },
    tokenExpiration:  60 * 60 * 24 * 30, // 30 days
    // cookies: {
    //   secure: true,
    //   sameSite: 'none',
    //   domain: process.env.NEXT_PUBLIC_SERVER_URL,
      
    // },

    forgotPassword: {
      generateEmailHTML: (token) => {
        return PrimaryActionEmailHtml({
          actionLabel: "reset your password",
          buttonText: "Reset Password",
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token?.token}`
        })

      },
    
    },
  
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: adminsAndUser,
    delete: ({ req }) => req.user.role === 'admin',
  },
  admin: {
    hidden: ({ user }) => user.role !== 'admin',
    defaultColumns: ['id'],

  },
  fields: [
    {
      name: 'products',
      label: 'Productos',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'membership',
      label: 'Membresía',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'membership',
      hasMany: true,
    },
    {
      name: 'product_files',
      label: 'Archivos de Productos',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'product_files',
      hasMany: true,
    },
    {
      name: 'role',
      defaultValue: 'user',
      required: true,
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
        { label: 'Sell', value: 'sell' },
        { label: 'Sell Basic', value: 'sellbasic' },
        { label: 'Sell Premium', value: 'sellpremium' },

      ],
      access: {
        update: ({ req }) => req.user.role === 'admin',
      },
      
    },
     {
      name: 'firstName',
      label: 'Nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Apelido',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      label: 'Celular',
      type: 'text',
      required: true,
    },
    {
      name: 'timeStart',
      label: 'Hora en la que está disponible para atender en la Universidad',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm:ss a',
        },
      },
    },
    {
      name: 'timeEnd',
      label: 'Hora en la que termina de atender en la Universidad',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm:ss a',
        },
      },
    },
  ],
}
