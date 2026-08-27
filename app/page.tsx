import { ArrowRightIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import { SiNextdotjs, SiDocker, SiTypescript } from "@icons-pack/react-simple-icons";
import { Button, Input, CourseCard, Navbar, type CourseCardProps } from "@/components/ui";

// Logos reais das marcas (Simple Icons via @icons-pack/react-simple-icons),
// nas cores oficiais de cada ferramenta — não são aproximações (emoji/letra).
// Next.js e TypeScript já trazem seu próprio "chip" colorido embutido no
// traçado do ícone; Docker não, por isso só ele ganha um contêiner próprio.
const nextjsThumbnail = (
  <span
    aria-hidden="true"
    className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-black"
  >
    <SiNextdotjs color="#ffffff" size={24} />
  </span>
);

const dockerThumbnail = (
  <span aria-hidden="true" className="flex h-12 w-12 flex-none items-center justify-center">
    <SiDocker color="#2496ED" size={40} />
  </span>
);

const typescriptThumbnail = (
  <span aria-hidden="true" className="flex h-12 w-12 flex-none items-center justify-center">
    <SiTypescript color="#3178C6" size={48} />
  </span>
);

// Conteúdo estático de exemplo (design/vertex-home.png, seção "All Courses").
// Sem Sanity ainda — nenhuma página de curso real existe, os hrefs só seguem
// a estrutura de rota que a seção 8 do AGENTS.md já prevê para curso.
const courses: CourseCardProps[] = [
  {
    title: "Next.js for Production",
    description: "Build scalable, high-performance web applications with Next.js.",
    level: "Intermediate",
    duration: "18h 24m",
    modulesLabel: "12 modules",
    href: "/courses/nextjs-for-production",
    thumbnail: nextjsThumbnail,
  },
  {
    title: "Docker Essentials",
    description: "Containerize applications and streamline your development workflow.",
    level: "Beginner",
    duration: "10h 12m",
    modulesLabel: "8 modules",
    href: "/courses/docker-essentials",
    thumbnail: dockerThumbnail,
  },
  {
    title: "TypeScript Deep Dive",
    description: "Go beyond the basics and write safer, more expressive code.",
    level: "Intermediate",
    duration: "14h 36m",
    modulesLabel: "10 modules",
    href: "/courses/typescript-deep-dive",
    thumbnail: typescriptThumbnail,
  },
];

// Faixa decorativa no rodapé — puramente ilustrativa, sem correspondência a dado
// real. `null` vira um vão vazio (reproduz o "vale" no meio da ilustração de
// referência); os valores são % da altura do contêiner.
const skylineBars: (number | null)[] = [
  55, 88, 66, 100, 50, 78, null, null, 58, 92, 72, 100, 60, 95, 52, 82,
];

// Repete a listra diagonal fina da margem lateral da imagem de referência
// (medida em design/vertex-home.png: período ~13px, 45°, tom primary-100).
const railStripeStyle = {
  backgroundImage:
    "repeating-linear-gradient(45deg, var(--color-primary-100) 0px, var(--color-primary-100) 2px, transparent 2px, transparent 13px)",
};

// A ilustração de barras da referência esmaece de volta ao fundo bem antes do
// fim real da página (deixa um respiro em branco), em vez de terminar cortada
// rente à borda — reproduzido com uma máscara vertical no contêiner.
const skylineMaskStyle = {
  maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
};

export default function Home() {
  return (
    <div className="relative bg-neutral-50">
      {/* Margens decorativas com listras diagonais — só a partir de `sm`, para
          não roubar espaço do conteúdo em telas estreitas (sem referência mobile). */}
      <span
        aria-hidden="true"
        style={railStripeStyle}
        className="absolute inset-y-0 left-0 hidden w-7 border-r border-neutral-200 sm:block"
      />
      <span
        aria-hidden="true"
        style={railStripeStyle}
        className="absolute inset-y-0 right-0 hidden w-7 border-l border-neutral-200 sm:block"
      />

      <div className="flex min-h-full flex-col sm:mx-7">
        <Navbar
          links={[
            { label: "Courses", href: "/courses" },
            { label: "My Learning", href: "/my-learning" },
          ]}
          notifications
          user={{ name: "Learner" }}
        />

        <main className="flex flex-1 flex-col">
          <section className="flex flex-col items-center gap-8 px-4 py-20 text-center sm:px-6">
            <span className="type-small w-fit rounded-full border border-primary-200 bg-primary-100 px-4 py-1.5 font-semibold uppercase tracking-wide text-primary-500">
              Intelligent Learning
            </span>

            <h1 className="type-display-1 max-w-3xl text-neutral-900">
              Search your learning in plain English.
            </h1>

            <p className="type-body-lg max-w-xl text-neutral-500">
              JumpIn understands what you want to learn and finds the exact lessons across all
              your courses.
            </p>

            <Button variant="primary" icon={ArrowRightIcon} href="/courses">
              Explore Courses
            </Button>

            <Input
              variant="search"
              shortcut="⌘K"
              placeholder="Ask anything about your learning..."
              aria-label="Search your learning"
              wrapperClassName="w-full max-w-2xl"
              className="h-14 rounded-xl shadow-sm"
            />
          </section>

          <div aria-hidden="true" className="border-t border-neutral-200" />

          <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="type-display-2 text-neutral-900">All Courses</h2>
              <Button variant="text" icon={ArrowRightIcon} href="/courses">
                View all courses
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.href} {...course} />
              ))}
            </div>
          </section>

          <section className="flex items-center gap-4 px-4 pb-12 sm:px-6">
            <span aria-hidden="true" className="hidden h-px flex-1 bg-neutral-200 sm:block" />
            <p className="inline-flex items-center gap-2 type-body text-neutral-500">
              <StarIcon size={16} className="text-primary-500" aria-hidden="true" />
              New courses and lessons added every week.
            </p>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-neutral-200 sm:block" />
          </section>

          <div aria-hidden="true" style={skylineMaskStyle} className="h-48 sm:h-56">
            <div className="flex h-full items-end gap-2 px-4 sm:gap-3 sm:px-6">
              {skylineBars.map((height, index) =>
                height === null ? (
                  <span key={index} className="min-w-0 flex-1" />
                ) : (
                  <span
                    key={index}
                    className="min-w-0 flex-1 rounded-t-sm"
                    style={{
                      height: `${height}%`,
                      background:
                        "linear-gradient(to top, var(--color-primary-400), var(--color-primary-200) 70%, transparent)",
                    }}
                  />
                ),
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
