import type { CollectionConfig } from 'payload'

// Admin/editor accounts. Auth-enabled so it powers the Payload admin login.
export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Потребител',
    plural: 'Потребители',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  auth: true,
  fields: [
    {
      name: 'name',
      label: 'Име',
      type: 'text',
      required: true,
    },
  ],
}
