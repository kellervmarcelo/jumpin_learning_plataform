# Implementação: Design System Vertex

## Objetivo

Implementar no projeto Next.js os tokens visuais e os componentes de UI reutilizáveis definidos em `design/vertex-designsystem.png`, para que as próximas páginas (catálogo, curso, lição, busca) sejam construídas em cima de uma base consistente em vez de reinventar estilo a cada tela. Este trabalho é só a fundação visual — nenhuma página de produto, schema do Sanity, autenticação ou busca entra aqui.

## Skills e docs lidos

- `AGENTS.md` (raiz) — seções 2 (fluxo de trabalho), 3 (UI é reproduzida exatamente a partir da imagem, sem criar direção própria) e 5 (separação de responsabilidades).
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` — confirma que `next/font/google` (padrão já usado no projeto para Geist) funciona igual para Playfair Display e Inter, sem breaking change nesta versão do Next.
- Não usei `frontend-design` / `design-taste-frontend`: essas skills servem para *decidir* uma direção estética quando não há referência. Aqui a referência (`vertex-designsystem.png`) já fixa cores, tipografia, espaçamento, raios, sombras e componentes — o trabalho é ler os valores exatos da imagem e reproduzi-los, não inventar.

## Código e config inspecionados

- Projeto é um `create-next-app` recém-gerado: tudo na raiz (`app/`), sem separação em workspaces `studio/` e `web/` ainda — Sanity Studio ainda não existe no repo.
- `app/globals.css`: Tailwind v4 "CSS-first" (sem `tailwind.config.*`), tokens hoje são só `--background`/`--foreground` + dark mode automático por `prefers-color-scheme`.
- `app/layout.tsx`: usa `Geist`/`Geist_Mono` via `next/font/google`, expostas como CSS vars e aplicadas na tag `<html>`.
- `app/page.tsx`: página placeholder do template, será substituída por uma página de catálogo futuramente (fora do escopo deste prompt).
- `package.json`: sem nenhuma lib de ícones instalada.

## Decisões e suposições

1. **Onde entra o código**: mantenho tudo na estrutura atual (`app/`, novo `components/`) na raiz do repo. A separação em workspaces `studio/` (Sanity) e `web/` (Next.js) da seção 5 do AGENTS.md é relevante quando o Studio for criado — não hoje, já que este prompt não toca em Sanity. Se preferir já criar a pasta `web/` e mover tudo para lá, aviso antes de fazer isso; por padrão vou implementar direto na raiz atual.
2. **Tema**: a imagem de referência só mostra modo claro. Vou remover o dark mode automático que o template trouxe (`prefers-color-scheme`) e fixar o tema claro dos tokens, já que a referência não define nenhuma variante escura — inventar uma seria fugir de "reproduzir exatamente".
3. **Cores adicionais fora da paleta**: a seção 10 (Status/Indicators) da imagem mostra um ícone verde de "Completed" que não aparece na paleta declarada (seção 01 só lista Primary/Neutral). Vou adicionar um único tom semântico `success` (`#22C55E`, verde Tailwind padrão, por não haver outro verde definido) só para esse indicador. É o único valor que não vem literalmente da imagem — se preferir outro tom, me diga depois de ver o resultado.
4. **Ícones**: a imagem pede estilo Outline (24×24, stroke 2px) e uma variante Filled do mesmo conjunto de ícones (sino, busca, play, documento, marcador, gráfico, relógio, usuário, seta). Vou usar `@phosphor-icons/react`, porque é a biblioteca comum no ecossistema React que oferece o mesmo ícone em peso `regular` (outline) e `fill` (preenchido) por uma única prop — encaixa exatamente no par Outline/Filled da seção 06, o que `lucide-react` (só outline) não cobre.
5. **Fontes**: `Playfair Display` (display/headings) e `Inter` (corpo/UI) via `next/font/google`, substituindo Geist/Geist Mono no layout raiz.
6. **Tailwind v4 sem config file**: todos os tokens (cores, radius, sombras, escala tipográfica) entram como `@theme` em `app/globals.css`, no padrão CSS-first que o projeto já usa (sem criar `tailwind.config.ts`).
7. **Espaçamento**: a escala de 4px da seção 04 já é a escala padrão do Tailwind (`p-1`=4px, `p-2`=8px, `p-3`=12px, `p-4`=16px, `p-6`=24px, `p-8`=32px, `p-10`=40px, `p-12`=48px, `p-16`=64px). Não crio tokens novos de espaçamento — só documento o mapeamento na página de showcase.
8. **Página de showcase**: crio `app/style-guide/page.tsx`, uma página viva que reúne todos os tokens e componentes (equivalente em código à imagem de referência), para conferência visual e para servir de catálogo de componentes ao construir as próximas telas.
9. **Botões com ícone**: "Watch Video"/"Watch from 12:45" e "View Lesson" levam ícone (play / external-link) à direita, conforme a imagem — o componente `Button` aceita um ícone opcional.
10. **Composição de className**: todo componente aceita `className` (critério de aceitação já previa isso) e por baixo funde classes com `clsx` + `tailwind-merge` via um util `cn()` — é o padrão de fato hoje em projetos Tailwind (mesma função que o shadcn/ui usa), evita que uma classe passada por fora perca para uma classe do Tailwind com a mesma propriedade só por ordem de declaração.

