# Implementação: content model do Sanity, Studio standalone e data layer server-side

## Objetivo

Duas coisas, na ordem:

1. **Migrar o Studio embutido para dois workspaces standalone** (`studio/` e `web/`), como o AGENTS.md exige (seções 5 e 6) e o próprio scaffold atual contraria (Studio hoje é montado em `app/studio/[[...tool]]/page.tsx`, com `sanity.config.ts` `'use client'` na raiz). O schema ainda está vazio, então é o momento mais barato para corrigir isso.
2. **Modelar o content model da seção 8** — `course`, `module` (objeto embutido), `lesson`, `instructor`, `category` — no novo `studio/`, e construir a **data layer server-only** em `web/sanity/` (cliente de leitura, helper de fetch, queries GROQ) que as páginas vão consumir depois.

Fora de escopo (não entra aqui): `video`, o documento de contexto do agente, `progress`, TypeGen automático em CI, Visual Editing/Presentation Tool/Draft Mode, e qualquer página (`catalog`, `course`, `lesson`, `instructor`) — só o schema e a leitura de dados.

## Skills e docs lidos

- `sanity-best-practices` → `references/schema.md` (sintaxe `defineType`/`defineField`/`defineArrayMember`, ícones por subpath, referência vs. objeto embutido, "não crie `_id` determinístico").
- `sanity-best-practices` → `references/project-structure.md` (layout `studio/` + `web/`, convenção kebab-case, `schemaTypes/{documents,objects}`).
- `sanity-best-practices` → `references/nextjs.md` (Opção A "Standalone Studio" é a recomendada; passos de migração de um Studio embutido; `useCdn`/token; padrão manual de `sanityFetch` quando não se usa `defineLive`).
- `sanity-best-practices` → `references/typegen.md` (config de TypeGen em `sanity.cli.ts` para monorepo, `path`/`generates` apontando `../web`, padrão de fragmentos reutilizáveis).
- `AGENTS.md` (raiz) — seções 5 (fronteiras web/studio, "nunca embutir o Studio"), 6 (stack), 7 (decisões já tomadas: Clerk, progresso, etc. — não mexidas aqui), 8 (forma exata dos dados), 12 (dataset privado + token só no servidor, `.env.example` como lista canônica), 13 (checks).

## Código e config inspecionados

- `sanity.config.ts`, `sanity.cli.ts`, `sanity/env.ts`, `sanity/lib/{client,image,live}.ts`, `sanity/structure.ts`, `sanity/schemaTypes/index.ts` (raiz) — confirmam o scaffold padrão `create-sanity` embutido, schema vazio (`types: []`), `defineLive` sem token (dataset público hoje).
- `app/studio/[[...tool]]/page.tsx` — rota catch-all que monta `<NextStudio config={config} />`; será removida.
- `package.json`, `.env.local`, `next.config.ts`, `proxy.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs` (raiz) — único workspace hoje; `proxy.ts` confirma que **esta versão do Next.js renomeou `middleware.ts` → `proxy.ts`** (`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`), então a migração preserva esse nome de arquivo, não recria `middleware.ts`.
- `app/`, `components/ui/*`, `lib/cn.ts`, `design/`, `public/` — árvore completa do app Next.js atual (Clerk sign-in/up, style-guide, design system) que precisa mover para `web/` sem alterar conteúdo.
- `components/ui/{CourseCard,LessonCard,ResourceCard,types}.tsx` — confirmam a forma de dados que a UI já espera (`level`, `duration` como string tipo "18h 24m"/"12:45", `modulesLabel`, resource com `meta` tipo "PDF • 1.2 MB", ícones do design system vindos de `@phosphor-icons/react/dist/ssr`). Uso isso só para nomear campos do schema de forma consistente — nenhuma página é tocada.
- `agent/skills/create-agent-with-sanity-context/references/ecommerce/{studio,app}` — exemplo de referência oficial do padrão exato `studio/` + `web/` (package.json de cada workspace, `sanity.cli.ts` com typegen apontando `../web`, `queries/fragments.ts` com fragmentos GROQ reutilizáveis interpolados em `defineQuery`). Sigo essa convenção de pastas e de fragmentos.
- Versões já instaladas (`node_modules`): `sanity@5.31.2`, `@sanity/vision@5.31.2`, `@sanity/icons@3.8.0`, `styled-components@6.5.3`, `next-sanity@13.3.3`, `server-only` (transitivo) — uso essas versões nos novos `package.json` em vez de adivinhar.

