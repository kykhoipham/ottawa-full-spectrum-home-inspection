import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Mail } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/report-sample")({
  head: () => ({
    meta: [
      { title: "Sample Inspection Report — Ottawa Full Spectrum" },
      { name: "description", content: "View a real sample home inspection report from OFS Home Inspection — photo-rich, severity-rated, and written in plain English." },
      { property: "og:title", content: "Sample Inspection Report" },
      { property: "og:description", content: "See exactly what our digital inspection report looks like." },
      { property: "og:url", content: "https://ottawa-full-spectrum-home-inspection.lovable.app/report-sample" },
    ],
    links: [{ rel: "canonical", href: "https://ottawa-full-spectrum-home-inspection.lovable.app/report-sample" }],
  }),
  component: ReportSample,
});

const TOTAL_PAGES = 14;
const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return { src: `/report-pages/page-${n}.jpg`, page: i + 1 };
});

const TARION_TOTAL_PAGES = 7;
const TARION_PAGES = Array.from({ length: TARION_TOTAL_PAGES }, (_, i) => ({
  src: `/tarion-report-pages/page-${i + 1}.jpg`,
  page: i + 1,
}));

function ReportSample() {
  return (
    <>
      <PageHeader
        eyebrow="Sample Report"
        title="The kind of report that helps you decide."
        description="Photo-rich and written in plain English. Scroll through a real sample report below — this is what arrives in your inbox after your inspection."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="/sample-inspection-report.pdf"
            download="OFS-Sample-Home-Inspection-Report.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow"
          >
            <Download className="h-4 w-4" /> Download sample PDF
          </a>
          <a
            href="mailto:info@OFShomeinspection.com?subject=Request%20Full%20Sample%20Report"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <Mail className="h-4 w-4" /> Ask a question
          </a>
        </div>
      </PageHeader>

      <section className="container-prose py-16 md:py-20">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-display text-2xl font-semibold inline-flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> Full sample report
          </h2>
          <span className="text-sm text-muted-foreground">{TOTAL_PAGES} pages · scroll to view</span>
        </div>

        <div className="mt-8 space-y-6">
          {PAGES.map((p) => (
            <figure
              key={p.page}
              className="overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-elegant"
            >
              <img
                src={p.src}
                alt={`Sample inspection report — page ${p.page} of ${TOTAL_PAGES}`}
                width={935}
                height={1210}
                loading={p.page <= 2 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-auto"
              />
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-muted/50 p-8 text-center ring-1 ring-border">
          <p className="text-sm text-muted-foreground italic max-w-xl">
            This is a real sample report with identifying details removed. Your report will include
            annotated photos, repair priority guidance, and a summary call from the inspector.
          </p>
          <a
            href="/sample-inspection-report.pdf"
            download="OFS-Sample-Home-Inspection-Report.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow"
          >
            <Download className="h-4 w-4" /> Download the full PDF
          </a>
        </div>
      </section>
    </>
  );
}
