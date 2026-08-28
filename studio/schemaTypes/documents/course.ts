import { DocumentTextIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

const LEVELS = [
  { title: 'Beginner', value: 'beginner' },
  { title: 'Intermediate', value: 'intermediate' },
  { title: 'Advanced', value: 'advanced' },
]

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'marketing', title: 'Marketing' },
    { name: 'curriculum', title: 'Curriculum' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'instructor' }],
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
      validation: (rule) => rule.required(),
    }),

    // Marketing
    defineField({
      name: 'coverImage',
      title: 'Cover image',
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
      group: 'marketing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: { list: LEVELS, layout: 'radio' },
      group: 'marketing',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      group: 'marketing',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'popular',
      title: 'Popular',
      type: 'boolean',
      initialValue: false,
      group: 'marketing',
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      initialValue: 0,
      group: 'marketing',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'outcomes',
      title: "What you'll learn",
      type: 'array',
      of: [defineArrayMember({ type: 'outcome' })],
      group: 'marketing',
      validation: (rule) => rule.required().min(1),
    }),

    // Curriculum
    defineField({
      name: 'modules',
      title: 'Modules',
      description:
        'Ordem define a numeração exibida (Module 1, Module 2, ...) — não é armazenada (seção 8 do AGENTS.md).',
      type: 'array',
      of: [defineArrayMember({ type: 'module' })],
      group: 'curriculum',
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      level: 'level',
      price: 'price',
      media: 'coverImage',
    },
    prepare({ title, level, price, media }) {
      return {
        title,
        subtitle: [level, price != null ? `$${price}` : undefined]
          .filter(Boolean)
          .join(' · '),
        media,
      }
    },
  },
})