## Arquivos que vou tocar

- `app/globals.css` — tokens de cor, tipografia, radius, sombra; remove dark mode automático.
- `app/layout.tsx` — troca Geist/Geist Mono por Playfair Display/Inter.
- `app/style-guide/page.tsx` (novo) — página de showcase do design system.
- `components/ui/Button.tsx` (novo)
- `components/ui/Input.tsx` (novo) — text/search input
- `components/ui/Select.tsx` (novo)
- `components/ui/Badge.tsx` (novo) — Video/Lesson/Popular
- `components/ui/StatusIndicator.tsx` (novo) — In Progress/Completed/Now Playing/Locked
- `components/ui/ProgressBar.tsx` (novo)
- `components/ui/CourseCard.tsx` (novo)
- `components/ui/LessonCard.tsx` (novo) — variantes `video` e `lesson`
- `components/ui/ResourceCard.tsx` (novo)
- `components/ui/Navbar.tsx` (novo)
- `components/ui/Breadcrumbs.tsx` (novo)
- `components/ui/Pagination.tsx` (novo)
- `components/ui/index.ts` (novo) — barrel export
- `lib/cn.ts` (novo) — utilitário `cn()` (`clsx` + `tailwind-merge`) usado por todos os componentes
- `package.json` — adiciona `@phosphor-icons/react`, `clsx`, `tailwind-merge`; adiciona script `typecheck`.

## Requisitos (valores exatos extraídos da imagem)

**Cores**
- Primary: 500 `#F97316`, 400 `#FB923C`, 300 `#FDBA74`, 200 `#FED7AA`, 100 `#FFEEE5`
- Neutral: 900 `#0F172A`, 700 `#334155`, 500 `#64748B`, 300 `#CBD5E1`, 200 `#E2E8F0`, 100 `#F1F5F9`, 50 `#FAFAFC`, White `#FFFFFF`
- Semântico extra: `success` `#22C55E` (ver suposição 3)

**Tipografia**
- Fontes: Playfair Display (display), Inter (resto)
- Escala (tamanho/altura de linha/peso/uso): Display 1 `48/56` bold — títulos de página; Display 2 `36/44` bold — títulos de seção; Heading 1 `28/36` semibold — títulos de card; Heading 2 `22/30` semibold — subseção; Heading 3 `18/26` medium — títulos pequenos; Body Large `16/24` regular — corpo; Body `14/20` regular — texto de apoio; Small `12/16` regular — legendas/meta.

**Espaçamento** — base 4px: 4, 8, 12, 16, 24, 32, 40, 48, 64.

**Radius**: xs 4px, sm 8px, md 12px, lg 16px, xl 24px, full (círculo).

**Sombra**: sm `0 1px 2px 0 rgba(15,23,42,.05)`; md `0 4px 12px -2px rgba(15,23,42,.08)`; lg `0 12px 24px -4px rgba(15,23,42,.10)`; xl `0 20px 40px -8px rgba(15,23,42,.12)`.

