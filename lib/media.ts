// Helpers for working with Payload media (upload) fields on the frontend.

type SizeName = 'thumbnail' | 'card' | 'feature'

type MediaLike =
  | {
      url?: string | null
      alt?: string | null
      width?: number | null
      height?: number | null
      sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }>
    }
  | string
  | number
  | null
  | undefined

const FALLBACK = '/assets/img/project/06.jpg'

// Resolve a media field to a usable image URL, optionally a named size.
export const mediaUrl = (media: MediaLike, size?: SizeName): string => {
  if (!media || typeof media === 'string' || typeof media === 'number') return FALLBACK
  if (size && media.sizes?.[size]?.url) return media.sizes[size]!.url as string
  return media.url || FALLBACK
}

export const mediaAlt = (media: MediaLike, fallback = ''): string => {
  if (!media || typeof media === 'string' || typeof media === 'number') return fallback
  return media.alt || fallback
}
