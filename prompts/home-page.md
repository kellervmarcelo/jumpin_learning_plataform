# Implementação: Home page (JumpIn)

## Objetivo

Implementar a home page (`app/page.tsx`) reproduzindo exatamente `design/vertex-home.png`, usando os componentes já existentes em `components/ui` (design system Vertex, seção 3 do AGENTS.md). Único desvio deliberado em relação à imagem: todo texto de marca "Vertex" vira "JumpIn", conforme pedido. Nenhuma página de curso, busca, autenticação ou dado vindo do Sanity entra aqui — conteúdo dos cards é estático/placeholder, igual ao que a seção 12 da imagem `vertex-designsystem.png` já mostrava como exemplo.

## Skills e docs lidos

- `AGENTS.md` (raiz) — seções 2 (fluxo), 3 (UI é reproduzida exatamente a partir da imagem), 5 (páginas são read-only), 7 (notifications bell é presentational-only, sem backend).
- Não usei `frontend-design`/`design-taste-frontend`: há referência visual exata (`vertex-home.png`) e um design system já implementado — o trabalho é reproduzir, não decidir direção estética.

## Código e config inspecionados

- `components/ui/*` (Button, Input, Badge, CourseCard, Navbar) e `lib/cn.ts` — API de cada componente e como fundem `className`.
- `app/globals.css` — tokens de cor/tipografia/radius/sombra já disponíveis (nenhum token novo deveria ser necessário).
- `app/layout.tsx` — fontes Playfair/Inter já plugadas, body com `min-h-full flex flex-col`.
- `app/style-guide/page.tsx` — padrão já em uso de como uma página instancia `Navbar` e monta layout com `mx-auto max-w-6xl`.
- `design/vertex-course.png` e `design/vertex-search.png` — confirmam que o Navbar com sino de notificação + avatar do usuário é o cabeçalho padrão repetido em todas as telas do produto, não algo exclusivo da home.
- Busquei "Vertex" no repo: aparece em `components/ui/Navbar.tsx` (wordmark visível) e `app/style-guide/page.tsx:142` (texto visível "...Vertex learning platform..."). As ocorrências em `app/globals.css` e `prompts/design-system.md` são só nomes de arquivo/comentário histórico e não mexo nelas.

## Decisões e suposições