## Decisões e suposições

1. **Sem `npm`/`pnpm` workspaces**: cada workspace (`studio/`, `web/`) tem seu próprio `package.json`, `node_modules` e lockfile — igual ao exemplo de referência e ao que a skill recomenda ("no workspace tooling is required"). O `package.json`/`package-lock.json` da raiz são removidos; a raiz fica só com AGENTS.md, prompts/, design/, agent/, skills e o `.gitignore`.
2. **Sem `defineLive`/Visual Editing/Draft Mode**: o AGENTS.md (seção 5/12) descreve a leitura como "um cliente Sanity e um fetch helper só de servidor" — não pede preview ao vivo. `defineLive` com `browserToken` colocaria um token no bundle do navegador, o que a seção 12 proíbe explicitamente. Implemento só `client.ts` (server-only, com token) + `fetch.ts` (helper com `revalidate`/`tags`, sem `defineLive`). Visual Editing fica para uma tarefa futura, se pedida.
3. **Dataset privado e token de leitura — passo manual fora desta implementação**: hoje o dataset (`production`) foi criado pelo scaffold padrão, provavelmente público. Tornar um dataset privado e gerar um token exige `sanity login` interativo e acesso ao Sanity Manage, que não tenho nesta sessão. Implemento o `client.ts` já lendo `SANITY_API_READ_TOKEN` do ambiente (funciona hoje mesmo com dataset público e token vazio) e deixo como item em "Precisa da sua atenção" o comando exato para o usuário rodar depois.
4. **`web/` não ganha `sanity`/`@sanity/vision`**: essas dependências saem do `web/package.json` (só o Studio precisa) e entram no `studio/package.json`. `web/` mantém `next-sanity` (cliente de leitura) e `@sanity/image-url`. `styled-components` sai de `web/` (só existia por causa do Studio embutido) e vai para `studio/`.
5. **`icon` do outcome é string livre, não uma lista fechada**: a seção "what you'll learn" (`outcomes[]`) ainda não tem página nem mapeamento de ícone→componente definidos (isso é trabalho de UI futuro). Travar agora uma lista fechada de nomes de ícone seria adivinhar. Uso `type: 'string'` com `description` orientando o editor a usar um slug curto em kebab-case (ex.: `chart-bar`, `rocket`, `shield-check`) que o frontend mapeia para um ícone Phosphor quando a seção for construída. Fica documentado como uma decisão reversível e de baixo risco.
6. **`resource.type` já é lista fechada**: ao contrário do ícone acima, o tipo de recurso é um conjunto pequeno e conhecido (`pdf`, `video`, `link`, `code`, `article`, `download`, `other`) que direciona ícone/rótulo no `ResourceCard` — uso `options.list` (dropdown), seguindo o padrão "lista em vez de boolean" da skill de schema.
7. **`lesson.duration` e `course.price`/`studentCount` como valores simples de exibição**: `duration` é `string` livre (ex.: `"12:45"`) só para exibição — o cálculo de segundos para o player/timestamps vive no documento `video` (fora de escopo aqui, seção 9). `price` e os `studentCount` são `number`.
8. **Sem `_id` determinístico em nenhum documento**: todos os quatro tipos usam IDs gerados pelo Sanity (regra global da skill de schema). Relação lesson→course é resolvida por referência reversa em GROQ, exatamente como a seção 8 pede ("A lesson não guarda o curso pai").
9. **Sem checagem de unicidade de slug no schema**: o `slug` de cada tipo usa só `options.source` + `validation: required()`. Adicionar uma validação assíncrona de unicidade não foi pedido e o AGENTS.md pede para não superconstruir (seção 1); fica para quando houver conteúdo real e um caso de colisão.
10. **`web/sanity.types.ts` é gerado e commitado** (Opção A da skill de TypeGen — "types disponíveis logo após `git pull`, sem esperar CI"). Gero o arquivo rodando o script de typegen do `studio/` como parte dos checks desta tarefa, depois de existirem schema + queries.
11. **`web/tsconfig.json`, `eslint.config.mjs`, `next.config.ts`, `postcss.config.mjs`, `proxy.ts` movem sem mudança de conteúdo** (só de caminho), exceto a lista `exclude` do `tsconfig.json`: remove `agent`, `.agents`, `.claude` (eram relativos à raiz; depois da mudança de pasta essas entradas não apontam para nada e ficam mortas).
12. **Studio sem auto-atualização desligada**: `sanity.cli.ts` do `studio/` liga `deployment.autoUpdates: true` — é justamente um dos motivos do AGENTS.md para exigir Studio standalone (seção 5).

