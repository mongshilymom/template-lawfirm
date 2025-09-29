import { createClient } from 'next-sanity'

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2023-05-03'
const token = process.env.SANITY_API_READ_TOKEN

if (!projectId) {
  throw new Error('Missing SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false for fresh data
  token, // Only needed for private datasets and when using preview mode
  perspective: 'published' // Use 'previewDrafts' to enable preview mode
})

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Always get the latest data for preview
  token,
  perspective: 'previewDrafts' // Enable draft content for preview
})