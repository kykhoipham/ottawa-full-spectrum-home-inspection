import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Ottawa Full Spectrum Home Inspection" },
      { name: "description", content: "Get in touch with Khoi Pham at Ottawa Full Spectrum Home Inspection. Call, email, or send a message." },
      { property: "og:title", content: "Contact Us" },
      { property: "og:description", content: "Reach out to book an inspection or ask a question." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Ottawa Full Spectrum Home Inspection",
          image: "https://www.ottawafullspectrumhomeinspection.com/logo.png",
          telephone: "+1-753-886-3515",
          email: "khoipham@ottawafullspectrumhomeinspection.com",
          url: "https://www.ottawafullspectrumhomeinspection.com/",
          address: {
            "@type": "PostalAddress",
            streetAddress: "29 Cremona Crest",
            addressLocality: "Ottawa",
            addressRegion: "ON",
            addressCountry: "CA",
          },
          areaServed: "Ottawa and the National Capital Region",
          priceRange: "$$",
        }),
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Please enter a message").max(4000),
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      full_name: String(fd.get("full_name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
    };
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_messages").insert({
        full_name: parsed.data.full_name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        subject: parsed.data.subject || null,
        message: parsed.data.message,
      });
      if (error) throw error;

      const subject = `Contact from ${parsed.data.full_name}${parsed.data.subject ? " — " + parsed.data.subject : ""}`;
      const body = [
        `Name: ${parsed.data.full_name}`,
        `Email: ${parsed.data.email}`,
        `Phone: ${parsed.data.phone || "N/A"}`,
        `Subject: ${parsed.data.subject || "N/A"}`,
        "",
        "Message:",
        parsed.data.message,
      ].join("\n");

      toast.success("Message saved! Opening your email to forward a copy to Khoi.");
      form.reset();
      window.location.href = `mailto:khoipham@ottawafullspectrumhomeinspection.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } catch (err) {
      console.error(err);
      toast.error("Sorry — we couldn't save your message. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch with Khoi."
        description="Have a quick question, need a quote, or want to chat about a specific property? Reach out and you'll usually hear back the same day."
      />

      <section className="container-prose py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          <aside className="space-y-6">
            <ContactCard icon={Phone} title="Call or text" body={<a className="hover:text-primary" href="tel:+17538863515">(753) 886-3515</a>} note="Mon–Sat, 7am – 8pm ET" />
            <ContactCard icon={Mail} title="Email" body={<a className="hover:text-primary break-all" href="mailto:khoipham@ottawafullspectrumhomeinspection.com">khoipham@ottawafullspectrumhomeinspection.com</a>} note="Replies within 1 business day" />
            <ContactCard icon={MapPin} title="Service area" body="Ottawa, Kanata, Orleans, Barrhaven, Nepean, Stittsville, Gatineau & surrounding NCR." note="29 Cremona Crest, Ottawa, ON" />
          </aside>

          <form onSubmit={onSubmit} className="rounded-2xl bg-card p-8 ring-1 ring-border shadow-soft">
            <h2 className="font-display text-2xl font-semibold">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">All fields marked with * are required.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name *" name="full_name" required maxLength={120} />
              <Field label="Email *" name="email" type="email" required maxLength={255} />
              <Field label="Phone" name="phone" type="tel" maxLength={40} />
              <Field label="Subject" name="subject" maxLength={200} />
            </div>

            <label className="mt-4 block">
              <span className="text-sm font-medium text-foreground">Message *</span>
              <textarea
                name="message"
                required
                maxLength={4000}
                rows={6}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm shadow-xs outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-glow transition-colors disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon: Icon, title, body, note }: { icon: any; title: string; body: React.ReactNode; note?: string }) {
  return (
    <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/40 text-primary">
        <Icon className="h-4.5 w-4.5" />
      </span>
      <h2 className="mt-4 font-display text-lg font-semibold">{title}</h2>
      <div className="mt-1 text-foreground">{body}</div>
      {note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        {...rest}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm shadow-xs outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}
