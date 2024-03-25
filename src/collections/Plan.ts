// collections/plans.ts
import { CollectionConfig } from 'payload/types';

export const Plans: CollectionConfig = {
  slug: 'plans',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'time',
      type: 'number',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
  ],
};