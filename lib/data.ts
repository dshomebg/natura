import { getPayloadClient } from './payload'

// Centralised server-side queries against Payload (Local API).
// depth: 1 populates upload/relationship fields (media URLs, linked docs).

export const getProjects = async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    depth: 1,
    sort: 'order',
    limit: 100,
  })
  return docs
}

export const getFeaturedProjects = async (limit = 6) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    depth: 1,
    sort: 'order',
    where: { featured: { equals: true } },
    limit,
  })
  return docs
}

export const getProjectBySlug = async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    depth: 1,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
}

export const getApartments = async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'apartments',
    depth: 1,
    sort: 'title',
    limit: 200,
  })
  return docs
}

export const getAvailableApartments = async (limit = 3) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'apartments',
    depth: 1,
    sort: 'price',
    where: { status: { equals: 'available' } },
    limit,
  })
  return docs
}

export const getApartmentBySlug = async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'apartments',
    depth: 1,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
}

export const getPosts = async (limit = 100) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    sort: '-publishedDate',
    limit,
  })
  return docs
}

export const getPostBySlug = async (slug: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    depth: 1,
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
}

export const getCategories = async (type?: 'blog' | 'project') => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    depth: 0,
    where: type ? { type: { equals: type } } : {},
    limit: 100,
  })
  return docs
}

export const getServices = async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    depth: 1,
    sort: 'order',
    limit: 100,
  })
  return docs
}

export const getTeam = async () => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'team',
    depth: 1,
    sort: 'order',
    limit: 100,
  })
  return docs
}

export const getTeamMemberById = async (id: string | number) => {
  const payload = await getPayloadClient()
  try {
    return await payload.findByID({ collection: 'team', id, depth: 1 })
  } catch {
    return null
  }
}

export const getSiteSettings = async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
}

export const getHeader = async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'header', depth: 1 })
}

export const getFooter = async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'footer', depth: 1 })
}

export const getHomePage = async () => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'home-page', depth: 1 })
}
