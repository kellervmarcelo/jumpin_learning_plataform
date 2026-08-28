import 'server-only'

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

/**
 * Cliente de leitura server-only (seção 5/12 do AGENTS.md). O dataset é
 * privado, então o token nunca pode chegar ao navegador — o import de
 * "server-only" quebra o build caso este módulo seja puxado por um Client
 * Component.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
})
