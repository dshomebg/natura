import { getPayload } from 'payload'
import config from '@payload-config'

// Single cached Payload instance for server-side data access (Local API).
let cached: ReturnType<typeof getPayload> | null = null

export const getPayloadClient = () => {
  if (!cached) cached = getPayload({ config })
  return cached
}