**Ícones**: grade 24×24, stroke 2px no outline, terminações arredondadas, balanço óptico consistente; par outline/filled por ícone.

**Botões**: variantes Primary (fundo primary-500, texto branco), Secondary (borda primary-500, texto primary-500, fundo transparente), Tertiary (texto neutral-700 com ícone, sem fundo/borda), Text (texto primary-500, sem fundo/borda, ícone play). Estados default/hover/disabled (disabled = opacidade reduzida + texto/borda neutral-300). Specs: altura 44px, padding `0 16px` (lg) / `0 12px` (md), radius 12px, fonte Inter Medium 14–16px.

**Inputs**: altura 44px, radius 12px, borda 1px `neutral-200`, padding `0 16px`, foco com borda `primary-400`; variante de busca com ícone de lupa à esquerda e atalho "⌘K" à direita; select com chevron à direita.

**Badges**: Video (fundo `neutral-900`, texto branco), Lesson (fundo `neutral-100`, texto `neutral-700`), Popular (fundo `primary-500`, texto branco). Pílula, texto Small, uppercase.

**Status/Indicadores**: In Progress (contorno `neutral-500`), Completed (check `success`), Now Playing (ponto preenchido `primary-500`), Locked (cadeado `neutral-500`).

**Barra de progresso**: trilho `neutral-100`, preenchimento `primary-500`, altura fina, extremidades arredondadas (full), rótulo opcional "`X% complete`" em Small/`neutral-700`.

**Cards**: Course Card (thumbnail/ícone quadrado, título Heading 3, descrição Body/`neutral-500`, linha de meta com ícones — nível, duração, nº de módulos); Lesson Card variante Video (badge Video, título, descrição, meta "Lesson X.Y • mm:ss", botão Tertiary "Watch from mm:ss" com ícone play); Lesson Card variante Lesson (badge Lesson, título, descrição, meta "Module N", botão Tertiary "View lesson" com ícone external-link); Resource Card (ícone de arquivo, título, descrição, meta "TIPO • tamanho", ícone external-link).

**Navegação**: Navbar com logo (ícone "V" laranja + wordmark "Vertex" em Playfair) e links "Courses"/"My Learning"; Breadcrumbs com separador chevron; Pagination com setas prev/next e página atual destacada (borda `primary-500`).

## Acessibilidade e responsividade

**Acessibilidade**
- HTML semântico: `<button>` real para Button, `<label>` associado a Input/Select (via `htmlFor`/`id`), `<nav aria-label="...">` para Navbar/Breadcrumbs/Pagination, `<ol>` para Breadcrumbs.
- Foco visível: todo elemento interativo (botão, input, select, item de paginação, link do navbar) ganha `focus-visible:ring` além da mudança de borda — não depender só de `:hover`/cor para indicar estado.
- Ícones decorativos recebem `aria-hidden="true"`; botões/links só-com-ícone (ex.: um ícone de external-link isolado) recebem `aria-label`.
- Status/indicadores não dependem só de cor: cada estado já tem forma de ícone distinta (contorno vazio, check, ponto, cadeado) — mantenho essa distinção e ainda incluo o texto do status (ex. "Completed") ao lado do ícone, nunca só a cor isolada.
- Barra de progresso usa `role="progressbar"` com `aria-valuenow`/`aria-valuemin`/`aria-valuemax` (ou `<progress>` nativo estilizado).
- Página/item atual marcado com `aria-current="page"` (link ativo do Navbar, item ativo da Pagination, último item do Breadcrumb).
- Contraste: confiro os pares texto/fundo usados (texto branco sobre `primary-500`, `neutral-700` sobre `neutral-100`, etc.) contra WCAG AA (4.5:1 texto normal, 3:1 texto grande/ícone) e ajusto o tom se algum combo ficar abaixo disso — sem me afastar da paleta, só escolhendo o par certo dela.
- Estado disabled usa `disabled`/`aria-disabled` real no elemento, não só opacidade.

