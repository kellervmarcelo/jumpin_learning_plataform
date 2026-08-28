import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const RESOURCE_TYPES = [
  { title: 'PDF', value: 'pdf' },
  { title: 'Video', value: 'video' },
  { title: 'Link', value: 'link' },
  { title: 'Code', value: 'code' },
  { title: 'Article', value: 'article' },
  { title: 'Download', value: 'download' },
  { title: 'Other', value: 'other' },
]

// Item de "resources" de uma lesson (seção 8 do AGENTS.md).
export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: RESOURCE_TYPES },
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
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) =>
        rule.required().uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' },
  },
})
