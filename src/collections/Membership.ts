import { Access, CollectionConfig } from 'payload/types'

const yourOwn: Access = ({ req: { user } }) => {
    if (user.role === 'admin') return true

    return {
        user: {
            equals: user?.id,
        },
    }
}

export const Membership: CollectionConfig = {
    slug: 'membership',
    admin: {
        useAsTitle: 'Your membership',
    },
    access: {
        read: yourOwn,
        update: ({ req }) => req.user.role === 'admin',
        delete: ({ req }) => req.user.role === 'admin',
        create: ({ req }) => req.user.role === 'admin',
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
            label: 'Nombre de la membresía',
            type: 'text',
            required: true,
        },
        {
            name: 'active',
            label: 'Activo',
            type: 'select',
            defaultValue: 'pending',
            options: [
                {
                    label: 'Pendiente de Verificación',
                    value: 'pending',
                },
                {
                    label: 'Approvado',
                    value: 'approved',
                },
                {
                    label: 'Denegado',
                    value: 'denied',
                },
            ],
            required: true,
        },
        {
            name: 'time',
            label: 'Tiempo de la membresía (días)',
            min: 0,
            max: 1000,
            type: 'number',
            required: true,
        },

        {
            name: 'startDate',
            label: 'Fecha inicial de la membresía',
            type: 'date',
            required: true,
        },
        {
            name: 'endDate',
            label: 'Fecha final de la membresía',
            type: 'date',
            required: true,
        },
        {
            name: 'price',
            label: 'Precio Pagado',
            type: 'number',
            required: true,
        },



    ],
}
