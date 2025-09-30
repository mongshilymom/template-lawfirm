import { createClient } from "@sanity/client";

// Safe default for build time when Sanity is not configured
const projectId = process.env.SANITY_PROJECT_ID || "unconfigured";
const dataset = process.env.SANITY_DATASET || "production";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2023-10-10",
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN, // (선택) 읽기 토큰
});