## Arquivos que vou tocar

### Removidos da raiz (movidos ou substituídos)
`app/studio/`, `sanity/`, `sanity.config.ts`, `sanity.cli.ts`, `app/` (exceto `app/studio/`, que é apagado), `components/`, `lib/cn.ts`, `public/*`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, `proxy.ts`, `package.json`, `package-lock.json`, `.env.local`, `next-env.d.ts`, `tsconfig.tsbuildinfo`.

### Novos em `studio/`
- `studio/package.json`, `studio/sanity.config.ts`, `studio/sanity.cli.ts` (com bloco `typegen` apontando para `../web`), `studio/tsconfig.json`, `studio/eslint.config.mjs`, `studio/.gitignore`, `studio/.env.example`, `studio/.env.local` (valores reais copiados do `.env.local` atual), `studio/static/.gitkeep`.
- `studio/structure.ts` — lista customizada agrupando Courses, Lessons, Instructors, Categories.
- `studio/schemaTypes/index.ts`, `studio/schemaTypes/documents/{course,lesson,instructor,category}.ts`, `studio/schemaTypes/objects/{module,outcome,resource}.ts`.

### Novos/movidos em `web/`
- `web/app/**`, `web/components/**`, `web/lib/cn.ts`, `web/public/**` (conteúdo idêntico, só de caminho).
- `web/next.config.ts`, `web/postcss.config.mjs`, `web/eslint.config.mjs`, `web/tsconfig.json` (exclude limpo), `web/proxy.ts`, `web/package.json` (dependências ajustadas — ver decisão 4), `web/.env.example`, `web/.env.local` (valores reais copiados).
- `web/sanity/env.ts`, `web/sanity/lib/client.ts`, `web/sanity/lib/fetch.ts`, `web/sanity/lib/image.ts`, `web/sanity/lib/course-structure.ts`.
- `web/sanity/queries/fragments.ts`, `web/sanity/queries/courses.ts`, `web/sanity/queries/lessons.ts`, `web/sanity/queries/instructors.ts`, `web/sanity/queries/categories.ts`.
- `web/sanity.types.ts` (gerado pelo `typegen`, não escrito à mão).

### Raiz
- `.gitignore` reescrito para os dois workspaces (padrões `**/node_modules`, `**/.next/`, `studio/dist/`, `studio/.sanity/`, `studio/schema.json`, `**/*.tsbuildinfo`, `**/next-env.d.ts`, `**/.env*` com exceção de `**/.env.example`).
- `README.md` — instruções de dev atualizadas para dois terminais (`cd studio && npm run dev`, `cd web && npm run dev`).

## Content model (`studio/schemaTypes`)

**`course`** (documento): `title` (string, obrigatório), `slug` (obrigatório), `summary` (text), `coverImage` (image + hotspot + `alt` obrigatório), `level` (string, lista `beginner|intermediate|advanced`, radio), `price` (number), `popular` (boolean, `initialValue: false`), `studentCount` (number, `initialValue: 0`), `outcomes` (array de `outcome`, mín. 1), `instructor` (reference→instructor, obrigatório), `category` (reference→category, obrigatório), `modules` (array de `module`, mín. 1).

**`module`** (objeto, dentro de `course.modules`): `title` (string, obrigatório), `summary` (text), `lessons` (array de reference→lesson, mín. 1). Número do módulo/aula vem da posição no array, nunca é campo armazenado (seção 8).

**`lesson`** (documento): `title`, `slug` (obrigatórios), `videoUrl` (url, https, obrigatório), `posterImage` (image + hotspot + `alt`), `duration` (string, ex. `"12:45"`), `freePreview` (boolean, `initialValue: false`), `studentCount` (number), `notes` (Portable Text: parágrafo, negrito/itálico, link, listas — sem heading, é conteúdo de aula não um artigo), `keyPoints` (array de string, mín. 1), `proTip` (text, opcional), `resources` (array de `resource`, opcional). Sem campo de curso pai.

