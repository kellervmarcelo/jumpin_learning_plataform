import { defineQuery } from 'next-sanity'

import { categoryFragment, imageFragment, instructorFragment, resourceFragment } from './fragments'

// Uma lesson não guarda o curso pai (seção 8 do AGENTS.md) — resolvido aqui
// por referência reversa. `lessonIds` (as referências cruas de cada módulo,
// sem expandir) é o que `findLessonPosition` (sanity/lib/course-structure.ts)
// usa para calcular "Module X" / "Lesson X.Y" a partir da posição no array.
const parentCourseFragment = /* groq */ `
  "course": *[_type == "course" && references(^._id)][0]{
    _id,
    title,
    "slug": slug.current,
    "instructor": instructor->{ ${instructorFragment} },
    "category": category->{ ${categoryFragment} },
    "modules": modules[]{
      _key,
      title,
      "lessonIds": lessons[]._ref
    }
  }
`

export const LESSON_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    videoUrl,
    "posterImage": posterImage { ${imageFragment} },
    duration,
    freePreview,
    studentCount,
    notes,
    keyPoints,
    proTip,
    "resources": resources[]{ ${resourceFragment} },
    ${parentCourseFragment}
  }
`)

export const LESSON_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "lesson" && defined(slug.current)]{ "slug": slug.current }
`)
