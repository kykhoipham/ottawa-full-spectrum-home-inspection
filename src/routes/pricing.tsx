import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Ottawa Full Spectrum Home Inspection" },
      { name: "description", content: "Transparent home inspection pricing for Ottawa homes, condos, and new construction. All reports delivered same day." },
      { property: "og:title", content: "Home Inspection Pricing" },
      { property: "og:description", content: "Flat-rate pricing based on square footage. No hidden fees." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Pricing,
});

const TIERS = [
  {
    name: "Condo / Townhome",
    range: "Up to 1,500 sq ft",
    price: "$425",
    desc: "Best for condominium units, stacked towns, and smaller townhomes.",
    features: ["Full in-suite inspection", "Common-element observations", "Photo report same day", "30-minute walk-through call"],
  },
  {
    name: "Standard Home",
    range: "1,500 – 2,500 sq ft",
    price: "$525",
    popular: true,
    desc: "Our most common inspection — single-family detached or larger townhome.",
    features: ["150-point full inspection", "Thermal imaging included", "Moisture meter testing", "Annotated digital report"],
  },
  {
    name: "Large / Custom",
    range: "2,500+ sq ft",
    price: "from $650",
    desc: "Larger detached homes, custom builds, and properties with additional structures.",
    features: ["Extended inspection time", "Outbuildings & garage", "Detached structures", "Detailed major-systems review"],
  },
];

const ADDONS = [
  { name: "Thermal imaging (extended)", price: "$95" },
  { name: "Pre-Delivery Inspection (PDI)", price: "$450" },
  { name: "1-Year Tarion warranty inspection", price: "$525" },
  { name: "Re-inspection of repairs", price: "$175" },
  { name: "Rural / outside NCR travel", price: "$0.75/km" },
  { name: "Vacant / winterized home check", price: "$225" },
];

function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Flat-rate pricing. Same-day reports."
        description="Inspection fees are based on the size and complexity of the property. Final pricing is confirmed when you book — never any hidden charges."
      />

      <section className="container-prose py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl p-8 ring-1 transition-shadow ${
                t.popular
                  ? "bg-gradient-forest text-primary-foreground ring-primary shadow-elegant"
                  : "bg-card text-foreground ring-border shadow-soft hover:shadow-elegant"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground uppercase tracking-wider">
                  Most booked
                </span>
              )}
              <h2 className="font-display text-2xl font-semibold">{t.name}</h2>
              <p className={`mt-1 text-sm ${t.popular ? "text-cream/75" : "text-muted-foreground"}`}>{t.range}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">{t.price}</span>
                <span className={`text-sm ${t.popular ? "text-cream/70" : "text-muted-foreground"}`}>+ HST</span>
              </div>
              <p className={`mt-3 text-sm leading-relaxed ${t.popular ? "text-cream/85" : "text-muted-foreground"}`}>{t.desc}</p>

              <ul className="mt-6 space-y-2.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.popular ? "text-cream" : "text-secondary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/book"
                className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  t.popular
                    ? "bg-cream text-primary"
                    : "bg-primary text-primary-foreground hover:bg-primary-glow"
                }`}
              >
                Book this inspection
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl font-semibold">Add-ons & specialty services</h2>
          <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-border bg-card">
            <table className="w-full text-sm">
              <tbody>
                {ADDONS.map((a, i) => (
                  <tr key={a.name} className={i % 2 ? "bg-muted/40" : ""}>
                    <td className="px-6 py-4 text-foreground">{a.name}</td>
                    <td className="px-6 py-4 text-right font-display font-semibold text-primary">{a.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            All prices in CAD and exclude HST. A custom quote is provided for properties over 4,000 sq ft, log homes, and historic buildings.
          </p>
        </div>
      </section>
    </>
  );
}