**`instructor`** (documento): `name`, `slug` (obrigatórios), `photo` (image + hotspot + `alt`), `expertise` (array de string, tags, mín. 1), `bio` (text, obrigatório).

**`category`** (documento): `title`, `slug` (obrigatórios), `description` (text).

**`outcome`** (objeto, em `course.outcomes`): `icon` (string livre, ver decisão 5), `title`, `description` (obrigatórios).

**`resource`** (objeto, em `lesson.resources`): `type` (string, lista `pdf|video|link|code|article|download|other`), `title` (obrigatório), `description` (text), `url` (url, obrigatório).

Todos os documentos e objetos: `defineType`/`defineField`/`defineArrayMember`, ícone do `@sanity/icons` por subpath, `preview` configurado (título + subtítulo + mídia quando fizer sentido).

## Data layer (`web/sanity`)

- `env.ts` — mesmo conteúdo de hoje (asserts de `NEXT_PUBLIC_SANITY_PROJECT_ID`/`DATASET`/`API_VERSION`).
- `lib/client.ts` — `import 'server-only'`; `createClient` com `useCdn: true` e `token: process.env.SANITY_API_READ_TOKEN`. Nunca importado por um componente cliente.
- `lib/fetch.ts` — `sanityFetch({ query, params, revalidate = 60, tags = [] })`, `import 'server-only'`, delega para `client.fetch` com `next: { revalidate | tags }` (padrão de cache manual da skill, seção "Manual sanityFetch Helper").
- `lib/image.ts` — mesmo `urlFor` de hoje, caminho ajustado.
- `lib/course-structure.ts` — `findLessonPosition(modules, lessonId)` e `getModuleLabel(moduleNumber)`, funções puras que calculam `"Module 5"` / `"Lesson 5.1"` a partir da posição no array retornado pela query (nenhuma UI, nenhum I/O) — operacionaliza a regra "derivado da ordem, nunca armazenado" da seção 8 para quem for construir a página de aula depois.
- `queries/fragments.ts` — `imageFragment`, `categoryFragment`, `instructorFragment`, `courseCardFragment`, `outcomeFragment`, `lessonSummaryFragment`, `resourceFragment`.
- `queries/courses.ts` — `COURSES_QUERY` (catálogo), `COURSE_SLUGS_QUERY` (`generateStaticParams`), `COURSE_BY_SLUG_QUERY` (curso completo com módulos → aulas expandidas).
- `queries/lessons.ts` — `LESSON_BY_SLUG_QUERY` (aula completa + curso pai via referência reversa `*[_type=="course" && references(^._id)][0]`, com os módulos em forma resumida para `course-structure.ts` calcular a posição), `LESSON_SLUGS_QUERY`.
- `queries/instructors.ts` — `INSTRUCTOR_BY_SLUG_QUERY` (instrutor + seus cursos via referência reversa).
- `queries/categories.ts` — `CATEGORIES_QUERY`, `CATEGORY_BY_SLUG_QUERY`.

Todas as queries usam `defineQuery` de `next-sanity` com nomes únicos (exigência do TypeGen), texto de match de portable text não é necessário aqui (isso é do agente de busca, seção 11, fora de escopo).

## Requisitos

- Studio roda de forma independente (`cd studio && npm install && npm run dev`) sem depender do Next.js.
- Web roda de forma independente (`cd web && npm install && npm run dev`) sem a rota `/studio`.
- Nenhum token de leitura/escrita chega ao bundle do navegador — só `lib/client.ts`/`lib/fetch.ts` (marcados `server-only`) o usam.
- Todo o app Next.js existente (Clerk, style-guide, design system) continua funcionando idêntico depois da mudança de pasta — nenhuma mudança de conteúdo, só de caminho de import onde necessário.
- `web/sanity.types.ts` gerado e sem erros de tipo depois do schema + queries prontos.

## Considerações de segurança

