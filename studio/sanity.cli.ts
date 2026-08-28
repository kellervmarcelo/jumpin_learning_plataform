/**
 * Configuração do CLI do Studio standalone (seção 5 do AGENTS.md).
 * Go to https://www.sanity.io/docs/cli to learn more.
 */
import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

if (!projectId) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID environment variable')
}

if (!dataset) {
  throw new Error('Missing SANITY_STUDIO_DATASET environment variable')
}

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: {
    // Auto-updates: motivo pelo qual o Studio é standalone (seção 5 do AGENTS.md).
    // https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
    autoUpdates: true,
  },
  typegen: {
    // O frontend fica em ../web — TypeGen escaneia as queries de lá e escreve
    // o resultado em web/sanity.types.ts (seção "Monorepo" da skill typegen).
    // Escopo restrito às pastas de código-fonte reais: um glob '../web/**'
    // sem essa restrição varre também ../web/node_modules (dezenas de
    // milhares de arquivos, minutos de execução).
    path: '../web/{app,components,lib,sanity}/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../web/sanity.types.ts',
  },
})
