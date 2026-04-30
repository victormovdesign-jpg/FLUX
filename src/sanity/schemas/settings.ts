import { defineField, defineType } from 'sanity'

export const settings = defineType({
  name: 'settings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'studioName', title: 'Studio name', type: 'string' }),
    defineField({ name: 'fullBleedPhoto', title: 'Full-bleed photo', type: 'image', options: { hotspot: true } }),
  ],
})
