import type { CollectionConfig } from 'payload'
import { slugField } from '@/utils/slug'

// Shared categories for blog posts and projects.
export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { singular: 'Категория', plural: 'Категории' },
  admin: { useAsTitle: 'name', group: 'Съдържание' },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Име', type: 'text', required: true },
    {
      name: 'type',
      label: 'За',
      type: 'select',
      defaultValue: 'blog',
      options: [
        { label: 'Блог', value: 'blog' },
        { label: 'Проекти', value: 'project' },
      ],
    },
    slugField('name'),
  ],
}
