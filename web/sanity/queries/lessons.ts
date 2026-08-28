import { defineQuery } from 'next-sanity'

import { categoryFragment, imageFragment, instructorFragment, resourceFragment } from './fragments'

// Uma lesson não guarda o curso pai (seção 8 do AGENTS.md) — resolvido aqui
// por referência reversa. Nada no schema impede uma mesma lesson ser
// referenciada por mais de um módulo/curso (reaproveitamento de conteúdo),
// então resolver só pelo slug da lesson (`*[_type=="course" &&
// references(^._id)][0]`) poderia pegar o curso errado. Por isso a query
// exige também o slug do curso: a lesson só resolve se pertencer a um
// módulo desse curso específico, e a numeração ("Module X"/"Lesson X.Y",
// calculada por `findLessonPosition` em sanity/lib/course-structure.ts) fica
// sempre relativa ao curso pedido — o mesmo curso que a página de aula
// recebe na própria URL (`/courses/[courseSlug]/lessons/[lessonSlug]`,
// quando essa rota existir).
export const LESSON_BY_COURSE_AND_SLUG_QUERY = defineQuery(/* groq */ `
  *[
    _type == "lesson" &&
    slug.current == $lessonSlug &&
    _id in *[_type == "course" && slug.current == $courseSlug][0].modules[].lessons[]._ref
  ][0]{
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
    "course": *[_type == "course" && slug.current == $courseSlug][0]{
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
  }
`)

// Pares (courseSlug, lessonSlug) para gerar as rotas estáticas de aula —
// derivados do lado do curso (fonte da verdade da relação), nunca por
// referência reversa a partir da lesson, pela mesma razão acima.
export const COURSE_LESSON_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "course" && defined(slug.current)]{
    "courseSlug": slug.current,
    "lessonSlugs": modules[].lessons[]->slug.current
  }
`)
