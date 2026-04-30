import { defineField, defineType } from 'sanity'

export const portfolioProject = defineType({
  name: 'portfolioProject',
  title: 'Portfolio project',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tallDesktop', title: 'Tall card on desktop', type: 'boolean' }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
})
