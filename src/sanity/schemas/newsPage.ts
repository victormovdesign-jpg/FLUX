import { defineField, defineType } from 'sanity'

export const newsPage = defineType({
  name: 'newsPage',
  title: 'News page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 3 }),
  ],
})
