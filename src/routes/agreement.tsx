import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/agreement")({
  head: () => ({
    meta: [
      { title: "Inspection Agreement — Ottawa Full Spectrum Home Inspection" },
      { name: "description", content: "Standard pre-inspection agreement outlining the scope, limitations, and terms of service." },
      { property: "og:title", content: "Inspection Agreement" },
      { property: "og:description", content: "Read our standard inspection agreement and terms of service." },
      { property: "og:url", content: "/agreement" },
    ],
    links: [{ rel: "canonical", href: "/agreement" }],
  }),
  component: Agreement,
});

const SECTIONS = [
  {
    h: "1. Scope of Inspection",
    p: "Ottawa Full Spectrum Home Inspection ('Inspector') will perform a visual, non-invasive inspection of the readily accessible components of the property identified by the Client. The inspection is conducted in general accordance with the InterNACHI Standards of Practice and applicable Ontario legislation.",
  },
  {
    h: "2. Systems & Components Covered",
    p: "Roof and exterior, structural components, electrical service and panel, plumbing supply and drainage, HVAC systems, interior finishes, insulation, ventilation, and built-in appliances. Items concealed by finishes, stored items, or weather conditions are excluded.",
  },
  {
    h: "3. Limitations",
    p: "This inspection is not technically exhaustive and does not constitute a warranty, guarantee, or insurance policy. The Inspector does not test for code compliance, mould, asbestos, radon, lead, pests, septic, or buried tanks unless contracted separately. Cosmetic deficiencies are noted only when significant.",
  },
  {
    h: "4. Report Delivery",
    p: "A written digital report including photographs and findings will be delivered to the Client within 24 hours of the inspection, typically the same day. The report is for the sole use of the named Client and may not be transferred without written consent.",
  },
  {
    h: "5. Payment & Cancellation",
    p: "Payment is due upon completion of the inspection unless otherwise arranged. Cancellations made less than 24 hours before the scheduled time may be subject to a $100 administrative fee.",
  },
  {
    h: "6. Limitation of Liability",
    p: "The Client agrees that the maximum liability of the Inspector, regardless of cause, is limited to the fee paid for the inspection. The Inspector is not liable for repairs, replacements, or consequential damages.",
  },
  {
    h: "7. Dispute Resolution",
    p: "Any dispute arising out of this agreement shall first be submitted to mediation. The Client agrees to notify the Inspector in writing of any concerns within 14 days of report delivery and prior to any repair, alteration, or replacement of the item in question.",
  },
];

function Agreement() {
  return (
    <>
      <PageHeader
        eyebrow="Pre-Inspection Agreement"
        title="Clear terms. No surprises."
        description="Below is the standard agreement signed before every inspection. A copy is sent for digital signature once your booking is confirmed."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:khoipham@ottawafullspectrumhomeinspection.com?subject=Request%20Inspection%20Agreement%20PDF"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow"
          >
            <Download className="h-4 w-4" /> Request PDF copy
          </a>
          <Link
            to="/book"
            className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Book inspection
          </Link>
        </div>
      </PageHeader>

      <section className="container-prose py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <aside className="lg:sticky lg:top-24 self-start rounded-2xl bg-accent/30 p-6 ring-1 ring-border">
            <FileText className="h-6 w-6 text-primary" />
            <p className="mt-4 text-sm text-foreground leading-relaxed">
              This page is a plain-language summary. The signed agreement governs
              the legal relationship between the Inspector and the Client.
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Effective</dt>
                <dd className="font-medium">Updated 2026</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Jurisdiction</dt>
                <dd className="font-medium">Ontario, Canada</dd>
              </div>
            </dl>
          </aside>

          <div className="space-y-8">
            {SECTIONS.map((s) => (
              <article key={s.h}>
                <h2 className="font-display text-xl font-semibold text-foreground">{s.h}</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">{s.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
