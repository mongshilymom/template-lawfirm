export const qLawyers = `
*[_type=="lawyer"] | order(order asc){
  _id, name, title, email, phone, specialties, education, career,
  "imageUrl": image.asset->url
}`;
export const qNews = `
*[_type=="news"] | order(publishedAt desc)[0...10]{
  _id, title, slug, publishedAt, excerpt
}`;
export const qCases = `
*[_type=="case"] | order(publishedAt desc)[0...20]{
  _id, title, summary, result, lawyers[]->name
}`;
