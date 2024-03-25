import { CustomSelectComponent } from '../components/SelectUser'
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
            label: 'Usuario',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                sortOptions: '-createdAt',

            },
        },
        {
            name: 'plan',
            hasMany: false,
            required: true,
            type: 'select',
            options: [
                { label: 'Sell', value: 'sell' },
                { label: 'Sell Basic', value: 'sellbasic' },
                { label: 'Sell Premium', value: 'sellpremium' },
            ],
        },
        {
            name: 'commentary',
            label: 'Comentario',
            type: 'text',
        },
        {
            name: 'active',
            label: 'Activo',
            type: 'select',
            defaultValue: 'approved',
            options: [
                {
                    label: 'Pendiente de Verificación',
                    value: 'pending',
                },
                {
                    label: 'Activo',
                    value: 'approved',
                },
                {
                    label: 'Inactivo',
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
            defaultValue: () => new Date(),
            required: true,
        },
        {
            name: 'endDate',
            label: 'Fecha final de la membresía',
            type: 'date',
            required: false,
        },
        {
            name: 'price',
            label: 'Precio Pagado',
            type: 'number',
            required: true,
        },

    ],
    hooks: {


        beforeChange: [
            async ({ data, req }) => {
                if (data.startDate && data.time) {
                    const startDate = new Date(data.startDate);
                    startDate.setDate(startDate.getDate() + data.time);
                    data.endDate = startDate;
                }
                if (data.active) {
                    const user = await req.payload.findByID({ collection: 'users', id: data.user });
                    if (user) {
                        if (data.active === 'approved') {
                            if (data.plan === 'sell') {
                                await req.payload.update({
                                    collection: 'users',
                                    id: user.id,
                                    data: { role: 'sell' },
                                });
                            } else if (data.plan === 'sellbasic') {
                                await req.payload.update({
                                    collection: 'users',
                                    id: user.id,
                                    data: { role: 'sellbasic' },
                                });
                            } else if (data.plan === 'sellpremium') {
                                await req.payload.update({
                                    collection: 'users',
                                    id: user.id,
                                    data: { role: 'sellpremium' },
                                });
                            }
                            const { docs: products } = await req.payload.find({ collection: 'products', where: { user: { equals: user.id } } });
                            if (products && products.length > 0) {
                                for (let product of products) {
                                    await req.payload.update({
                                        collection: 'products',
                                        where: {
                                            id: {
                                                equals: product.id,
                                            },
                                        },
                                        data: { approvedForSale: 'approved' },
                                    });
                                }
                            }
                        } else if (data.active === 'denied') {
                            await req.payload.update({
                                collection: 'users',
                                id: user.id,
                                data: { role: 'user' },
                            });
                            const { docs: products } = await req.payload.find({ collection: 'products', where: { user: { equals: user.id } } });
                            if (products && products.length > 0) {
                                for (let product of products) {
                                    await req.payload.update({
                                        collection: 'products',
                                        where: {
                                            id: {
                                                equals: product.id,
                                            },
                                        },
                                        data: { approvedForSale: 'pending' },
                                    });
                                }
                            }
                        }
                    }
                }               
                return data;
            },
        ],
    },

}
