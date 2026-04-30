import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Order', type: 'number' }),
    defineField({ name: 'logo', title: 'Client logo', type: 'image' }),
    defineField({ name: 'logoH', title: 'Logo height (px)', type: 'number' }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
    defineField({ name: 'clientName', title: 'Client name', type: 'string' }),
  ],
  orderings: [{ title: 'Manual order', name: 'manualOrder', by: [{ field: 'order', direction: 'asc' }] }],
})
