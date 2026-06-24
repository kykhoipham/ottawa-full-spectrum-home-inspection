import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Camera,
  ClipboardList,
  Home as HomeIcon,
  Clock,
  Star,
  ArrowRight,
  CheckCircle2,
  Phone,
} from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import inspectorWorking from "@/assets/inspector-working.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ottawa Full Spectrum Home Inspection — Trusted Inspector" },
      {
        name: "description",
        content:
          "Pre-purchase, pre-listing, and new construction home inspections across Ottawa and the National Capital Region. Detailed reports, same-day delivery.",
      },
      { property: "og:title", content: "Ottawa Full Spectrum Home Inspection" },
      {
        property: "og:description",
        content:
          "Detail-driven home inspections in Ottawa. Honest reporting, clear photos, answers you can use.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroHome}
            alt="Beautiful Ottawa home at golden hour"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-overlay" />
        </div>

        <div className="relative container-prose py-28 md:py-40">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-cream/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cream backdrop-blur-sm ring-1 ring-cream/20">
            <ShieldCheck className="h-3.5 w-3.5" /> Ottawa · NCR · Eastern Ontario
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream text-balance max-w-3xl leading-[1.05]">
            See the whole picture before you sign.
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl text-cream/85 leading-relaxed">
            Full-spectrum home inspections that catch what listing photos miss —
            from foundation to roofline, with photo-rich reports delivered the same day.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-primary shadow-elegant transition-transform hover:-translate-y-0.5"
            >
              Book Your Inspection <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+17538863515"
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 bg-cream/10 px-7 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm transition-colors hover:bg-cream/20"
            >
              <Phone className="h-4 w-4" /> (753) 886-3515
            </a>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {[
              { k: "500+", v: "Homes inspected" },
              { k: "24 hr", v: "Report turnaround" },
              { k: "150+", v: "Inspection points" },
              { k: "5.0★", v: "Client rating" },
            ].map((s) => (
              <div key={s.v} className="border-l-2 border-cream/30 pl-4">
                <div className="font-display text-2xl md:text-3xl font-bold text-cream">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-cream/70">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container-prose py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              Why Full Spectrum
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold text-balance">
              A meticulous eye, paired with a plain-language report.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Every inspection follows a 150-point checklist covering structure,
              roofing, plumbing, electrical, HVAC, insulation, and more. You'll get
              a digital report with photos, severity ratings, and recommended next
              steps — emailed the same day.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "InterNACHI-trained, fully insured inspector",
                "Thermal imaging & moisture testing included",
                "Same-day digital report with annotated photos",
                "Phone walk-through of findings after every job",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-secondary shrink-0" />
                  <span className="text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <img
              src={inspectorWorking}
              alt="Home inspector walking through findings with a client"
              width={1280}
              height={960}
              loading="lazy"
              className="rounded-2xl shadow-elegant aspect-[4/3] object-cover w-full"
            />
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-card p-5 shadow-elegant ring-1 ring-border max-w-xs">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="mt-2 text-sm text-foreground italic">
                "Khoi caught a roof issue our realtor missed. Saved us thousands."
              </p>
              <p className="mt-2 text-xs text-muted-foreground">— Sarah & Mark, Kanata</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-muted/40 py-20 md:py-24">
        <div className="container-prose">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
                What we inspect
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold">
                Services for every stage of the journey.
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
            >
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: HomeIcon, title: "Pre-Purchase", text: "Know exactly what you're buying before you waive conditions." },
              { icon: ClipboardList, title: "Pre-Listing", text: "Sell with confidence by fixing surprises before they hit the MLS." },
              { icon: Camera, title: "New Construction", text: "Pre-delivery, one-year warranty, and PDI walk-through inspections." },
              { icon: Clock, title: "Maintenance Check", text: "Annual health checks to keep small issues from becoming big ones." },
            ].map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl bg-card p-6 ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/40 text-primary">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-prose py-20 md:py-28">
        <div className="overflow-hidden rounded-3xl bg-gradient-forest p-10 md:p-16 shadow-elegant">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-cream text-balance">
              Ready for a home inspection done right?
            </h2>
            <p className="mt-4 text-cream/85 text-lg">
              Most inspections book within 48 hours. Tell us about the property and
              we'll confirm your slot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
              >
                Book Inspection <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center rounded-full border border-cream/30 bg-cream/10 px-7 py-3.5 text-sm font-semibold text-cream backdrop-blur-sm hover:bg-cream/20"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
