import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/icons";
import WhatsAppButton from "@/components/WhatsAppButton";
import { photosFor, projects, services } from "@/lib/projects";

function findService(slug: string) {
  return services.find((s) => s.slug === slug);
}

// Only the slugs below exist — also required for the static GitHub Pages export.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const service = findService((await params).slug);
  return service ? { title: service.title, description: service.summary } : {};
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const service = findService((await params).slug);
  if (!service) notFound();

  const gallery = photosFor.service(service.slug).toSorted((a, b) => Number(b.finished) - Number(a.finished));
  const related = projects.filter((p) => photosFor.project(p.slug).some((photo) => photo.service === service.slug));
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <Link href="/#services" className="text-sm text-muted hover:text-ink">
        ← All services
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <h1 className="font-serif text-4xl md:text-6xl">{service.title}</h1>
          <p className="mt-4 text-lg text-muted">{service.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <WhatsAppButton message={`Hi, I'm interested in ${service.title.toLowerCase()} and would like a quote.`} />
            <Link href={`/quote?service=${service.slug}`} className="font-medium text-oak-deep hover:underline">
              Or use the quote form
            </Link>
          </div>
        </div>
        <ul className="grid content-start gap-3 border-t border-ink/10 pt-6 md:col-span-4 md:col-start-9 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          {service.features.map((f) => (
            <li key={f} className="flex gap-3">
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-oak" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {gallery.map((photo, i) => (
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

      {related.length > 0 && (
        <section className="mt-16 border-t border-ink/10 pt-10">
          <h2 className="font-serif text-2xl md:text-3xl">Projects with {service.title.toLowerCase()}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((project) => {
              const cover = photosFor.project(project.slug)[0];
              return (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
                  <div className="overflow-hidden rounded-sm">
                    <Image src={cover.src} alt={cover.alt} placeholder="blur" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <p className="mt-3 inline-flex items-center gap-2 font-medium">
                    {project.title} <ArrowIcon />
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <nav aria-label="Other services" className="mt-16 border-t border-ink/10 pt-10">
        <h2 className="text-sm tracking-wide text-muted uppercase">Other services</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="inline-block rounded-full border border-ink/20 px-4 py-2 text-sm transition-colors hover:border-ink">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
