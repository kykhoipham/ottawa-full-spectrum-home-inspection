import { createFileRoute } from "@tanstack/react-router";
import {
  Home, ClipboardCheck, HardHat, Wrench, Snowflake, Building2,
  Flame, Droplets, Wind, Zap, Bug,
} from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Inspection Services — Ottawa Full Spectrum Home Inspection" },
      { name: "description", content: "Pre-purchase, pre-listing, new construction, PDI, and specialty inspections across Ottawa and the NCR." },
      { property: "og:title", content: "Inspection Services" },
      { property: "og:description", content: "Full-spectrum home inspections for buyers, sellers, and new builds." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

const PRIMARY = [
  { icon: Home, title: "Pre-Purchase Inspection",
    text: "A complete top-to-bottom assessment so you know what you're buying. Includes structural, mechanical, and safety review with photo report.",
    points: ["Roof, attic & insulation", "Foundation & framing", "Electrical, plumbing, HVAC", "Same-day digital report"] },
  { icon: ClipboardCheck, title: "Pre-Listing Inspection",
    text: "Get ahead of buyer surprises. Identify items to repair, disclose, or price around before going to market.",
    points: ["Disclosure-ready report", "Repair priority list", "Optional re-inspection", "Realtor-friendly delivery"] },
  { icon: HardHat, title: "New Construction & PDI",
    text: "Pre-Delivery Inspection, 30-day, and one-year Tarion warranty inspections to protect your investment.",
    points: ["PDI walk-through", "30-day deficiency list", "1-year Tarion review", "Builder follow-up checklist"] },
  { icon: Building2, title: "Condo & Townhouse",
    text: "Unit-focused inspection covering interior systems, balconies, and any in-suite mechanical equipment.",
    points: ["In-suite systems", "Common-element review", "Moisture & finishes", "Status certificate guidance"] },
];

const SPECIALTY = [
  { icon: Flame, label: "Thermal Imaging" },
  { icon: Droplets, label: "Moisture Testing" },
  { icon: Wind, label: "Ventilation & IAQ" },
  { icon: Snowflake, label: "Winter / Vacant Home Checks" },
  { icon: Wrench, label: "Maintenance Inspections" },
  { icon: Zap, label: "Electrical Panel Review" },
  { icon: Bug, label: "Pest Entry-Point Survey" },
];

function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Inspections that cover the full spectrum."
        description="From first-time buyers to seasoned investors, we deliver clear, photo-rich reports tailored to the decision you're about to make."
      />

      <section className="container-prose py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {PRIMARY.map((s) => (
            <article key={s.title} className="rounded-2xl bg-card p-8 ring-1 ring-border shadow-soft transition-shadow hover:shadow-elegant">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-forest text-primary-foreground">
                <s.icon className="h-5.5 w-5.5" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">{s.title}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.text}</p>
              <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-1.5 text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary shrink-0" />{p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">Add-ons & specialty</p>
          <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold">Specialty services available on request.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {SPECIALTY.map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-xl bg-muted/50 p-4 ring-1 ring-border">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/40 text-primary">
                  <s.icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
