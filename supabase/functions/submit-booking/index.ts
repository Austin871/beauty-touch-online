import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface BookingPayload {
  client_name: string;
  client_email: string;
  client_phone: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  payment_method: "online" | "at_salon";
}

const validate = (b: any): { ok: true; data: BookingPayload } | { ok: false; error: string } => {
  if (!b || typeof b !== "object") return { ok: false, error: "Invalid body" };
  const s = (v: unknown) => typeof v === "string" ? v.trim() : "";
  const name = s(b.client_name);
  const email = s(b.client_email);
  const phone = s(b.client_phone);
  const service = s(b.service);
  const date = s(b.appointment_date);
  const time = s(b.appointment_time);
  const notes = s(b.notes);
  const pm = s(b.payment_method);

  if (name.length < 2 || name.length > 100) return { ok: false, error: "Name must be 2–100 chars" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) return { ok: false, error: "Invalid email" };
  if (phone.length < 6 || phone.length > 30) return { ok: false, error: "Invalid phone" };
  if (service.length < 2 || service.length > 100) return { ok: false, error: "Invalid service" };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, error: "Invalid date" };
  if (time.length < 3 || time.length > 20) return { ok: false, error: "Invalid time" };
  if (notes.length > 500) return { ok: false, error: "Notes too long" };
  if (pm !== "online" && pm !== "at_salon") return { ok: false, error: "Invalid payment method" };

  return { ok: true, data: { client_name: name, client_email: email, client_phone: phone, service, appointment_date: date, appointment_time: time, notes: notes || undefined, payment_method: pm as "online" | "at_salon" } };
};

const OWNER_EMAIL = "info@beautytouchsalon.com"; // Salon owner notification address

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  try {
    const body = await req.json();
    const v = validate(body);
    if (!v.ok) {
      return new Response(JSON.stringify({ error: v.error }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({ ...v.data, payment_status: v.data.payment_method === "online" ? "pending" : "unpaid" })
      .select()
      .single();

    if (error) {
      console.error("Insert failed:", error);
      return new Response(JSON.stringify({ error: "Could not save booking" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Try to send confirmation emails via the built-in transactional email system.
    // Will silently skip if the email domain isn't configured yet.
    const tryEmail = async (templateName: string, recipientEmail: string, templateData: Record<string, unknown>, idempotencyKey: string) => {
      try {
        const { error: emailErr } = await supabase.functions.invoke("send-transactional-email", {
          body: { templateName, recipientEmail, idempotencyKey, templateData },
        });
        if (emailErr) console.warn(`Email ${templateName} skipped:`, emailErr.message);
      } catch (e) {
        console.warn(`Email ${templateName} not sent:`, (e as Error).message);
      }
    };

    await Promise.all([
      tryEmail("booking-client-confirmation", v.data.client_email, {
        name: v.data.client_name,
        service: v.data.service,
        date: v.data.appointment_date,
        time: v.data.appointment_time,
        paymentMethod: v.data.payment_method,
      }, `client-${booking.id}`),
      tryEmail("booking-owner-notification", OWNER_EMAIL, {
        clientName: v.data.client_name,
        clientEmail: v.data.client_email,
        clientPhone: v.data.client_phone,
        service: v.data.service,
        date: v.data.appointment_date,
        time: v.data.appointment_time,
        notes: v.data.notes ?? "",
        paymentMethod: v.data.payment_method,
      }, `owner-${booking.id}`),
    ]);

    return new Response(JSON.stringify({ ok: true, booking_id: booking.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("submit-booking error:", e);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
