import type { CollectionConfig } from 'payload'
import { slugField } from '@/utils/slug'

// Blog posts / news.
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Публикация', plural: 'Блог' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', '_status'],
    group: 'Съдържание',
  },
  access: {
    // Only published posts are public; drafts stay private.
    read: ({ req: { user } }) => {
      if (user) return true
      return { _status: { equals: 'published' } }
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', label: 'Заглавие', type: 'text', required: true },
    {
      name: 'cover',
      label: 'Заглавна снимка',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'excerpt', label: 'Кратко описание', type: 'textarea' },
    { name: 'content', label: 'Съдържание', type: 'richText' },
    {
      name: 'category',
      label: 'Категория',
      type: 'relationship',
      relationTo: 'categories',
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      label: 'Автор',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      label: 'Дата на публикуване',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar' },
    },
    slugField('title'),
  ],
}
