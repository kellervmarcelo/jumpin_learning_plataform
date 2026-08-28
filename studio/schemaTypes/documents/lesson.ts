import { PlayIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  icon: PlayIcon,
  // Uma lesson não guarda o curso pai (seção 8 do AGENTS.md) — o curso é
  // derivado no frontend por referência reversa a partir de course.modules.
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'notes', title: 'Notes' },
    { name: 'resources', title: 'Resources' },
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
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo ou Bunny — o provider é resolvido no player pela URL.',
      group: 'content',
      validation: (rule) => rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster image',
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
      group: 'content',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Texto de exibição, ex.: "12:45".',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'freePreview',
      title: 'Free preview',
      type: 'boolean',
      description: 'Rótulo de exibição — não controla acesso (seção 7 do AGENTS.md).',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'studentCount',
      title: 'Student count',
      type: 'number',
      initialValue: 0,
      validation: (rule) => rule.min(0),
      group: 'content',
    }),
    defineField({
      name: 'keyPoints',
      title: 'Key points',
      description: 'Itens da seção "In this lesson you will".',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      group: 'notes',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({ scheme: ['http', 'https'] }),
                  }),
                ],
              },
            ],
          },
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'proTip',
      title: 'Pro tip',
      type: 'text',
      rows: 3,
      group: 'notes',
    }),
    defineField({
      name: 'resources',
      title: 'Resources',
      type: 'array',
      of: [defineArrayMember({ type: 'resource' })],
      group: 'resources',
    }),
  ],
  preview: {
    select: { title: 'title', duration: 'duration', media: 'posterImage' },
    prepare({ title, duration, media }) {
      return { title, subtitle: duration, media }
    },
  },
})