**Responsividade** (sem referência mobile, adapto com bom senso conforme seção 3 do AGENTS.md)
- Grade da página `/style-guide` empilha em 1 coluna no mobile, 2+ em telas maiores (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3` conforme a seção).
- Navbar: links "Courses"/"My Learning" ficam visíveis em telas médias/grandes; abaixo do breakpoint `md` recolhem atrás de um botão de menu (ícone hambúrguer), evitando quebrar o layout do logo.
- Cards (Course/Lesson/Resource): largura total no mobile, em grade a partir de `sm`/`md`.
- Pagination: mantém os elipses (`…`) da referência e ganha `overflow-x-auto` como rede de segurança em telas muito estreitas.
- Escala tipográfica: `Display 1`, `Display 2` e `Heading 1` (as maiores, com mais risco de estourar em telas pequenas) usam tamanho fluido via `clamp()` entre um piso legível no mobile e o valor exato de 48/36/28px definido na imagem em telas largas; `Heading 2/3`, `Body Large/Body/Small` ficam fixos por já serem pequenos o bastante.

## Considerações de segurança

Superfície puramente apresentacional, sem dados de usuário, sem chamadas de rede, sem tokens/segredos. Componentes não recebem HTML não-sanitizado (sem `dangerouslySetInnerHTML`). Links externos (Resource Card, botões com ícone external-link) usam `target="_blank" rel="noopener noreferrer"`. Nenhuma dependência nova além de `@phosphor-icons/react` (pacote com milhões de downloads, sem acesso a rede/sistema em runtime).

## Critérios de aceitação

- `app/style-guide` reproduz visualmente cada seção da imagem (cores, tipografia, espaçamento, radius/sombra, ícones, botões, inputs, badges, status, progress bar, cards, navegação) usando os componentes reais de `components/ui`, não apenas capturas estáticas.
- Todos os componentes são tipados em TypeScript, aceitam `className` para composição e não hardcodam texto de produto (recebem os textos via props).
- Nenhuma cor, radius, sombra ou tamanho de fonte é escrito como valor solto fora dos tokens do Tailwind — tudo referencia os tokens definidos em `@theme`.
- `npx tsc --noEmit`, `npm run lint` e `npm run build` passam sem erro.
- Todo elemento interativo é alcançável e operável só por teclado (Tab/Enter/Espaço), com foco sempre visível.
- Nenhum estado (status, disabled, página atual) é comunicado só por cor.
- A página `/style-guide` não quebra layout nem gera scroll horizontal entre 360px e desktop largo.

## Checks a rodar

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build` (rotas novas foram adicionadas)
4. `npm run dev` e inspeção manual (passos abaixo)

## Passos de teste manual

1. Rodar `npm run dev` e abrir `http://localhost:3000/style-guide`.
2. Conferir a paleta de cores (10 swatches) contra a seção 01 da imagem.
3. Conferir que os títulos usam Playfair Display e o corpo usa Inter (seção 02) e que cada linha da escala tipográfica (seção 03) bate tamanho/altura/peso.
4. Passar o mouse nos blocos de espaçamento e nos cartões de radius/sombra (seções 04–05) e comparar com a imagem lado a lado.
5. Conferir os 8 ícones em outline e filled (seção 06).
6. Nos botões (seção 07): conferir os 4 estilos × 3 estados (default, hover passando o mouse, disabled) e o botão "Text" com ícone de play.
7. Nos inputs (seção 08): digitar no campo de busca, abrir o select "Most Relevant".
8. Conferir badges (seção 09) e indicadores de status (seção 10) lado a lado com a imagem.
9. Conferir a barra de progresso em 35% (seção 11).
10. Conferir os 4 cards (seção 12): Course, Lesson-Video, Lesson-Lesson, Resource.
11. Conferir navbar, breadcrumbs e paginação (seção 13).
12. Reduzir a largura da janela (mobile) e confirmar que a grade da página de showcase empilha em 1 coluna sem quebrar layout, e que o navbar recolhe os links no menu.
13. Navegar só com Tab/Shift+Tab pela página inteira e confirmar que o foco fica sempre visível e a ordem faz sentido (navbar → conteúdo → paginação).
14. Testar com um leitor de tela (ou a árvore de acessibilidade do DevTools) que a barra de progresso anuncia a porcentagem e que os indicadores de status anunciam o texto do estado, não só o ícone.
