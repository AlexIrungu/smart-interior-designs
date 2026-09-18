import Image from "next/image";
import Link from "next/link";
import samson from "@/assets/about/41-samson.jpg";
import { ArrowIcon } from "@/components/icons";
import WhatsAppButton from "@/components/WhatsAppButton";
import { photos, photosFor, projects, services } from "@/lib/projects";
import { site } from "@/lib/site";

const hero = photos.find((p) => p.project === "oak-island-kitchen" && p.finished)!;

// TODO(samson): confirm these match how Samson actually works (site visit free? design drawings? quote turnaround?)
const steps = [
  { title: "Site visit & measure", body: "We come to you, take exact measurements and talk through how you use the room." },
  { title: "Design & quote", body: "You get a layout, finish options and a clear quote before any work starts." },
  { title: "Build", body: "Carcasses, doors and drawers are cut and assembled to your measurements." },
  { title: "Install & handover", body: "We fit everything on site and adjust every door and drawer until it runs true." },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 md:grid-cols-2 md:gap-16 md:px-6 md:pt-16 md:pb-24">
        <div>
          <p className="text-sm tracking-wide text-oak-deep uppercase">Custom joinery · {site.location}</p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.1] text-balance md:text-6xl">
            Kitchens, wardrobes &amp; TV walls, built to fit your home.
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">
            {site.name} plans, builds and installs custom cabinetry — measured to your room and fitted by {site.owner} and the team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton />
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-medium transition-colors hover:border-ink"
            >
              See our work
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-sm">
          <Image src={hero.src} alt={hero.alt} placeholder="blur" preload sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5] w-full object-cover" />
        </div>
      </section>

      <section id="services" className="scroll-mt-20 bg-stone py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="font-serif text-3xl md:text-4xl">What we build</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const all = photosFor.service(service.slug);
              const cover = all.find((p) => p.finished) ?? all[0];
              return (
                <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                  <div className="overflow-hidden rounded-sm">
                    <Image src={cover.src} alt={cover.alt} placeholder="blur" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                  <p className="mt-4 text-sm text-oak-deep">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 inline-flex items-center gap-2 font-serif text-2xl">
                    {service.title} <ArrowIcon className="size-5 transition-transform group-hover:translate-x-1" />
                  </h3>
                  <p className="mt-2 text-muted">{service.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 md:px-6 md:py-24">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-3xl md:text-4xl">Recent work</h2>
          <Link href="/projects" className="inline-flex shrink-0 items-center gap-2 font-medium text-oak-deep hover:underline">
            See all projects <ArrowIcon />
          </Link>
        </div>
        <div className="mt-10 grid gap-12">
          {projects.map((project, i) => {
            const [cover, ...rest] = photosFor.project(project.slug);
            return (
              <article key={project.slug} className="grid items-center gap-6 md:grid-cols-12">
                <Link href={`/projects/${project.slug}`} className={`overflow-hidden rounded-sm md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                  <Image src={cover.src} alt={cover.alt} placeholder="blur" sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.02]" />
                </Link>
                <div className="md:col-span-5">
                  <h3 className="font-serif text-2xl md:text-3xl">{project.title}</h3>
                  <p className="mt-3 text-muted">{project.summary}</p>
                  <p className="mt-3 text-sm text-muted">{rest.length + 1} photos</p>
                  <Link href={`/projects/${project.slug}`} className="mt-6 inline-flex items-center gap-2 font-medium text-oak-deep hover:underline">
                    View project <ArrowIcon />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="process" className="scroll-mt-20 bg-ink py-16 text-paper md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">How we work</h2>
            <ol className="mt-10 grid gap-8">
              {steps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-2">
                  <span className="font-serif text-2xl text-stone/60">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-lg font-medium">{step.title}</h3>
                    <p className="mt-1 text-stone/80">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <video
            className="aspect-[9/16] max-h-[36rem] w-full rounded-sm object-cover md:justify-self-end"
            src="/video/installing-loop.mp4"
            poster="/video/installing-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${site.owner} fitting wardrobe doors on site`}
          />
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-6xl scroll-mt-20 items-center gap-10 px-4 py-16 md:grid-cols-12 md:px-6 md:py-24">
        <div className="overflow-hidden rounded-sm md:col-span-5">
          <Image src={samson} alt={`${site.owner} of ${site.name}`} placeholder="blur" sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5] w-full object-cover" />
        </div>
        {/* TODO(samson): replace with the real story — years in the trade, team size, areas served */}
        <div className="md:col-span-6 md:col-start-7">
          <h2 className="font-serif text-3xl md:text-4xl">Meet {site.owner}</h2>
          <p className="mt-6 text-lg text-muted">
            {site.name} is run by {site.owner}. {site.owner} and the team measure, build and fit every kitchen, wardrobe and TV wall themselves — so the person you talk to is the person doing the work.
          </p>
        </div>
      </section>

      <section id="quote" className="scroll-mt-20 bg-stone py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="font-serif text-3xl md:text-5xl">Tell us about your room</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Send a photo of the space and rough measurements on WhatsApp, and we&apos;ll come back to you with ideas and a quote.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
            <WhatsAppButton />
            <Link href="/quote" className="font-medium text-oak-deep hover:underline">
              Or fill in the quote form
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
