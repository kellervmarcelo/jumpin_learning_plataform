import { StarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

// Item do "what you'll learn" (seção 8 do AGENTS.md): ícone + título + descrição.
export const outcome = defineType({
  name: 'outcome',
  title: 'Outcome',
  type: 'object',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description:
        'Slug curto em kebab-case (ex.: "chart-bar", "rocket", "shield-check") que o frontend mapeia para um ícone Phosphor.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'icon' },
  },
})