1. **Navbar precisa crescer**: hoje `components/ui/Navbar.tsx` só renderiza logo + links, sem sino de notificação nem avatar — mas a imagem da home (e também course/search) sempre mostra os dois. Como o Navbar é componente compartilhado, adiciono duas props opcionais (`notifications?: boolean` e `user?: { name: string; imageSrc?: string }`) em vez de criar um cabeçalho só para a home. Ficam opcionais para não quebrar o uso atual em `/style-guide`, que continua sem passá-las.
2. **Avatar sem foto real**: não há Clerk nem imagem de usuário real ainda (fora de escopo aqui). Sem `imageSrc`, o avatar cai para um círculo neutro com ícone de usuário (Phosphor `UserIcon`), igual ao padrão de fallback por iniciais que `CourseCard` já usa para thumbnail ausente. Vou passar um `user` de exemplo (`{ name: "Learner" }`) sem imagem, já que não existe asset de foto no projeto — evita inventar uma URL externa.
3. **Sino de notificação sem contador/dropdown**: por ser presentational-only (seção 7 do AGENTS.md), é só um botão com ícone `BellIcon`, `aria-label="Notifications"`, sem badge de contagem nem menu (a imagem não mostra contador).
4. **Logomarca "V" → "J"**: o Navbar já simplifica o ícone da marca (que na imagem é um glifo ilustrado) para um quadrado colorido com uma letra — decisão herdada da implementação anterior do design system, não da imagem pixel-a-pixel. Mantenho esse padrão e troco a letra de "V" para "J", já que agora o wordmark é "JumpIn".
5. **Mesma troca em `/style-guide`**: a página do design system também tem "Vertex" hardcoded (o quadrado "V" solto do cabeçalho da página e a frase "...Vertex learning platform..."). Ajusto os dois para "J"/"JumpIn" para não deixar a marca inconsistente entre páginas — é a mesma instrução de troca de nome, só que já existente antes desta tarefa.
6. **Card do meio (Docker)**: `CourseCard` já aceita um slot `thumbnail` para substituir o quadrado padrão. Uso esse slot para reproduzir os três thumbnails da imagem: quadrado preto "N" (na verdade já é o fallback padrão do componente), quadrado azul "TS" (thumbnail customizado, mesmo padrão visual do fallback só que com `bg-blue-600` pontual — não crio token novo, uso a paleta padrão do Tailwind só aqui por ser um logotipo de terceiro/ilustrativo, igual a imagem já foge da paleta Primary/Neutral nesse card) e um quadrado claro com emoji 🐳 para o whale do Docker (sem lib de logos de terceiros no projeto; emoji é a forma mais simples de não inventar um ícone que não existe no Phosphor).
7. **Conteúdo estático dos 3 cursos**: copiado literalmente da imagem (títulos, descrições, nível, duração, nº de módulos). `href` de cada card aponta para `/courses/<slug>` (rota que ainda não existe — fora de escopo) só para não deixar link vazio/`#`, seguindo a estrutura de URL que a seção 8 do AGENTS.md já prevê para curso.
8. **Selo "INTELLIGENT LEARNING"**: não é nenhuma das 3 variantes de `Badge` (video/lesson/popular são preenchidas; este selo é contornado, fundo claro). Construo inline na página com os tokens existentes (`bg-primary-100 text-primary-500 border border-primary-200`) em vez de adicionar uma 4ª variante ao `Badge` compartilhado só para um uso único nesta página.
9. **Busca grande do herói**: reaproveito `Input` (`variant="search"`, `shortcut="⌘K"`), só aumentando altura/radius via `className` (`h-14 rounded-xl shadow-sm`) — o componente já foi desenhado para aceitar essa composição (`cn()` faz o merge), então não crio um input novo.
10. **Faixa decorativa de barras no rodapé**: elemento puramente ilustrativo (barras com gradiente laranja, seção final da imagem). Não existe em nenhum componente do design system nem faz sentido virar um — implemento como marcação local ao `app/page.tsx`, `aria-hidden="true"`, sem texto/semântica, só CSS com os tokens de cor `primary-200`/`primary-300` já existentes.
11. **Onde o Navbar é instanciado**: sigo o padrão já usado em `/style-guide` — o Navbar é montado dentro da própria página (`app/page.tsx`), não em `app/layout.tsx`, porque cada página decide qual link fica `active`. Na home nenhum link do menu fica ativo (a imagem não realça nem "Courses" nem "My Learning").

## Arquivos que vou tocar

- `app/page.tsx` — reescrito por completo: hero, busca, seção "All Courses", faixa "New courses...", decoração de barras.
- `components/ui/Navbar.tsx` — troca "Vertex"/"V" por "JumpIn"/"J"; adiciona props opcionais `notifications` e `user` (sino + avatar) com fallback por ícone.
- `components/ui/index.ts` — exporta o novo tipo (`NavbarUser`, se necessário).
- `app/style-guide/page.tsx` — troca as duas ocorrências de "Vertex" por "JumpIn"/"J" (linhas 138 e 142), sem mais nenhuma mudança.

## Requisitos (da imagem)

- Navbar: logo "J" + "JumpIn" (Playfair), links "Courses" e "My Learning" (nenhum ativo), sino de notificação, avatar do usuário à direita.
- Selo "INTELLIGENT LEARNING" centralizado, pílula contornada.
- Título Display 1 (Playfair) em duas linhas: "Search your learning" / "in plain English."
- Subtítulo Body Large, `neutral-500`, centralizado, duas linhas, citando "JumpIn" (era "Vertex" na imagem).
- Botão Primary "Explore Courses" com ícone de seta à direita.
- Campo de busca grande, ícone de lupa à esquerda, placeholder "Ask anything about your learning...", atalho "⌘K" à direita.
- Divisória horizontal completa antes da seção de cursos.
- Cabeçalho de seção "All Courses" (Display 2) + link "View all courses" com seta, alinhado à direita.
- Grade de 3 `CourseCard`: Next.js for Production (Intermediate, 18h 24m, 12 modules), Docker Essentials (Beginner, 10h 12m, 8 modules), TypeScript Deep Dive (Intermediate, 14h 36m, 10 modules).
- Linha final com ícone de estrela contornado + "New courses and lessons added every week.", ladeada por linhas horizontais curtas.
- Faixa decorativa de barras em gradiente laranja no rodapé da página.

