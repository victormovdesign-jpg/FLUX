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
  tags?: string[] | null
  imageUrl?: string | null
  tallDesktop?: boolean | null
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
  imageUrl?: string | null
  summary?: string | null
}
