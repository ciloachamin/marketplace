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
            label: 'Membership Name',
            type: 'text',
            required: true,
        },
        {
            name: 'active',
            label: 'Active',
            type: 'select',
            defaultValue: 'pending',
            options: [
                {
                    label: 'Pending verification',
                    value: 'pending',
                },
                {
                    label: 'Approved',
                    value: 'approved',
                },
                {
                    label: 'Denied',
                    value: 'denied',
                },
            ],
            required: true,
        },
        {
            name: 'time',
            label: 'Time',
            min: 0,
            max: 1000,
            type: 'number',
            required: true,
        },

        {
            name: 'startDate',
            label: 'Start Date',
            type: 'date',
            required: true,
        },
        {
            name: 'endDate',
            label: 'End Date',
            type: 'date',
            required: true,
        },
        {
            name: 'price',
            label: 'Price',
            type: 'number',
            required: true,
        },



    ],
}
