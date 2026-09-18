import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/icons";
import WhatsAppButton from "@/components/WhatsAppButton";
import { photosFor, projects } from "@/lib/projects";

function findProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <Link href="/projects" className="text-sm text-muted hover:text-ink">
        ← All projects
      </Link>
      <h1 className="mt-6 font-serif text-4xl md:text-6xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">{project.summary}</p>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photosFor.project(project.slug).map((photo, i) => (
          <Image
            key={photo.src.src}
            src={photo.src}
            alt={photo.alt}
            placeholder="blur"
            preload={i === 0}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="mb-4 w-full break-inside-avoid rounded-sm"
          />
        ))}
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-8 border-t border-ink/10 pt-10 md:flex-row md:items-center">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl">Want something like this?</h2>
          <WhatsAppButton className="mt-4" message={`Hi, I saw the "${project.title}" project on your website and would like a quote for something similar.`} />
        </div>
        {next !== project && (
          <Link href={`/projects/${next.slug}`} className="inline-flex items-center gap-2 font-medium text-oak-deep hover:underline">
            Next: {next.title} <ArrowIcon />
          </Link>
        )}
      </div>
    </article>
  );
}
