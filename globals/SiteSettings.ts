import type { GlobalConfig } from 'payload'

// Global site-wide settings: contacts, logo, socials.
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки на сайта',
  admin: { group: 'Настройки' },
  access: { read: () => true },
  fields: [
    { name: 'siteName', label: 'Име на сайта', type: 'text', defaultValue: 'NATURA' },
    { name: 'logo', label: 'Лого', type: 'upload', relationTo: 'media' },
    { name: 'logoLight', label: 'Лого (светла версия)', type: 'upload', relationTo: 'media' },
    {
      type: 'collapsible',
      label: 'Контакти',
      fields: [
        { name: 'phone', label: 'Телефон', type: 'text' },
        { name: 'phoneSecondary', label: 'Втори телефон', type: 'text' },
        { name: 'email', label: 'Имейл', type: 'email' },
        { name: 'address', label: 'Адрес', type: 'textarea' },
        { name: 'workingHours', label: 'Работно време', type: 'text' },
        {
          name: 'mapEmbed',
          label: 'Google Maps embed (iframe src)',
          type: 'text',
        },
      ],
    },
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
            { label: 'YouTube', value: 'youtube' },
          ],
        },
        { name: 'url', label: 'Линк', type: 'text' },
      ],
    },
  ],
}
