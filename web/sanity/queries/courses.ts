import { defineQuery } from 'next-sanity'

import { courseCardFragment, lessonSummaryFragment, outcomeFragment } from './fragments'

// Catálogo
export const COURSES_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)] | order(title asc) {
    ${courseCardFragment}
  }
`)

export const COURSE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]{ "slug": slug.current }
`)

// Curso completo, com módulos → aulas expandidas (a numeração de exibição é
// derivada da posição no array por `sanity/lib/course-structure.ts`, nunca
// armazenada — seção 8 do AGENTS.md).
export const COURSE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && slug.current == $slug][0]{
    ${courseCardFragment},
    "outcomes": outcomes[]{ ${outcomeFragment} },
    "modules": modules[]{
      _key,
      title,
      summary,
      "lessons": lessons[]->{ ${lessonSummaryFragment} }
    }
  }
`)