## Acessibilidade e responsividade

**Acessibilidade**
- Sino de notificação é `<button>` com `aria-label="Notifications"`; ícone `aria-hidden`.
- Avatar: `<img>` com `alt` = nome do usuário quando houver `imageSrc`; fallback de ícone marcado `aria-hidden` com `aria-label` no contêiner.
- Hero usa `<h1>` único na página; "All Courses" é `<h2>`.
- Faixa de barras decorativa: `aria-hidden="true"`, nenhum texto dentro.
- Ícone de estrela da linha final é decorativo (`aria-hidden`); o texto ao lado carrega o conteúdo.
- Mantém os padrões de foco visível já existentes em `Button`/`Input`/`CourseCard`/`Navbar` (nada novo a garantir além do que esses componentes já fazem).
- Contraste: `primary-500` sobre `primary-100` (selo) e `primary-500` sobre branco (link "View all courses") conferidos contra AA para texto pequeno/negrito.

**Responsividade** (sem referência mobile, seção 3 do AGENTS.md)
- Hero: título/subtítulo/busca/botão mantêm-se centralizados e com `max-w` fluido; título já usa `clamp()` herdado de `type-display-1`.
- Grade de cursos: 1 coluna no mobile, 2 em `sm`, 3 em `lg` (mesmo padrão de `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` já usado no style-guide).
- Cabeçalho da seção "All Courses": título e link empilham no mobile (`flex-col sm:flex-row sm:items-center sm:justify-between`).
- Faixa de barras: `overflow-hidden` no contêiner pai para nunca causar scroll horizontal; barras usam `flex-1`/`min-w-0` para se redistribuir em telas estreitas.
- Navbar mobile já resolvido pelo componente existente (menu hambúrguer); sino + avatar continuam visíveis também no mobile, à direita do botão de menu.

## Considerações de segurança

Página 100% apresentacional: sem fetch de rede, sem token, sem dado de usuário real (avatar de exemplo sem `imageSrc`). Nenhum `dangerouslySetInnerHTML`. Links de curso são internos (`/courses/<slug>`), sem `target="_blank"`.

## Critérios de aceitação

- `app/page.tsx` reproduz visualmente `design/vertex-home.png` (layout, espaçamento, tipografia, cores) com "JumpIn" no lugar de "Vertex" em todo texto de marca.
- Todos os elementos de UI vêm de `components/ui` (Button, Input, CourseCard, Navbar) exceto o selo "INTELLIGENT LEARNING" e a faixa decorativa de barras, que são específicos desta página (seção 3 do AGENTS.md: reutilizar antes de criar).
- `Navbar` com as novas props `notifications`/`user` continua funcionando sem elas (uso em `/style-guide` inalterado visualmente, exceto a marca).
- Nenhuma cor/radius/sombra/fonte escrita fora dos tokens do Tailwind já definidos em `@theme`, com a única exceção documentada do azul do card Docker/TS (decisão 6).
- `npx tsc --noEmit`, `npm run lint` e `npm run build` passam sem erro.
- Página não gera scroll horizontal entre 360px e desktop largo.

## Checks a rodar

1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. `npm run dev` e inspeção manual (passos abaixo)

## Passos de teste manual

1. Rodar `npm run dev`, abrir `http://localhost:3000/`.
2. Comparar lado a lado com `design/vertex-home.png`: navbar (logo "JumpIn", sino, avatar), selo, título, subtítulo, botão, busca.
3. Conferir a seção "All Courses": 3 cards com os dados corretos, link "View all courses" à direita.
4. Conferir a linha final "New courses and lessons added every week." e a faixa de barras decorativa no rodapé.
5. Reduzir a janela para mobile (~360–400px) e confirmar que nada quebra nem gera scroll horizontal, e que a grade de cursos empilha em 1 coluna.
6. Abrir `http://localhost:3000/style-guide` e confirmar que a marca também mudou para "JumpIn"/"J" e que o resto da página segue igual.
7. Navegar só com Tab pela home e confirmar foco visível em: link do logo, links do navbar, sino, avatar (se focável), botão "Explore Courses", campo de busca, link "View all courses", cada `CourseCard`.
