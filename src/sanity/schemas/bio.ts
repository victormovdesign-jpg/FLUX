import { defineField, defineType } from 'sanity'

export const bio = defineType({
  name: 'bio',
  title: 'Bio / Staircase',
  type: 'document',
  fields: [
    defineField({ name: 'yearsLabel', title: 'Years label', type: 'string', description: 'e.g. "8+ years in industry"' }),
    defineField({ name: 'line1', title: 'Line 1', type: 'string' }),
    defineField({ name: 'line2', title: 'Line 2', type: 'string' }),
    defineField({ name: 'line3', title: 'Line 3', type: 'string' }),
    defineField({ name: 'line4', title: 'Line 4', type: 'string' }),
    defineField({ name: 'line5', title: 'Line 5', type: 'string' }),
  ],
})
