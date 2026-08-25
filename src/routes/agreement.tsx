import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Download } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/agreement")({
  head: () => ({
    meta: [
      { title: "Inspection Agreement — Ottawa Full Spectrum Home Inspection" },
      { name: "description", content: "Read the standard pre-inspection agreement outlining the scope, limitations, and terms of service." },
      { property: "og:title", content: "Inspection Agreement" },
      { property: "og:description", content: "Read our standard inspection agreement and terms of service." },
      { property: "og:url", content: "https://ottawa-full-spectrum-home-inspection.lovable.app/agreement" },
    ],
    links: [{ rel: "canonical", href: "https://ottawa-full-spectrum-home-inspection.lovable.app/agreement" }],
  }),
  component: Agreement,
});

const TOTAL_PAGES = 2;
const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  src: `/agreement-pages/page-${i + 1}.jpg`,
  page: i + 1,
}));

function Agreement() {
  return (
    <>
      <PageHeader
        eyebrow="Pre-Inspection Agreement"
        title="Clear terms. No surprises."
        description="Below is the standard agreement signed before every inspection. Scroll to read it in full — a copy is sent for digital signature once your booking is confirmed."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="/home-inspection-agreement.pdf"
            download="OFS-Home-Inspection-Agreement.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow"
          >
            <Download className="h-4 w-4" /> Download agreement PDF
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
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h2 className="font-display text-2xl font-semibold inline-flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" /> Home Inspection Agreement
          </h2>
          <span className="text-sm text-muted-foreground">{TOTAL_PAGES} pages · scroll to read</span>
        </div>

        <div className="mt-8 space-y-6">
          {PAGES.map((p) => (
            <figure
              key={p.page}
              className="overflow-hidden rounded-2xl bg-card ring-1 ring-border shadow-elegant"
            >
              <img
                src={p.src}
                alt={`Home Inspection Agreement — page ${p.page} of ${TOTAL_PAGES}`}
                width={935}
                height={1210}
                loading={p.page === 1 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-auto"
              />
            </figure>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-muted/50 p-8 text-center ring-1 ring-border">
          <p className="text-sm text-muted-foreground italic max-w-xl">
            The signed agreement governs the legal relationship between the Inspector and the Client.
            Jurisdiction: Ontario, Canada.
          </p>
          <a
            href="/home-inspection-agreement.pdf"
            download="OFS-Home-Inspection-Agreement.pdf"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow"
          >
            <Download className="h-4 w-4" /> Download the agreement
          </a>
        </div>
      </section>
    </>
  );
}
