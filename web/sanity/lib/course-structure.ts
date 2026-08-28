/**
 * Numeração de módulo/aula ("Module 5", "Lesson 5.1") deriva sempre da
 * posição no array `course.modules`, nunca de um campo armazenado (seção 8
 * do AGENTS.md). Funções puras, sem I/O — recebem o resultado já expandido
 * de uma query (ver `sanity/queries/lessons.ts`).
 */

type ModuleWithLessonIds = {
  title: string
  lessonIds?: (string | null | undefined)[] | null
}

export type LessonPosition = {
  moduleNumber: number
  moduleTitle: string
  lessonNumber: number
  /** Ex.: "Lesson 5.1" */
  label: string
}

export function findLessonPosition(
  modules: ModuleWithLessonIds[] | null | undefined,
  lessonId: string,
): LessonPosition | null {
  if (!modules) return null

  for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
    const lessonIds = modules[moduleIndex].lessonIds ?? []
    const lessonIndex = lessonIds.findIndex((id) => id === lessonId)

    if (lessonIndex !== -1) {
      const moduleNumber = moduleIndex + 1
      const lessonNumber = lessonIndex + 1
      return {
        moduleNumber,
        moduleTitle: modules[moduleIndex].title,
        lessonNumber,
        label: `Lesson ${moduleNumber}.${lessonNumber}`,
      }
    }
  }

  return null
}

/** Ex.: getModuleLabel(5) -> "Module 5" */
export function getModuleLabel(moduleNumber: number): string {
  return `Module ${moduleNumber}`
}
