import { defineField, defineType } from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
  ],
})
