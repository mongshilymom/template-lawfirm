import { createClient } from "@sanity/client";
export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2023-10-10",
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN, // (선택) 읽기 토큰
});
