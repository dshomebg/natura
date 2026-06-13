import type { CollectionConfig } from 'payload'
import { slugField } from '../utils/slug'

// Services: construction, renovation, architecture, etc.
export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Услуга', plural: 'Услуги' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
    group: 'Съдържание',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', label: 'Заглавие', type: 'text', required: true },
    { name: 'excerpt', label: 'Кратко описание', type: 'textarea' },
    { name: 'description', label: 'Описание', type: 'richText' },
    {
      name: 'icon',
      label: 'Икона / снимка',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      label: 'Подредба',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
    slugField('title'),
  ],
}
