"use client";

import { useState, type ReactNode } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  PlayCircleIcon,
  FileTextIcon,
  BookmarkIcon,
  ChartBarIcon,
  ClockIcon,
  UserIcon,
  CaretRightIcon,
  ArrowSquareOutIcon,
  EyeIcon,
  SquaresFourIcon,
  TargetIcon,
  WheelchairIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Button,
  Input,
  Select,
  Badge,
  StatusIndicator,
  ProgressBar,
  CourseCard,
  LessonCard,
  ResourceCard,
  Navbar,
  Breadcrumbs,
  Pagination,
  type PhosphorIcon,
} from "@/components/ui";

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="flex items-baseline gap-3">
        <span className="type-small font-semibold text-primary-500">{number}</span>
        <span className="type-heading-2 uppercase tracking-wide text-neutral-900">{title}</span>
      </h2>
      {children}
    </section>
  );
}

const primaryColors = [
  { name: "Primary 500", value: "#F97316", className: "bg-primary-500", textClassName: "text-white" },
  { name: "Primary 400", value: "#FB923C", className: "bg-primary-400", textClassName: "text-white" },
  { name: "Primary 300", value: "#FDBA74", className: "bg-primary-300", textClassName: "text-neutral-900" },
  { name: "Primary 200", value: "#FED7AA", className: "bg-primary-200", textClassName: "text-neutral-900" },
  { name: "Primary 100", value: "#FFEEE5", className: "bg-primary-100", textClassName: "text-neutral-900" },
];

const neutralColors = [
  { name: "Neutral 900", value: "#0F172A", className: "bg-neutral-900", textClassName: "text-white" },
  { name: "Neutral 700", value: "#334155", className: "bg-neutral-700", textClassName: "text-white" },
  { name: "Neutral 500", value: "#64748B", className: "bg-neutral-500", textClassName: "text-white" },
  { name: "Neutral 300", value: "#CBD5E1", className: "bg-neutral-300", textClassName: "text-neutral-900" },
  { name: "Neutral 200", value: "#E2E8F0", className: "bg-neutral-200", textClassName: "text-neutral-900" },
  { name: "Neutral 100", value: "#F1F5F9", className: "bg-neutral-100", textClassName: "text-neutral-900" },
  { name: "Neutral 50", value: "#FAFAFC", className: "bg-neutral-50 border border-neutral-200", textClassName: "text-neutral-900" },
  { name: "White", value: "#FFFFFF", className: "bg-white border border-neutral-200", textClassName: "text-neutral-900" },
];

const typeScale = [
  { style: "Display 1", font: "Playfair Display", size: "48 / 56", weight: "Bold", use: "Page titles", className: "type-display-1" },
  { style: "Display 2", font: "Playfair Display", size: "36 / 44", weight: "Bold", use: "Section titles", className: "type-display-2" },
  { style: "Heading 1", font: "Inter", size: "28 / 36", weight: "Semi Bold", use: "Card titles", className: "type-heading-1" },
  { style: "Heading 2", font: "Inter", size: "22 / 30", weight: "Semi Bold", use: "Sub section", className: "type-heading-2" },
  { style: "Heading 3", font: "Inter", size: "18 / 26", weight: "Medium", use: "Small titles", className: "type-heading-3" },
  { style: "Body Large", font: "Inter", size: "16 / 24", weight: "Regular", use: "Body copy", className: "type-body-lg" },
  { style: "Body", font: "Inter", size: "14 / 20", weight: "Regular", use: "Supporting text", className: "type-body" },
  { style: "Small", font: "Inter", size: "12 / 16", weight: "Regular", use: "Captions, meta", className: "type-small" },
];

const spacingScale = [4, 8, 12, 16, 24, 32, 40, 48, 64];

const radiusScale = [
  { name: "4px (xs)", className: "rounded-xs" },
  { name: "8px (sm)", className: "rounded-sm" },
  { name: "12px (md)", className: "rounded-md" },
  { name: "16px (lg)", className: "rounded-lg" },
  { name: "24px (xl)", className: "rounded-xl" },
  { name: "Full (circle)", className: "rounded-full" },
];

const shadowScale = [
  { name: "Sm", className: "shadow-sm", spec: "0 1px 2px 0 rgba(15,23,42,.05)" },
  { name: "Md", className: "shadow-md", spec: "0 4px 12px -2px rgba(15,23,42,.08)" },
  { name: "Lg", className: "shadow-lg", spec: "0 12px 24px -4px rgba(15,23,42,.10)" },
  { name: "Xl", className: "shadow-xl", spec: "0 20px 40px -8px rgba(15,23,42,.12)" },
];

const iconSet: { name: string; icon: PhosphorIcon }[] = [
  { name: "Bell", icon: BellIcon },
  { name: "Search", icon: MagnifyingGlassIcon },
  { name: "Play", icon: PlayCircleIcon },
  { name: "Document", icon: FileTextIcon },
  { name: "Bookmark", icon: BookmarkIcon },
  { name: "Chart", icon: ChartBarIcon },
  { name: "Clock", icon: ClockIcon },
  { name: "User", icon: UserIcon },
  { name: "Chevron", icon: CaretRightIcon },
];

