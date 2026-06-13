import type { Field, FieldHook } from 'payload'

// Bulgarian Cyrillic -> Latin (Streamlined System), for SEO-friendly URLs.
const translitMap: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z',
  и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p',
  р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch',
  ш: 'sh', щ: 'sht', ъ: 'a', ь: 'y', ю: 'yu', я: 'ya',
}

export const slugify = (input: string): string =>
  input
    .toLowerCase()
    .split('')
    .map((ch) => translitMap[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Auto-fill the slug from a source field when the slug is empty.
const formatSlugHook =
  (fallbackField: string): FieldHook =>
  ({ value, data }) => {
    if (typeof value === 'string' && value.length > 0) return slugify(value)
    const fallback = data?.[fallbackField]
    if (typeof fallback === 'string' && fallback.length > 0) return slugify(fallback)
    return value
  }

// Reusable slug field tied to a source field (default: "title").
export const slugField = (source = 'title'): Field => ({
  name: 'slug',
  label: 'URL (slug)',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Оставете празно за автоматично генериране от заглавието.',
  },
  hooks: {
    beforeValidate: [formatSlugHook(source)],
  },
})
