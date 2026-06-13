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
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        try {
          const settings = await req.payload.findGlobal({ slug: 'site-settings' })
          const to = process.env.NOTIFY_EMAIL || settings?.email
          if (!to) return
          const typeLabel = doc.type === 'apartment' ? 'апартамент' : 'общо'
          await req.payload.sendEmail({
            to,
            subject: `Ново запитване (${typeLabel}) от ${doc.name}`,
            text: [
              `Тип: ${typeLabel}`,
              `Име: ${doc.name}`,
              `Телефон: ${doc.phone || '-'}`,
              `Имейл: ${doc.email || '-'}`,
              `Апартамент (ID): ${doc.apartment || '-'}`,
              ``,
              `Съобщение:`,
              `${doc.message || '-'}`,
            ].join('\n'),
          })
        } catch (err) {
          req.payload.logger.error(`Inquiry notification email failed: ${err}`)
        }
      },
    ],
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
