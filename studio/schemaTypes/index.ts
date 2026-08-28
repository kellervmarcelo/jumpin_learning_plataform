import { category } from './documents/category'
import { course } from './documents/course'
import { instructor } from './documents/instructor'
import { lesson } from './documents/lesson'
import { courseModule } from './objects/module'
import { outcome } from './objects/outcome'
import { resource } from './objects/resource'

export const schemaTypes = [
  // Objects (precisam ser registrados antes dos documentos que os usam)
  outcome,
  resource,
  courseModule,

  // Documents
  category,
  instructor,
  lesson,
  course,
]
