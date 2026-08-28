import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const instructor = defineType({
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'expertise', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: Array.isArray(subtitle) ? subtitle.join(', ') : undefined,
        media,
      }
    },
  },
})
