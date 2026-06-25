import type { MetadataRoute } from 'next'
import {
  getProjects,
  getApartments,
  getPosts,
  getServices,
} from '@/lib/data'

// Generated per-request so it never needs a DB connection at build time.
export const dynamic = 'force-dynamic'

const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, apartments, posts, services] = await Promise.all([
    getProjects(),
    getApartments(),
    getPosts(1000),
    getServices(),
  ])

  const staticPaths = [
    '',
    '/about',
    '/project',
    '/apartments',
    '/service',
    '/news',
    '/contact',
  ]

  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }))

  const push = (items: any[], prefix: string) => {
    for (const it of items) {
      if (!it?.slug) continue
      entries.push({
        url: `${base}${prefix}/${it.slug}`,
        lastModified: it.updatedAt ? new Date(it.updatedAt) : undefined,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  }

  push(projects, '/project-details')
  push(apartments, '/apartments')
  push(posts, '/news-details')
  push(services, '/service-details')

  return entries
}
