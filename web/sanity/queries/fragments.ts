// Fragmentos GROQ reutilizáveis para manter as projeções consistentes entre queries.

export const imageFragment = /* groq */ `
  asset->{ _id, url, metadata { lqip, dimensions } },
  hotspot,
  alt
`

export const categoryFragment = /* groq */ `
  _id,
  title,
  "slug": slug.current
`

export const instructorFragment = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  "photo": photo { ${imageFragment} },
  expertise
`

export const outcomeFragment = /* groq */ `
  _key,
  icon,
  title,
  description
`

export const resourceFragment = /* groq */ `
  _key,
  type,
  title,
  description,
  url
`

export const lessonSummaryFragment = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  duration,
  freePreview,
  studentCount,
  "posterImage": posterImage { ${imageFragment} }
`

export const courseCardFragment = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  summary,
  "coverImage": coverImage { ${imageFragment} },
  level,
  price,
  popular,
  studentCount,
  "category": category->{ ${categoryFragment} },
  "instructor": instructor->{ ${instructorFragment} },
  "moduleCount": count(modules),
  "lessonCount": count(modules[].lessons)
`