- Dataset é privado por design da arquitetura (mesmo que a ativação real do "private" no Sanity Manage seja um passo manual — ver "Precisa da sua atenção"); o cliente de leitura já está pronto para exigir token quando isso acontecer.
- `SANITY_API_READ_TOKEN` só existe em `web/.env.local` (nunca commitado) e só é lido em módulos marcados `import 'server-only'`.
- Nenhuma variável `SANITY_STUDIO_*`/`NEXT_PUBLIC_*` carrega segredo — só `projectId`/`dataset`, que já são públicos por natureza (aparecem na URL da API de qualquer forma).
- `.env.example` (em cada workspace) é a lista canônica, commitada, sem valores reais — conforme seção 12 do AGENTS.md.
- `videoUrl` e `url` (em `resource`) usam `type: 'url'` com validação de esquema (`https`), evitando `javascript:`/esquemas arbitrários vindos do Studio.

## Critérios de aceitação

- `studio/` e `web/` são workspaces independentes, cada um com seu `package.json`, `node_modules`, `.gitignore` cobrindo os artefatos de build de cada um.
- Nenhum arquivo dentro de `app/studio/` sobra na raiz; a rota `/studio` do Next.js deixa de existir.
- Os 5 tipos da seção 8 (`course`, `module`, `lesson`, `instructor`, `category`) existem no `studio/schemaTypes`, com os campos fixos da seção 8 presentes e validação básica (`required()`) nos campos obrigatórios.
- `web/sanity/lib/client.ts` e `web/sanity/lib/fetch.ts` importam `server-only` e nunca são importados por um arquivo com `'use client'`.
- As 4 famílias de query (`courses`, `lessons`, `instructors`, `categories`) existem, tipam certo com `sanity.types.ts` gerado, e a query de aula resolve o curso pai por referência reversa.
- `npx tsc --noEmit` limpo em `web/` e em `studio/`.
- `npm run lint` limpo em `web/` e em `studio/`.
- `npm run build` limpo em `web/` (rotas/páginas movidas continuam buildando) e `npm run build` (= `sanity build`) limpo em `studio/`.

## Checks a rodar

1. `web`: `npx tsc --noEmit`, `npm run lint`, `npm run build`, `npm run dev` (smoke test manual abaixo).
2. `studio`: `npm run typecheck`, `npm run lint`, `npm run build` (= `sanity build`).
3. `studio`: `npm run typegen` (extrai schema + gera `../web/sanity.types.ts`), depois repetir o `tsc --noEmit` do `web` para confirmar que os tipos batem com as queries.

## Passos de teste manual

1. Na raiz: confirmar que não sobrou `package.json`/`node_modules` fora de `studio/`/`web/`.
2. `cd studio && npm install && npm run dev` → abre `http://localhost:3333`; criar um `category`, um `instructor`, um `lesson` e um `course` referenciando os dois e contendo um `module` com essa lesson — confirmar que o preview de cada documento mostra título/subtítulo/mídia coerentes.
3. Em outro terminal: `cd web && npm install && npm run dev` → abrir `http://localhost:3000/`, `/sign-in`, `/style-guide` e confirmar que continuam idênticos a antes da migração (nenhuma diferença visual, Clerk ainda funciona).
4. Confirmar que `http://localhost:3000/studio` não existe mais (404).
5. No `studio`, rodar `npm run typegen`; abrir `web/sanity.types.ts` e conferir que `COURSE_BY_SLUG_QUERY_RESULT`/`LESSON_BY_SLUG_QUERY_RESULT` etc. aparecem tipados.
6. Escrever um script ad-hoc (ou usar o Vision plugin em `http://localhost:3333/vision`) rodando `COURSE_BY_SLUG_QUERY` com o slug do curso criado no passo 2 e confirmar que módulos → aulas vêm expandidos e que `findLessonPosition` (chamado manualmente com o resultado de `LESSON_BY_SLUG_QUERY`) devolve `"Lesson 1.1"`.

## Precisa da sua atenção (depois de implementado)

- Tornar o dataset `production` privado e criar um token de leitura (role "Viewer") no Sanity Manage, depois colocar em `web/.env.local` como `SANITY_API_READ_TOKEN`. Comando: `cd studio && npx sanity dataset visibility set production private` (exige `npx sanity login` antes). Sem isso, a leitura continua funcionando hoje (dataset ainda público), mas a seção 12 do AGENTS.md exige o dataset privado.
- Depois que o Studio for deployado (`cd studio && npm run deploy`), adicionar a URL do `web` (local e produção) em CORS Origins do projeto Sanity — necessário mais adiante para o Context MCP (seção 12), não bloqueia este PR.
