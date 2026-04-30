import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: true })
  : null

export async function sanityFetch<T>(query: string, fallback: T): Promise<T> {
  if (!client) return fallback
  try {
    return (await client.fetch<T>(query)) ?? fallback
  } catch {
    return fallback
  }
}
