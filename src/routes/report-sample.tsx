import { createFileRoute } from "@tanstack/react-router";
import { FileText, Camera, CheckCircle2, AlertTriangle, Info, Mail } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/report-sample")({
  head: () => ({
    meta: [
      { title: "Sample Inspection Report — Ottawa Full Spectrum" },
      { name: "description", content: "Preview the kind of detailed, photo-rich inspection report you'll receive after your inspection." },
      { property: "og:title", content: "Sample Inspection Report" },
      { property: "og:description", content: "See exactly what our digital inspection report looks like." },
      { property: "og:url", content: "/report-sample" },
    ],
    links: [{ rel: "canonical", href: "/report-sample" }],
  }),
  component: ReportSample,
});

const FINDINGS = [
  { sev: "major", icon: AlertTriangle, area: "Roof — South Slope",
    text: "Asphalt shingles show granule loss and three lifted tabs near the chimney flashing. Active water staining observed in attic sheathing directly below.",
    rec: "Recommend evaluation and repair by a qualified roofer within 30 days." },
  { sev: "monitor", icon: Info, area: "Basement — Northwest Corner",
    text: "Minor efflorescence on poured concrete wall. No active moisture detected at time of inspection.",
    rec: "Monitor seasonally. Improve exterior grading to direct water away from foundation." },
  { sev: "minor", icon: CheckCircle2, area: "Kitchen — GFCI Protection",
    text: "Two countertop receptacles not GFCI protected. Current code requires GFCI within 1.5m of kitchen sink.",
    rec: "Replace with GFCI receptacles. Licensed electrician recommended." },
];

const sevStyle = {
  major: "bg-destructive/10 text-destructive ring-destructive/20",
  monitor: "bg-secondary/15 text-secondary ring-secondary/25",
  minor: "bg-accent/40 text-primary ring-accent/40",
} as const;

function ReportSample() {
  return (
    <>
      <PageHeader
        eyebrow="Sample Report"
        title="The kind of report that helps you decide."
        description="Photo-rich, severity-rated, and written in plain English. Here's a slice of what arrives in your inbox the same day as your inspection."
      >
        <a
          href="mailto:khoipham@ottawafullspectrumhomeinspection.com?subject=Request%20Full%20Sample%20Report"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow"
        >
          <Mail className="h-4 w-4" /> Request full sample PDF
        </a>
      </PageHeader>

      <section className="container-prose py-16 md:py-20">
        <div className="rounded-3xl bg-card ring-1 ring-border shadow-elegant overflow-hidden">
          {/* Report cover */}
          <div className="bg-gradient-forest p-8 md:p-12 text-primary-foreground">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cream/70">Property Inspection Report</p>
                <h2 className="mt-2 font-display text-3xl font-semibold">123 Main Street, Ottawa</h2>
                <p className="mt-1 text-cream/80">Inspection date: March 20, 2026 · Report #OFS-2026-0020</p>
              </div>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cream/15">
                <FileText className="h-5 w-5" />
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { l: "Year built", v: "2001" },
                { l: "Sq ft", v: "2,200" },
                { l: "Bedrooms", v: "4" },
                { l: "Inspection time", v: "3h 20m" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-cream/10 p-4 ring-1 ring-cream/15">
                  <div className="text-xs uppercase tracking-wider text-cream/60">{s.l}</div>
                  <div className="mt-1 font-display text-xl font-semibold">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary findings */}
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-display text-2xl font-semibold">Summary of Findings</h2>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                {(["major","monitor","minor"] as const).map((k) => (
                  <span key={k} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ring-1 ${sevStyle[k]}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {k === "major" ? "Major repair" : k === "monitor" ? "Monitor" : "Minor / safety"}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {FINDINGS.map((f, idx) => (
                <article key={idx} className="rounded-2xl border border-border p-6 bg-background">
                  <div className="flex items-start gap-4">
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ring-1 ${sevStyle[f.sev as keyof typeof sevStyle]}`}>
                      <f.icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="font-display text-lg font-semibold">{f.area}</h3>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Finding #{idx + 1}</span>
                      </div>
                      <p className="mt-2 text-foreground leading-relaxed">{f.text}</p>
                      <div className="mt-3 rounded-lg bg-muted/60 p-3 text-sm">
                        <span className="font-semibold text-primary">Recommendation: </span>
                        <span className="text-muted-foreground">{f.rec}</span>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <Camera className="h-3.5 w-3.5" /> 3 annotated photos in full report
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-8 text-sm text-muted-foreground italic">
              This is an excerpt. Full reports include 80–120 findings across 14 categories,
              annotated photos, repair priority guidance, and a summary call from the inspector.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
