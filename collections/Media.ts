import type { CollectionConfig } from 'payload'

// Uploaded images/files. Publicly readable so the frontend can render them.
export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Медия',
    plural: 'Медия',
  },
  access: {
    read: () => true,
  },
  upload: {
    // Generated responsive sizes used across the site.
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 1024, position: 'centre' },
      { name: 'feature', width: 1600, height: 900, position: 'centre' },
    ],
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      label: 'Алт текст',
      type: 'text',
    },
  ],
}
