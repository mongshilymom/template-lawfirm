import { sanityClient } from "./sanity.client";

/** Sanity fetch 래퍼 (ENV 미설정 시 안전한 빈 값 반환) */
export async function sanityFetch<T>(query: string, params: Record<string, any> = {}) {
  if (!process.env.SANITY_PROJECT_ID) return [] as unknown as T;
  return sanityClient.fetch<T>(query, params);
}
