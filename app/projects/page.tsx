import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import WhatsAppButton from "@/components/WhatsAppButton";
import { photos, photosFor, projects, services } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Kitchens, wardrobes, TV walls and more, built and installed by ${site.name}.`,
};

export default function WorkPage() {
  const loose = services
    .map((service) => ({
      service,
      photos: photos
        .filter((p) => p.service === service.slug && !p.project)
        .toSorted((a, b) => Number(b.finished) - Number(a.finished)),
    }))
    .filter((group) => group.photos.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="font-serif text-4xl md:text-6xl">Projects</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Every piece is made to measure for the room it&apos;s in. Start with a full project, or browse by what you&apos;re planning.
      </p>

      <section className="mt-12">
        <h2 className="sr-only">Projects</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const all = photosFor.project(project.slug);
            return (
              <Link key={project.slug} href={`/projects/${project.slug}`} className="group">
                <div className="overflow-hidden rounded-sm">
                  <Image
                    src={all[0].src}
                    alt={all[0].alt}
                    placeholder="blur"
                    preload={i === 0}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <h3 className="mt-4 inline-flex items-center gap-2 font-serif text-2xl">
                  {project.title} <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
                </h3>
                <p className="mt-2 text-muted">{project.summary}</p>
                <p className="mt-2 text-sm text-muted">{all.length} photos</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-20 border-t border-ink/10 pt-12">
        <h2 className="font-serif text-3xl md:text-4xl">More of our work</h2>
        {loose.map(({ service, photos: group }) => (
          <div key={service.slug} className="mt-12">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-2xl">{service.title}</h3>
              <Link href={`/services/${service.slug}`} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-oak-deep hover:underline">
                About {service.title.toLowerCase()} <ArrowIcon />
              </Link>
            </div>
            <div className="mt-6 columns-2 gap-4 lg:columns-4">
              {group.map((photo) => (
                <Image
                  key={photo.src.src}
                  src={photo.src}
                  alt={photo.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="mb-4 w-full break-inside-avoid rounded-sm"
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-20 rounded-sm bg-stone px-6 py-12 text-center md:py-16">
        <h2 className="font-serif text-3xl md:text-4xl">Planning something similar?</h2>
        <div className="mt-8 flex flex-col items-center gap-4">
          <WhatsAppButton />
          <Link href="/quote" className="font-medium text-oak-deep hover:underline">
            Or fill in the quote form
          </Link>
        </div>
      </section>
    </div>
  );
}
