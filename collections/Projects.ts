import type { CollectionConfig } from 'payload'
import { slugField } from '@/utils/slug'

// Company projects / portfolio.
export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Проект', plural: 'Проекти' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'status', 'featured'],
    group: 'Съдържание',
  },
  access: { read: () => true },
  fields: [
    { name: 'title', label: 'Заглавие', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'location', label: 'Локация', type: 'text', admin: { width: '50%' } },
        {
          name: 'category',
          label: 'Категория',
          type: 'relationship',
          relationTo: 'categories',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'status',
      label: 'Статус',
      type: 'select',
      defaultValue: 'completed',
      options: [
        { label: 'Завършен', value: 'completed' },
        { label: 'В процес', value: 'in_progress' },
        { label: 'Предстоящ', value: 'upcoming' },
      ],
    },
    {
      name: 'completedDate',
      label: 'Дата на завършване',
      type: 'date',
      admin: { date: { pickerAppearance: 'monthOnly' } },
    },
    { name: 'excerpt', label: 'Кратко описание', type: 'textarea' },
    { name: 'description', label: 'Описание', type: 'richText' },
    {
      name: 'cover',
      label: 'Основна снимка',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      label: 'Галерия',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
    {
      name: 'featured',
      label: 'Препоръчан (на начална страница)',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      label: 'Подредба',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar', description: 'По-малко число = по-напред.' },
    },
    slugField('title'),
  ],
}
