import type { GlobalConfig } from 'payload'

// Home page content: hero banner + which sections show and in what order.
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Начална страница',
  admin: { group: 'Настройки' },
  access: { read: () => true },
  fields: [
    {
      type: 'collapsible',
      label: 'Hero банер',
      fields: [
        { name: 'heroTitle', label: 'Заглавие', type: 'text' },
        { name: 'heroSubtitle', label: 'Подзаглавие', type: 'textarea' },
        { name: 'heroImage', label: 'Фоново изображение', type: 'upload', relationTo: 'media' },
        {
          type: 'row',
          fields: [
            { name: 'heroCtaLabel', label: 'Бутон (текст)', type: 'text', admin: { width: '50%' } },
            { name: 'heroCtaHref', label: 'Бутон (линк)', type: 'text', admin: { width: '50%' } },
          ],
        },
      ],
    },
    {
      name: 'sections',
      label: 'Секции (вкл./изкл. и подредба)',
      type: 'array',
      admin: {
        description: 'Подреди чрез влачене. Изключи секция с премахване на отметката.',
      },
      fields: [
        {
          name: 'type',
          label: 'Секция',
          type: 'select',
          required: true,
          options: [
            { label: 'За нас', value: 'about' },
            { label: 'Услуги', value: 'services' },
            { label: 'Проекти', value: 'projects' },
            { label: 'Апартаменти', value: 'apartments' },
            { label: 'Екип', value: 'team' },
            { label: 'Блог', value: 'blog' },
            { label: 'Отзиви', value: 'testimonials' },
            { label: 'Контакти', value: 'contact' },
          ],
        },
        { name: 'enabled', label: 'Активна', type: 'checkbox', defaultValue: true },
      ],
    },
  ],
}
