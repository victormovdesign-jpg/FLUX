import { defineField, defineType } from 'sanity'

export const newsItem = defineType({
  name: 'newsItem',
  title: 'News item',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3 }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
})
