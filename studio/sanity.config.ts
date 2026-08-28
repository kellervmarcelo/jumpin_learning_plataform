import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

if (!projectId) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID environment variable')
}

if (!dataset) {
  throw new Error('Missing SANITY_STUDIO_DATASET environment variable')
}

export default defineConfig({
  name: 'jumpin',
  title: 'JumpIn',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure }),
    // Vision é para rodar queries GROQ dentro do Studio, útil para validar as
    // queries de web/sanity/queries antes de usá-las no frontend.
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
