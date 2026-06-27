import type { GlobalConfig, Field } from 'payload'

// SEO + visible heading for the main static pages, editable from the admin.
// Detail pages (apartment/project/post) generate their meta from content and
// are intentionally not listed here.

type Defaults = { heading?: string; metaTitle: string; metaDescription: string }

// Build one titled group of fields for a page. `heading` is the visible H1 /
// breadcrumb title; the home page has no breadcrumb so it omits it.
const page = (
  name: string,
  label: string,
  defaults: Defaults,
  withHeading = true,
): Field => ({
  name,
  label,
  type: 'group',
  fields: [
    ...(withHeading
      ? [
          {
            name: 'heading',
            label: 'Заглавие на страницата (H1)',
            type: 'text' as const,
            defaultValue: defaults.heading,
            admin: { description: 'Голямото заглавие и текстът в breadcrumb-а.' },
          },
        ]
      : []),
    {
      name: 'metaTitle',
      label: 'Мета заглавие (SEO)',
      type: 'text',
      defaultValue: defaults.metaTitle,
      admin: {
        description: 'Показва се в таба на браузъра и в Google. ~50–60 знака.',
      },
    },
    {
      name: 'metaDescription',
      label: 'Мета описание (SEO)',
      type: 'textarea',
      defaultValue: defaults.metaDescription,
      admin: {
        description: 'Краткото описание под заглавието в Google. ~150–160 знака.',
      },
    },
  ],
})

export const PageMeta: GlobalConfig = {
  slug: 'page-meta',
  label: 'SEO / Заглавия на страниците',
  admin: {
    group: 'Настройки',
    description:
      'Заглавия и SEO мета (title/description) за основните страници. ' +
      'Детайлните страници (апартамент, проект, публикация) се попълват ' +
      'автоматично от съдържанието им.',
  },
  access: { read: () => true },
  fields: [
    page(
      'home',
      'Начало',
      {
        metaTitle: 'NATURA — строителство, ремонти и архитектура',
        metaDescription:
          'NATURA — строителство, ремонти и архитектура. Качествени проекти, ' +
          'апартаменти за продажба и професионален екип.',
      },
      false,
    ),
    page('about', 'За нас', {
      heading: 'За нас',
      metaTitle: 'За нас — NATURA',
      metaDescription:
        'Запознайте се с NATURA — фирма за строителство, ремонти и архитектура, ' +
        'и нашия екип.',
    }),
    page('service', 'Услуги', {
      heading: 'Услуги',
      metaTitle: 'Услуги — NATURA',
      metaDescription:
        'Услугите на NATURA: строителство, ремонти, архитектура и проектиране.',
    }),
    page('project', 'Проекти', {
      heading: 'Проекти',
      metaTitle: 'Проекти — NATURA',
      metaDescription: 'Реализирани проекти на NATURA в строителството и ремонтите.',
    }),
    page('apartments', 'Апартаменти', {
      heading: 'Апартаменти',
      metaTitle: 'Апартаменти за продажба — NATURA',
      metaDescription: 'Свободни апартаменти в проектите на NATURA.',
    }),
    page('news', 'Блог', {
      heading: 'Блог',
      metaTitle: 'Блог — NATURA',
      metaDescription: 'Новини и статии от NATURA.',
    }),
    page('contact', 'Контакти', {
      heading: 'Контакти',
      metaTitle: 'Контакти — NATURA',
      metaDescription:
        'Свържете се с екипа на NATURA — телефон, имейл, адрес и форма за запитване.',
    }),
  ],
}
