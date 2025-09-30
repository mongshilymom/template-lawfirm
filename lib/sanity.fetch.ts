import { sanityClient } from "./sanity.client";

/** Sanity fetch 래퍼 (ENV 미설정 시 안전한 빈 값 반환, tag 기반 revalidate 지원) */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, any> = {},
  options?: { tags?: string[] }
): Promise<T> {
  // Return empty array if Sanity is not configured (build time or dev without setup)
  if (!process.env.SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID === "unconfigured" || process.env.SANITY_PROJECT_ID === "placeholder-id") {
    return [] as unknown as T;
  }

  try {
    const data = await sanityClient.fetch<T>(query, params);
    return data;
  } catch (error) {
    // Gracefully handle errors during build or when Sanity is not properly configured
    console.warn("Sanity fetch error (returning empty array):", error);
    return [] as unknown as T;
  }
}
