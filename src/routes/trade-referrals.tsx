import { createFileRoute } from "@tanstack/react-router";
import { Hammer, Plug, Droplet, Flame, PaintRoller, Trees, Wrench, Bug, HardHat, Phone, Mail } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/trade-referrals")({
  head: () => ({
    meta: [
      { title: "Trade Referrals — Ottawa Full Spectrum Home Inspection" },
      { name: "description", content: "A vetted list of local Ottawa-area trades — roofers, plumbers, electricians, HVAC techs — we trust to fix inspection findings." },
      { property: "og:title", content: "Trade Referrals" },
      { property: "og:description", content: "Trusted local trades to handle your inspection findings." },
      { property: "og:url", content: "/trade-referrals" },
    ],
    links: [{ rel: "canonical", href: "/trade-referrals" }],
  }),
  component: TradeReferrals,
});

const TRADES = [
  { icon: Hammer, name: "Roofing", text: "Asphalt, metal, flat-roof specialists and emergency leak repair across the NCR." },
  { icon: Plug, name: "Electrical", text: "Licensed ECRA/ESA contractors for panel upgrades, knob-and-tube replacement, and rewiring." },
  { icon: Droplet, name: "Plumbing", text: "Licensed plumbers for repairs, water heater replacement, drain cleaning, and lead-pipe replacement." },
  { icon: Flame, name: "HVAC", text: "TSSA-certified furnace, AC, and heat pump installers including ductwork and IAQ." },
  { icon: PaintRoller, name: "Painting & Finishes", text: "Interior and exterior painters who treat your home like their own." },
  { icon: Trees, name: "Landscaping & Grading", text: "Grading, drainage, and tree removal crews to keep water away from foundations." },
  { icon: Wrench, name: "General Contracting", text: "Renovation contractors for kitchens, baths, basements, and additions." },
  { icon: Bug, name: "Pest Control", text: "Licensed pest control for rodents, ants, wasps, and bed bugs." },
  { icon: HardHat, name: "Foundation & Waterproofing", text: "Crack injection, weeping tile, and interior/exterior basement waterproofing." },
];

function TradeReferrals() {
  return (
    <>
      <PageHeader
        eyebrow="Trade Referrals"
        title="Local trades we trust with our own homes."
        description="Findings are only useful if you know who can fix them. Below is the network of Ottawa-area trades we recommend to clients — vetted for quality, fair pricing, and follow-through."
      />

      <section className="container-prose py-16 md:py-20">
        <div className="rounded-2xl bg-accent/30 ring-1 ring-border p-6 md:p-8 mb-12">
          <p className="text-sm text-foreground leading-relaxed">
            <strong className="font-semibold">How referrals work:</strong> We don't take
            kickbacks. These are trades we've worked alongside, watched on job sites, and
            had clients return positive feedback on. We'll share specific contact details
            after your inspection, matched to your findings.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TRADES.map((t) => (
            <article key={t.name} className="rounded-2xl bg-card p-6 ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-elegant">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/40 text-primary">
                <t.icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">{t.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-forest p-8 md:p-12 text-primary-foreground shadow-elegant">
          <h2 className="font-display text-2xl md:text-3xl font-semibold">Need a referral right now?</h2>
          <p className="mt-3 text-cream/85 max-w-xl">
            Already had your inspection elsewhere or facing an urgent issue? Reach out
            and we'll connect you with the right trade in our network.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="tel:+17538863515" className="inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-primary hover:-translate-y-0.5 transition-transform">
              <Phone className="h-4 w-4" /> (753) 886-3515
            </a>
            <a href="mailto:khoipham@ottawafullspectrumhomeinspection.com" className="inline-flex items-center gap-2 rounded-full border border-cream/30 bg-cream/10 px-6 py-3 text-sm font-semibold text-cream hover:bg-cream/20">
              <Mail className="h-4 w-4" /> Email Khoi
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
