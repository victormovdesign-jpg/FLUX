export const heroQuery = `*[_type == "hero"][0]{
  "heroImageUrl": heroImage.asset->url,
  name,
  description
}`

export const bioQuery = `*[_type == "bio"][0]{
  yearsLabel,
  line1, line2, line3, line4, line5
}`

export const aboutQuery = `*[_type == "about"][0]{
  "portraitUrl": portrait.asset->url,
  body
}`

export const settingsQuery = `*[_type == "settings"][0]{
  studioName,
  "fullBleedPhotoUrl": fullBleedPhoto.asset->url
}`

export const servicesQuery = `*[_type == "service"] | order(order asc){
  _id,
  num,
  title,
  description,
  "imageUrl": image.asset->url
}`

export const portfolioProjectsQuery = `*[_type == "portfolioProject"] | order(order asc){
  _id,
  name,
  tags,
  "imageUrl": image.asset->url,
  tallDesktop
}`

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  _id,
  "logoUrl": logo.asset->url,
  logoH,
  quote,
  clientName
}`

export const newsItemsQuery = `*[_type == "newsItem"] | order(order asc){
  _id,
  "imageUrl": image.asset->url,
  summary
}`
