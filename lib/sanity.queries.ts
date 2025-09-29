// GROQ queries for Sanity CMS

export const qLawyers = `*[_type == "lawyer"] | order(orderRank asc, _createdAt asc) {
  _id,
  name,
  title,
  specialties,
  experience,
  education,
  achievements,
  image,
  description,
  email,
  phone,
  orderRank,
  slug
}`

export const qNews = `*[_type == "news"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  author,
  image,
  body,
  category,
  tags
}`

export const qCases = `*[_type == "case"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  caseType,
  outcome,
  client,
  image,
  body,
  tags,
  practiceArea->{
    _id,
    title,
    slug
  }
}`

export const qReviews = `*[_type == "review"] | order(_createdAt desc) {
  _id,
  clientName,
  rating,
  content,
  caseType,
  publishedAt,
  featured
}`

export const qPracticeAreas = `*[_type == "practiceArea"] | order(orderRank asc, _createdAt asc) {
  _id,
  title,
  slug,
  description,
  icon,
  image,
  orderRank,
  services,
  relatedCases[]->{
    _id,
    title,
    slug,
    excerpt
  }
}`