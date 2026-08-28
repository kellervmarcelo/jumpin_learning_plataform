import 'server-only'

import type { QueryParams } from 'next-sanity'

import { client } from './client'

type SanityFetchOptions<QueryString extends string> = {
  query: QueryString
  params?: QueryParams
  /** Segundos até revalidar (ignorado quando `tags` é passado). Padrão: 60. */
  revalidate?: number | false
  /** Tags de cache para revalidação por webhook (seção "Tag-Based Revalidation" da skill). */
  tags?: string[]
}

/**
 * Helper de fetch server-only (seção 5 do AGENTS.md). Sem `defineLive`/Visual
 * Editing de propósito: essas features exigem um `browserToken` no bundle do
 * cliente, o que a seção 12 do AGENTS.md proíbe.
 */
export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: SanityFetchOptions<QueryString>) {
  return client.fetch(query, params, {
    next: tags.length ? { tags } : { revalidate },
  })
}