const principles = [
  { icon: EyeIcon, title: "Clarity First", description: "Every element should communicate clearly." },
  { icon: SquaresFourIcon, title: "Consistency", description: "Use components and patterns consistently across the platform." },
  { icon: TargetIcon, title: "Focus & Calm", description: "Remove noise and help learners focus on what matters." },
  { icon: WheelchairIcon, title: "Accessible", description: "Design with accessibility and inclusivity in mind." },
];

export default function StyleGuidePage() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex min-h-full flex-col bg-neutral-50">
      <Navbar
        links={[
          { label: "Courses", href: "/style-guide", active: true },
          { label: "My Learning", href: "/style-guide" },
        ]}
      />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6">
        <header className="flex flex-col gap-3">
          <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-md bg-primary-500 type-heading-1 font-bold text-white">
            J
          </span>
          <h1 className="type-display-1 text-neutral-900">Design System</h1>
          <p className="type-body-lg max-w-2xl text-neutral-500">
            A unified design language for the JumpIn learning platform. Clean, modern and
            focused on clarity, consistency and intuitive learning experiences.
          </p>
          <span className="type-small text-neutral-500">Version 1.0 · Implementado em JumpIn</span>
        </header>

        <Section number="01" title="Colors">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="type-body mb-3 font-medium text-neutral-700">Primary</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {primaryColors.map((color) => (
                  <div key={color.name} className="flex flex-col gap-2">
                    <div className={`flex h-16 items-end rounded-md p-2 ${color.className}`}>
                      <span className={`type-small font-medium ${color.textClassName}`}>{color.value}</span>
                    </div>
                    <span className="type-small text-neutral-500">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="type-body mb-3 font-medium text-neutral-700">Neutral</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                {neutralColors.map((color) => (
                  <div key={color.name} className="flex flex-col gap-2">
                    <div className={`flex h-16 items-end rounded-md p-2 ${color.className}`}>
                      <span className={`type-small font-medium ${color.textClassName}`}>{color.value}</span>
                    </div>
                    <span className="type-small text-neutral-500">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Section number="02" title="Typography">
            <div className="flex flex-col gap-6">
              <div>
                <p className="type-display-2 font-display text-neutral-900">Ag</p>
                <p className="type-body font-medium text-neutral-900">Playfair Display</p>
                <p className="type-small text-neutral-500">Elegant · Readable · Timeless</p>
              </div>
              <div>
                <p className="type-display-2 font-sans text-neutral-900">Ag</p>
                <p className="type-body font-medium text-neutral-900">Inter</p>
                <p className="type-small text-neutral-500">Clean · Modern · Highly legible</p>
              </div>
            </div>
          </Section>

          <Section number="03" title="Type Scale">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse type-small">
                <thead>
                  <tr className="border-b border-neutral-200 text-left text-neutral-500">
                    <th className="py-2 pr-3 font-medium">Style</th>
                    <th className="py-2 pr-3 font-medium">Size/LH</th>
                    <th className="py-2 pr-3 font-medium">Weight</th>
                    <th className="py-2 font-medium">Use</th>
                  </tr>
                </thead>
                <tbody>
                  {typeScale.map((row) => (
                    <tr key={row.style} className="border-b border-neutral-100 last:border-0">
                      <td className={`py-2 pr-3 ${row.className} text-neutral-900`}>{row.style}</td>
                      <td className="py-2 pr-3 text-neutral-500">{row.size}</td>
                      <td className="py-2 pr-3 text-neutral-500">{row.weight}</td>
                      <td className="py-2 text-neutral-500">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Section number="04" title="Spacing System">
            <div>
              <p className="type-small mb-4 text-neutral-500">Base unit: 4px</p>
              <div className="flex flex-wrap items-end gap-4">
                {spacingScale.map((size) => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <div className="rounded-xs bg-primary-200" style={{ width: size, height: size }} />
                    <span className="type-small text-neutral-500">{size}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section number="05" title="Radius & Shadows">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="type-body mb-3 font-medium text-neutral-700">Radius</h3>
                <div className="flex flex-wrap gap-4">
                  {radiusScale.map((radius) => (
                    <div key={radius.name} className="flex flex-col items-center gap-2">
                      <div className={`h-12 w-12 border border-neutral-300 bg-neutral-50 ${radius.className}`} />
                      <span className="type-small text-neutral-500">{radius.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="type-body mb-3 font-medium text-neutral-700">Shadows</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {shadowScale.map((shadow) => (
                    <div key={shadow.name} className={`rounded-md bg-white p-3 ${shadow.className}`}>
                      <p className="type-body font-medium text-neutral-900">{shadow.name}</p>
                      <p className="type-small text-neutral-500">{shadow.spec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>

        <Section number="06" title="Icons">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="type-body mb-3 font-medium text-neutral-700">Outline Style</h3>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-9">
                {iconSet.map(({ name, icon: Icon }) => (
                  <div key={name} className="flex flex-col items-center gap-1">
                    <Icon size={24} weight="regular" aria-hidden="true" className="text-neutral-900" />
                    <span className="sr-only">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="type-body mb-3 font-medium text-neutral-700">Filled Style</h3>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-9">
                {iconSet.map(({ name, icon: Icon }) => (
                  <div key={name} className="flex flex-col items-center gap-1">
                    <Icon size={24} weight="fill" aria-hidden="true" className="text-neutral-900" />
                    <span className="sr-only">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="type-small text-neutral-500">
              Grade 24×24 · stroke 2px (outline) · terminações arredondadas · balanço óptico consistente.
            </p>
          </div>
        </Section>

        <Section number="07" title="Buttons">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="type-body mb-3 font-medium text-neutral-700">Default (passe o mouse para ver o hover)</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Get Started</Button>
                <Button variant="secondary">Explore Courses</Button>
                <Button variant="tertiary" icon={ArrowSquareOutIcon}>
                  View Lesson
                </Button>
                <Button variant="text" icon={PlayCircleIcon}>
                  Watch Video
                </Button>
              </div>
            </div>
            <div>
              <h3 className="type-body mb-3 font-medium text-neutral-700">Disabled</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" disabled>
                  Get Started
                </Button>
                <Button variant="secondary" disabled>
                  Explore Courses
                </Button>
                <Button variant="tertiary" icon={ArrowSquareOutIcon} disabled>
                  View Lesson
                </Button>
                <Button variant="text" icon={PlayCircleIcon} disabled>
                  Watch Video
                </Button>
              </div>
            </div>
            <p className="type-small text-neutral-500">
              Altura 44px (padrão) · padding 0 16px · radius 12px · fonte Inter Medium 14–16px.
            </p>
          </div>
        </Section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Section number="08" title="Inputs">
            <div className="flex max-w-sm flex-col gap-4">
              <Input label="Search / Text Input" variant="search" placeholder="Search anything..." shortcut="⌘K" />
              <Select
                label="Select"
                options={[
                  { value: "relevant", label: "Most Relevant" },
                  { value: "recent", label: "Most Recent" },
                ]}
              />
              <p className="type-small text-neutral-500">
                Altura 44px · radius 12px · borda 1px neutral-200 · foco com borda primary-400.
              </p>
            </div>
          </Section>

          <Section number="09" title="Badges / Tags">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <Badge variant="video">Video</Badge>
                <span className="type-small text-neutral-500">Video</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="lesson">Lesson</Badge>
                <span className="type-small text-neutral-500">Lesson</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Badge variant="popular">Popular</Badge>
                <span className="type-small text-neutral-500">Popular</span>
              </div>
            </div>
          </Section>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Section number="10" title="Status / Indicators">
            <div className="flex flex-wrap gap-6">
              <StatusIndicator status="in-progress" label="In Progress" />
              <StatusIndicator status="completed" label="Completed" />
              <StatusIndicator status="now-playing" label="Now Playing" />
              <StatusIndicator status="locked" label="Locked" />
            </div>
          </Section>

          <Section number="11" title="Progress Bar">
            <ProgressBar value={35} label="35% complete" />
          </Section>
        </div>

        <Section number="12" title="Cards">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <CourseCard
              title="Next.js for Production"
              description="Build scalable, high-performance web applications with Next.js."
              level="Intermediate"
              duration="18h 24m"
              modulesLabel="12 modules"
              href="/style-guide"
            />
            <LessonCard
              variant="video"
              badgeLabel="Video"
              title="Data Fetching in Server Components"
              description="Learn how to fetch data on the server using async/await and Next.js best practices."
              meta="Lesson 5.1 · 12:45"
              actionLabel="Watch from 12:45"
              href="/style-guide"
            />
            <LessonCard
              variant="lesson"
              badgeLabel="Lesson"
              title="Data Fetching & Caching"
              description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
              meta="Module 5"
              actionLabel="View lesson"
              href="/style-guide"
            />
            <ResourceCard
              title="Caching and Revalidation Guide"
              description="Deep dive into Next.js caching strategies."
              meta="PDF · 1.2 MB"
              href="/style-guide"
            />
          </div>
        </Section>

        <Section number="13" title="Navigation">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="type-body mb-3 font-medium text-neutral-700">Breadcrumbs</h3>
              <Breadcrumbs
                items={[
                  { label: "All Courses", href: "/style-guide" },
                  { label: "Next.js for Production", href: "/style-guide" },
                  { label: "Data Fetching & Caching" },
                ]}
              />
            </div>
            <div>
              <h3 className="type-body mb-3 font-medium text-neutral-700">Pagination</h3>
              <Pagination currentPage={page} totalPages={8} onPageChange={setPage} />
            </div>
          </div>
        </Section>

        <Section number="14" title="Principles">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex flex-col gap-2">
                <Icon size={24} weight="regular" aria-hidden="true" className="text-primary-500" />
                <p className="type-body font-semibold text-neutral-900">{title}</p>
                <p className="type-small text-neutral-500">{description}</p>
              </div>
            ))}
          </div>
        </Section>
      </main>
    </div>
  );
}
