import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "kykhoipham@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function esc(v: unknown): string {
  if (v === undefined || v === null) return "";
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Server not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const full_name = str(body.full_name, 120);
    const email = str(body.email, 255);
    const phone = str(body.phone, 40);
    const property_address = str(body.property_address, 300);
    const property_type = str(body.property_type, 60);
    const square_footage = str(body.square_footage, 40);
    const preferred_date = str(body.preferred_date, 40);
    const preferred_time = str(body.preferred_time, 40);
    const inspection_type = str(body.inspection_type, 60);
    const notes = str(body.notes, 2000);

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !full_name ||
      !email || !emailRe.test(email) ||
      !phone || phone.length < 7 ||
      !property_address || property_address.length < 5
    ) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#1a3a2a;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:#ffffff;margin:0;font-size:20px">🏠 New Inspection Request</h1>
          <p style="color:#a0c4a0;margin:4px 0 0;font-size:14px">${esc(property_address)}</p>
        </div>
        <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:40%">Name</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;font-weight:600">${esc(full_name)}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Email</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${esc(email)}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Phone</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${esc(phone)}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Property Address</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${esc(property_address)}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Property Type</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${esc(property_type) || "N/A"}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Square Footage</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${esc(square_footage) || "N/A"}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Preferred Date</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${esc(preferred_date) || "N/A"}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Preferred Time</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${esc(preferred_time) || "N/A"}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Inspection Type</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${esc(inspection_type) || "N/A"}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;vertical-align:top">Notes</td><td style="padding:8px 0;white-space:pre-wrap">${esc(notes) || "None"}</td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#9ca3af">Sent from ottawafullspectrumhomeinspection.com booking form</p>
        </div>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `🏠 New Inspection Request — ${property_address}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", err);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Edge function error:", e);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
