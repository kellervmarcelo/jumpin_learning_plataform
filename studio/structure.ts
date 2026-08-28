import type { StructureResolver } from 'sanity/structure'

// Lista customizada agrupando os 4 tipos de documento da seção 8 do AGENTS.md
// (module é um objeto embutido em course, não aparece aqui).
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('course').title('Courses'),
      S.documentTypeListItem('lesson').title('Lessons'),
      S.documentTypeListItem('instructor').title('Instructors'),
      S.documentTypeListItem('category').title('Categories'),
    ])
