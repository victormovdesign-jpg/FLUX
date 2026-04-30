/**
 * Seed script — creates placeholder documents in Sanity for all schemas.
 *
 * Usage:
 *   SANITY_TOKEN=<your-write-token> node scripts/seed-sanity.mjs
 *
 * Get a token at: https://www.sanity.io/manage → project → API → Tokens
 * Permission level: "Editor" or higher.
 *
 * Run once. Re-running is safe — existing documents are skipped by _id.
 */

import { createClient } from '@sanity/client'

const PROJECT_ID = 't2nhvh5t'
const DATASET    = 'production'
const TOKEN      = process.env.SANITY_TOKEN

if (!TOKEN) {
  console.error('❌  SANITY_TOKEN env var is required.')
  console.error('    Get one at https://www.sanity.io/manage → API → Tokens')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: '2024-01-01',
  token:     TOKEN,
  useCdn:    false,
})

// ─── Documents ────────────────────────────────────────────────────────────────

const docs = [

  // ── Settings (singleton) ───────────────────────────────────────────────────
  {
    _id:   'settings-singleton',
    _type: 'settings',
    studioName: 'H.Studio',
    // fullBleedPhoto: add via Studio
  },

  // ── Hero (singleton) ───────────────────────────────────────────────────────
  {
    _id:   'hero-singleton',
    _type: 'hero',
    name: 'Harvey   Specter',
    description: null,
    // heroImage: add via Studio
  },

  // ── Bio (singleton) ────────────────────────────────────────────────────────
  {
    _id:   'bio-singleton',
    _type: 'bio',
    yearsLabel: '8+ years in industry',
    line1: 'A creative director   /',
    line2: 'Photographer',
    line3: 'Born & raised',
    line4: 'On the south side',
    line5: 'Of chicago.',
  },

  // ── About (singleton) ──────────────────────────────────────────────────────
  {
    _id:   'about-singleton',
    _type: 'about',
    body: 'Paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here.\n\nParagraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.',
    // portrait: add via Studio
  },

  // ── Services ───────────────────────────────────────────────────────────────
  {
    _id:   'service-1',
    _type: 'service',
    order: 1,
    num:   '[ 1 ]',
    title: 'Brand Discovery',
    description: 'We help brands find their voice — from positioning and naming through to visual identity systems that hold up at every touchpoint.',
    // image: add via Studio
  },
  {
    _id:   'service-2',
    _type: 'service',
    order: 2,
    num:   '[ 2 ]',
    title: 'Web Design & Dev',
    description: 'Full-cycle web design and engineering: strategy, wireframes, visual design, and production-ready code built on modern stacks.',
    // image: add via Studio
  },
  {
    _id:   'service-3',
    _type: 'service',
    order: 3,
    num:   '[ 3 ]',
    title: 'Marketing',
    description: 'Content strategy, campaign design, and social assets crafted to convert — from single launches to ongoing brand campaigns.',
    // image: add via Studio
  },
  {
    _id:   'service-4',
    _type: 'service',
    order: 4,
    num:   '[ 4 ]',
    title: 'Photography',
    description: 'Art-directed photography for brands, products, and editorial — delivered print-ready and optimised for digital.',
    // image: add via Studio
  },

  // ── Portfolio Projects ──────────────────────────────────────────────────────
  {
    _id:   'project-1',
    _type: 'portfolioProject',
    order:       1,
    name:        'Surfers Paradise',
    client:      'Blue Wave Co.',
    year:        2024,
    tags:        ['Brand Identity', 'Photography'],
    tallDesktop: true,
    description: 'A full brand overhaul for a surf lifestyle brand — new identity, packaging, and a series of editorial photographs shot on location.',
    // image: add via Studio
  },
  {
    _id:   'project-2',
    _type: 'portfolioProject',
    order:       2,
    name:        'Cyberpunk Caffe',
    client:      'Neon Grounds',
    year:        2023,
    tags:        ['Web Design', 'Photography'],
    tallDesktop: false,
    description: 'An immersive web experience for a boutique café chain with a cyberpunk aesthetic — neon type, grain textures, and custom 3D assets.',
    // image: add via Studio
  },
  {
    _id:   'project-3',
    _type: 'portfolioProject',
    order:       3,
    name:        'Agency 976',
    client:      'Agency 976',
    year:        2023,
    tags:        ['Brand Identity', 'Web Design'],
    tallDesktop: false,
    description: 'Identity and website for a boutique creative agency — minimal, typographic, and built to feel as premium as their client roster.',
    // image: add via Studio
  },
  {
    _id:   'project-4',
    _type: 'portfolioProject',
    order:       4,
    name:        'Minimal Playground',
    client:      'Self-initiated',
    year:        2024,
    tags:        ['Art Direction', 'Photography'],
    tallDesktop: true,
    description: 'A personal project exploring minimalism in product photography — white volumes, long shadows, and unconventional framing.',
    // image: add via Studio
  },

  // ── Testimonials ───────────────────────────────────────────────────────────
  {
    _id:   'testimonial-1',
    _type: 'testimonial',
    order:      1,
    logoH:      19,
    quote:      'A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.',
    clientName: 'Marko Stojković',
    // logo: add via Studio
  },
  {
    _id:   'testimonial-2',
    _type: 'testimonial',
    order:      2,
    logoH:      19,
    quote:      'Professional, precise, and incredibly fast at handling complex product visualizations and templates.',
    clientName: 'Lukas Weber',
    // logo: add via Studio
  },
  {
    _id:   'testimonial-3',
    _type: 'testimonial',
    order:      3,
    logoH:      31,
    quote:      'A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don\'t just make things look good; they solve business problems through visual clarity.',
    clientName: 'Sarah Jenkins',
    // logo: add via Studio
  },
  {
    _id:   'testimonial-4',
    _type: 'testimonial',
    order:      4,
    logoH:      36,
    quote:      'An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.',
    clientName: 'Sofia Martínez',
    // logo: add via Studio
  },

  // ── News Items ─────────────────────────────────────────────────────────────
  {
    _id:   'news-1',
    _type: 'newsItem',
    order:   1,
    title:   'H.Studio wins Red Dot Award',
    date:    '2024-03-15',
    summary: 'Our rebrand work for Blue Wave Co. has been recognised with a Red Dot Award for Communication Design — one of the most prestigious design honours in the world.',
    externalUrl: null,
    // image: add via Studio
  },
  {
    _id:   'news-2',
    _type: 'newsItem',
    order:   2,
    title:   'New case study: Cyberpunk Caffe',
    date:    '2024-02-01',
    summary: 'We\'ve published a full behind-the-scenes look at the Neon Grounds project — from initial concept sketches through to the final interactive site.',
    externalUrl: null,
    // image: add via Studio
  },
  {
    _id:   'news-3',
    _type: 'newsItem',
    order:   3,
    title:   'Speaking at Design Matters 2024',
    date:    '2024-01-10',
    summary: 'H.Studio founder Harvey Specter joins the Design Matters conference panel to talk about the intersection of brand storytelling and engineering.',
    externalUrl: null,
    // image: add via Studio
  },

  // ── About Page (singleton) ─────────────────────────────────────────────────
  {
    _id:   'about-page-singleton',
    _type: 'aboutPage',
    headline:    'About me',
    intro:       'I\'m Harvey Specter — a creative director and photographer based in Chicago with over 8 years of experience working with brands that want to leave a mark.\n\nMy work sits at the intersection of strategy and aesthetics. I believe good design doesn\'t just look beautiful — it communicates clearly and moves people to act.',
    disciplines: ['Brand Discovery', 'Web Design & Dev', 'Art Direction', 'Photography'],
  },

  // ── Services Page (singleton) ──────────────────────────────────────────────
  {
    _id:   'services-page-singleton',
    _type: 'servicesPage',
    headline: 'What we do',
    intro:    'We offer a focused set of creative services — no bloat, no hand-offs to juniors. Every project is handled directly by our senior team.',
  },

  // ── Projects Page (singleton) ──────────────────────────────────────────────
  {
    _id:   'projects-page-singleton',
    _type: 'projectsPage',
    headline: 'Selected Work',
    intro:    'A curated selection of recent brand, web, and photography projects.',
  },

  // ── News Page (singleton) ──────────────────────────────────────────────────
  {
    _id:   'news-page-singleton',
    _type: 'newsPage',
    headline: 'Latest News',
    intro:    'Awards, case studies, and studio updates.',
  },

  // ── Contact Page (singleton) ───────────────────────────────────────────────
  {
    _id:   'contact-page-singleton',
    _type: 'contactPage',
    headline:      'Let\'s work together',
    intro:         'Ready to start a project? Drop us a message and we\'ll get back to you within one business day.',
    email:         'hello@h.studio',
    phone:         '+1 (312) 555-0100',
    address:       '123 West Wacker Drive\nChicago, IL 60601',
    formActionUrl: null,   // fill in when you have a Formspark URL
    socialLinks: [
      { platform: 'Instagram', url: null },
      { platform: 'X.com',     url: null },
      { platform: 'LinkedIn',  url: null },
    ],
  },
]

// ─── Upsert (createIfNotExists) ───────────────────────────────────────────────

async function seed() {
  console.log(`Seeding ${docs.length} documents into ${PROJECT_ID}/${DATASET}…\n`)
  const tx = client.transaction()
  for (const doc of docs) {
    tx.createIfNotExists(doc)
  }
  const result = await tx.commit()
  console.log(`✅  Done — ${result.results.length} operations committed.`)
  console.log('\nNext steps:')
  console.log('  • Open the Sanity Studio at /studio to add images')
  console.log('  • Set formActionUrl on the Contact page once you have a Formspark URL')
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err.message)
  process.exit(1)
})
