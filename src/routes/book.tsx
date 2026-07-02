import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CalendarCheck, ShieldCheck, Clock, FileCheck } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Inspection — Ottawa Full Spectrum Home Inspection" },
      { name: "description", content: "Request a home inspection in Ottawa. We confirm bookings within 24 hours, often the same day." },
      { property: "og:title", content: "Book Your Home Inspection" },
      { property: "og:description", content: "Request your Ottawa home inspection online." },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: Book,
});

const schema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(40),
  property_address: z.string().trim().min(5).max(300),
  property_type: z.string().max(60).optional(),
  square_footage: z.string().max(40).optional(),
  preferred_date: z.string().optional(),
  preferred_time: z.string().max(40).optional(),
  inspection_type: z.string().max(60).optional(),
  notes: z.string().max(2000).optional(),
});

const INSPECTION_TYPES = ["Pre-Purchase", "Pre-Listing", "New Construction / PDI", "1-Year Tarion Warranty", "Condo / Townhouse", "Other"];
const PROPERTY_TYPES = ["Detached", "Semi-detached", "Townhouse", "Condo / Apartment", "Multi-unit", "Other"];

function Book() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please complete the required fields");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify(parsed.data),
        }
      );
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error ?? "Request failed");
      setDone(true);
      toast.success("Request sent! We'll confirm your slot within 24 hours.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Something went wrong — please call us at (753) 886-3515 or try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Book Inspection"
        title="Schedule your inspection in under two minutes."
        description="Fill in a few details about the property and your preferred date. We'll confirm your slot — usually within a few hours."
      />

      <section className="container-prose py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          {done ? (
            <div className="rounded-2xl bg-card p-10 ring-1 ring-border shadow-elegant">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary/15 text-secondary">
                <CalendarCheck className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl font-semibold">Request received!</h2>
              <p className="mt-2 text-muted-foreground">
                Thanks for reaching out. Khoi will personally review your request and
                confirm your inspection slot within 24 hours by email or phone.
              </p>
              <button
                onClick={() => setDone(false)}
                className="mt-6 inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-2xl bg-card p-8 ring-1 ring-border shadow-soft">
              <h2 className="font-display text-xl font-semibold">Your contact details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Full name *" name="full_name" required maxLength={120} />
                <Field label="Email *" name="email" type="email" required maxLength={255} />
                <Field label="Phone *" name="phone" type="tel" required maxLength={40} />
                <Field label="Inspection type" name="inspection_type" as="select" options={INSPECTION_TYPES} />
              </div>

              <h2 className="mt-8 font-display text-xl font-semibold">About the property</h2>
              <div className="mt-4 grid gap-4">
                <Field label="Property address *" name="property_address" required maxLength={300} placeholder="123 Maple St, Ottawa, ON" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Property type" name="property_type" as="select" options={PROPERTY_TYPES} />
                  <Field label="Approx. square footage" name="square_footage" placeholder="e.g. 1,800" maxLength={40} />
                </div>
              </div>

              <h2 className="mt-8 font-display text-xl font-semibold">When works best?</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Preferred date" name="preferred_date" type="date" />
                <Field label="Preferred time" name="preferred_time" as="select" options={["Morning", "Midday", "Afternoon", "Evening", "Flexible"]} />
              </div>

              <label className="mt-6 block">
                <span className="text-sm font-medium text-foreground">Could you share a few details about the house?</span>
                <textarea
                  name="notes"
                  rows={5}
                  maxLength={2000}
                  placeholder="Realtor name, access details, specific concerns…"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition-colors sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <CalendarCheck className="h-4 w-4" />
                {loading ? "Sending…" : "Request my inspection"}
              </button>
            </form>
          )}

          <aside className="space-y-4 lg:sticky lg:top-24 self-start">
            {[
              { icon: Clock, title: "Quick confirmation", text: "Most requests are confirmed within a few hours during business days." },
              { icon: ShieldCheck, title: "Fully insured & trained", text: "InterNACHI-trained inspector, fully insured, with E&O coverage." },
              { icon: FileCheck, title: "24-hour report", text: "Photo-rich digital report delivered within 24 hours of your inspection." },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl bg-accent/30 p-5 ring-1 ring-border">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <p.icon className="h-4.5 w-4.5" />
                </span>
                <h2 className="mt-3 font-display text-base font-semibold">{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}

type FieldProps = {
  label: string;
  name: string;
  as?: "input" | "select";
  options?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>;

function Field({ label, name, as = "input", options, ...rest }: FieldProps) {
  const cls =
    "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30";
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {as === "select" ? (
        <select name={name} className={cls} defaultValue="">
          <option value="" disabled>Select…</option>
          {options?.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input name={name} {...rest} className={cls} />
      )}
    </label>
  );
}
