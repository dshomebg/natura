import type { CollectionConfig } from 'payload'

// Team members.
export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: 'Член на екипа', plural: 'Екип' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'position', 'order'],
    group: 'Съдържание',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Име', type: 'text', required: true },
    { name: 'position', label: 'Длъжност', type: 'text' },
    { name: 'photo', label: 'Снимка', type: 'upload', relationTo: 'media' },
    { name: 'bio', label: 'Кратко представяне', type: 'textarea' },
    {
      name: 'socials',
      label: 'Социални мрежи',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Мрежа',
          type: 'select',
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Twitter / X', value: 'twitter' },
          ],
        },
        { name: 'url', label: 'Линк', type: 'text' },
      ],
    },
    {
      name: 'order',
      label: 'Подредба',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
}
