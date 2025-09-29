import { client } from './sanity.client'
import { unstable_cache } from 'next/cache'

/**
 * Cached fetch function for Sanity queries with revalidation tags
 * @param query - GROQ query string
 * @param params - Query parameters
 * @param tags - Cache tags for revalidation
 * @param revalidate - Revalidation interval in seconds (default: 3600 = 1 hour)
 */
export async function sanityFetch<T = any>(
  query: string,
  params: Record<string, any> = {},
  tags: string[] = [],
  revalidate: number = 3600
): Promise<T> {
  return unstable_cache(
    async () => {
      return await client.fetch<T>(query, params)
    },
    [query, JSON.stringify(params)],
    {
      tags,
      revalidate
    }
  )()
}