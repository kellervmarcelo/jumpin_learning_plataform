import { FolderIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

// Módulo embutido em course.modules (seção 8 do AGENTS.md) — não é documento
// próprio. O número exibido na UI ("Module 5") vem da posição no array, nunca
// é armazenado aqui.
export const courseModule = defineType({
  name: 'module',
  title: 'Module',
  type: 'object',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'lesson' }] })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title', lessons: 'lessons' },
    prepare({ title, lessons }) {
      const count = Array.isArray(lessons) ? lessons.length : 0
      return {
        title,
        subtitle: `${count} ${count === 1 ? 'lesson' : 'lessons'}`,
      }
    },
  },
})
