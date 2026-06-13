import type { GlobalConfig } from 'payload'

// Footer content (editable from the admin).
export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Футър',
  admin: { group: 'Настройки' },
  access: { read: () => true },
  fields: [
    { name: 'about', label: 'Кратък текст за фирмата', type: 'textarea' },
    {
      name: 'columns',
      label: 'Колони с връзки',
      type: 'array',
      labels: { singular: 'Колона', plural: 'Колони' },
      fields: [
        { name: 'title', label: 'Заглавие', type: 'text', required: true },
        {
          name: 'links',
          label: 'Връзки',
          type: 'array',
          fields: [
            { name: 'label', label: 'Текст', type: 'text', required: true },
            { name: 'href', label: 'Линк', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'copyright',
      label: 'Copyright текст',
      type: 'text',
      defaultValue: '© NATURA. Всички права запазени.',
    },
  ],
}
