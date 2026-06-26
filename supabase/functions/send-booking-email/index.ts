import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = "re_V8J91Cr3_3mJuqVjkdVUjfo1yh1Rzffa2";
const TO_EMAIL = "khoipham@ottawafullspectrumhomeinspection.com";
const FROM_EMAIL = "onboarding@resend.dev";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const {
      full_name, email, phone, property_address,
      property_type, square_footage, preferred_date,
      preferred_time, inspection_type, notes,
    } = body;

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <div style="background:#1a3a2a;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:#ffffff;margin:0;font-size:20px">🏠 New Inspection Request</h1>
          <p style="color:#a0c4a0;margin:4px 0 0;font-size:14px">${property_address}</p>
        </div>
        <div style="background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:40%">Name</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;font-weight:600">${full_name}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Email</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb"><a href="mailto:${email}" style="color:#1a3a2a">${email}</a></td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Phone</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${phone}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Property Address</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${property_address}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Property Type</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${property_type || "N/A"}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Square Footage</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${square_footage || "N/A"}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Preferred Date</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${preferred_date || "N/A"}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Preferred Time</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${preferred_time || "N/A"}</td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px">Inspection Type</td><td style="padding:8px 0;border-bottom:1px solid #e5e7eb">${inspection_type || "N/A"}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;vertical-align:top">Notes</td><td style="padding:8px 0">${notes || "None"}</td></tr>
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
