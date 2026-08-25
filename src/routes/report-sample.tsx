import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import sampleReportUrl from "@/assets/sample-report.pdf";

export const Route = createFileRoute("/report-sample")({
  head: () => ({
    meta: [
      { title: "Sample Inspection Report — Ottawa Full Spectrum" },
      { name: "description", content: "Scroll through a complete, photo-rich sample inspection report to see exactly what you'll receive after your inspection." },
      { property: "og:title", content: "Sample Inspection Report" },
      { property: "og:description", content: "See exactly what our digital inspection report looks like." },
      { property: "og:url", content: "https://ottawa-full-spectrum-home-inspection.lovable.app/report-sample" },
    ],
    links: [{ rel: "canonical", href: "https://ottawa-full-spectrum-home-inspection.lovable.app/report-sample" }],
  }),
  component: ReportSample,
});

function ReportSample() {
  return (
    <>
      <PageHeader
        eyebrow="Sample"
        title="The kind of report that helps you decide."
        description="Photo-rich, severity-rated, and written in plain English. Scroll through a complete sample report below — this is exactly what arrives in your inbox after your inspection."
      >
        <a
          href={sampleReportUrl}
          download="OFS-Sample-Home-Inspection-Report.pdf"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow"
        >
          <Download className="h-4 w-4" /> Download sample report
        </a>
      </PageHeader>

      <section className="container-prose py-16 md:py-20">
        <div className="rounded-3xl bg-card ring-1 ring-border shadow-elegant overflow-hidden">
          <iframe
            src={sampleReportUrl}
            title="Sample Home Inspection Report — Ottawa Full Spectrum Home Inspection"
            className="block h-[75vh] min-h-[560px] w-full"
          />
        </div>
        <p className="mt-6 text-sm text-muted-foreground italic">
          Can't see the report above?{" "}
          <a href={sampleReportUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">
            Open it in a new tab
          </a>{" "}
          or use the download button.
        </p>
      </section>
    </>
  );
}
