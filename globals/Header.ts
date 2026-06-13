import type { GlobalConfig } from 'payload'

// Main navigation menu (editable from the admin).
export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Меню (навигация)',
  admin: { group: 'Настройки' },
  access: { read: () => true },
  fields: [
    {
      name: 'items',
      label: 'Точки в менюто',
      type: 'array',
      labels: { singular: 'Точка', plural: 'Точки' },
      fields: [
        { name: 'label', label: 'Текст', type: 'text', required: true },
        { name: 'href', label: 'Линк', type: 'text', required: true },
        {
          name: 'children',
          label: 'Подточки',
          type: 'array',
          fields: [
            { name: 'label', label: 'Текст', type: 'text', required: true },
            { name: 'href', label: 'Линк', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'ctaLabel',
      label: 'Бутон (текст)',
      type: 'text',
    },
    {
      name: 'ctaHref',
      label: 'Бутон (линк)',
      type: 'text',
    },
  ],
}
