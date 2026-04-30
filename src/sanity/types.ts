export interface SanityHero {
  heroImageUrl?: string | null
  name?: string | null
  description?: string | null
}

export interface SanityBio {
  yearsLabel?: string | null
  line1?: string | null
  line2?: string | null
  line3?: string | null
  line4?: string | null
  line5?: string | null
}

export interface SanityAbout {
  portraitUrl?: string | null
  body?: string | null
}

export interface SanitySettings {
  studioName?: string | null
  fullBleedPhotoUrl?: string | null
}

export interface SanityService {
  _id: string
  num?: string | null
  title?: string | null
  description?: string | null
  imageUrl?: string | null
}

export interface SanityPortfolioProject {
  _id: string
  name?: string | null
  client?: string | null
  year?: number | null
  tags?: string[] | null
  imageUrl?: string | null
  tallDesktop?: boolean | null
  description?: string | null
}

export interface SanityTestimonial {
  _id: string
  logoUrl?: string | null
  logoH?: number | null
  quote?: string | null
  clientName?: string | null
}

export interface SanityNewsItem {
  _id: string
  title?: string | null
  date?: string | null
  imageUrl?: string | null
  summary?: string | null
  externalUrl?: string | null
}

export interface SanityContactSocialLink {
  platform?: string | null
  url?: string | null
}

export interface SanityAboutPage {
  headline?: string | null
  intro?: string | null
  disciplines?: string[] | null
}

export interface SanityServicesPage {
  headline?: string | null
  intro?: string | null
}

export interface SanityProjectsPage {
  headline?: string | null
  intro?: string | null
}

export interface SanityNewsPage {
  headline?: string | null
  intro?: string | null
}

export interface SanityContactPage {
  headline?: string | null
  intro?: string | null
  email?: string | null
  phone?: string | null
  address?: string | null
  formActionUrl?: string | null
  socialLinks?: SanityContactSocialLink[] | null
}
