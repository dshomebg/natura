import type { CollectionConfig } from 'payload'

// Inquiries submitted from the public site (contact form, apartment inquiry).
// Anyone may create one; only logged-in staff may read/manage them.
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Запитване', plural: 'Запитвания' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'type', 'status', 'createdAt'],
    group: 'Запитвания',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'type',
      label: 'Тип',
      type: 'select',
      defaultValue: 'general',
      options: [
        { label: 'Общо запитване', value: 'general' },
        { label: 'Апартамент', value: 'apartment' },
      ],
    },
    {
      name: 'status',
      label: 'Статус',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Ново', value: 'new' },
        { label: 'В обработка', value: 'in_progress' },
        { label: 'Приключено', value: 'done' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Име', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'phone', label: 'Телефон', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'email', label: 'Имейл', type: 'email' },
    {
      name: 'apartment',
      label: 'Апартамент',
      type: 'relationship',
      relationTo: 'apartments',
      admin: { description: 'Попълва се автоматично при запитване за конкретен апартамент.' },
    },
    { name: 'message', label: 'Съобщение', type: 'textarea' },
  ],
  timestamps: true,
}
