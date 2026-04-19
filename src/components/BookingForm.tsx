import { useState } from "react";
import { Calendar, Clock, Loader2, CheckCircle2, CreditCard, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SERVICES } from "@/lib/salon-data";

const TIMES = ["10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM"];

interface FormState {
  client_name: string;
  client_email: string;
  client_phone: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  notes: string;
  payment_method: "online" | "at_salon";
}

const initial: FormState = {
  client_name: "",
  client_email: "",
  client_phone: "",
  service: "",
  appointment_date: "",
  appointment_time: "",
  notes: "",
  payment_method: "at_salon",
};

export const BookingForm = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (): string | null => {
    if (form.client_name.trim().length < 2) return "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.client_email.trim())) return "Please enter a valid email";
    if (form.client_phone.trim().length < 6) return "Please enter your phone number";
    if (!form.service) return "Please choose a service";
    if (!form.appointment_date) return "Please pick a date";
    if (!form.appointment_time) return "Please pick a time";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { toast.error(err); return; }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-booking", { body: form });
      if (error || (data as any)?.error) {
        const msg = (data as any)?.error || error?.message || "Something went wrong";
        toast.error(msg);
        setLoading(false);
        return;
      }

      // If online payment chosen, kick off Stripe checkout
      if (form.payment_method === "online") {
        const svc = SERVICES.find((s) => s.id === form.service);
        try {
          const { data: pay, error: payErr } = await supabase.functions.invoke("create-payment", {
            body: {
              booking_id: (data as any).booking_id,
              service_name: svc?.name ?? form.service,
              amount: svc?.price ?? 0,
            },
          });
          if (payErr || !(pay as any)?.url) {
            toast.success("Booking confirmed! Online payment isn't enabled yet — pay at the salon.");
            setDone(true);
            return;
          }
          window.open((pay as any).url, "_blank");
          toast.success("Booking confirmed! Complete payment in the new tab.");
          setDone(true);
        } catch {
          toast.success("Booking confirmed! Online payment isn't set up yet.");
          setDone(true);
        }
      } else {
        toast.success("Booking confirmed! Check your email for details.");
        setDone(true);
      }
    } catch (e) {
      toast.error("Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-gradient-card backdrop-blur border border-border/60 rounded-3xl p-10 md:p-14 shadow-card text-center space-y-5">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
          <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="font-display text-3xl md:text-4xl font-medium">You're booked, {form.client_name.split(" ")[0]}!</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          A confirmation email is on its way. We can't wait to see you on{" "}
          <span className="text-foreground font-medium">{form.appointment_date}</span> at{" "}
          <span className="text-foreground font-medium">{form.appointment_time}</span>.
        </p>
        <Button onClick={() => { setForm(initial); setDone(false); }} variant="outline" className="rounded-full mt-2">
          Book another appointment
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-card backdrop-blur border border-border/60 rounded-3xl p-7 md:p-10 shadow-card space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client_name">Full name</Label>
          <Input id="client_name" value={form.client_name} onChange={(e) => update("client_name", e.target.value)} maxLength={100} placeholder="Jane Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_phone">Phone</Label>
          <Input id="client_phone" type="tel" value={form.client_phone} onChange={(e) => update("client_phone", e.target.value)} maxLength={30} placeholder="+52 81 1234 5678" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="client_email">Email</Label>
        <Input id="client_email" type="email" value={form.client_email} onChange={(e) => update("client_email", e.target.value)} maxLength={255} placeholder="you@example.com" required />
      </div>

      <div className="space-y-2">
        <Label>Service</Label>
        <Select value={form.service} onValueChange={(v) => update("service", v)}>
          <SelectTrigger><SelectValue placeholder="Choose a treatment" /></SelectTrigger>
          <SelectContent>
            {SERVICES.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.name} · ${s.price} MXN · {s.duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="appointment_date"><Calendar className="inline h-3.5 w-3.5 mr-1" />Date</Label>
          <Input id="appointment_date" type="date" min={today} value={form.appointment_date} onChange={(e) => update("appointment_date", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label><Clock className="inline h-3.5 w-3.5 mr-1" />Time</Label>
          <Select value={form.appointment_time} onValueChange={(v) => update("appointment_time", v)}>
            <SelectTrigger><SelectValue placeholder="Pick a time" /></SelectTrigger>
            <SelectContent>{TIMES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea id="notes" rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} maxLength={500} placeholder="Any preferences or allergies we should know about?" />
      </div>

      <div className="space-y-3">
        <Label>How would you like to pay?</Label>
        <div className="grid sm:grid-cols-2 gap-3">
          {([
            { v: "at_salon", title: "Pay at the salon", desc: "Cash or card on arrival", Icon: Store },
            { v: "online", title: "Pay online now", desc: "Secure card via Stripe", Icon: CreditCard },
          ] as const).map(({ v, title, desc, Icon }) => {
            const active = form.payment_method === v;
            return (
              <button
                type="button"
                key={v}
                onClick={() => update("payment_method", v)}
                className={`text-left p-4 rounded-2xl border-2 transition-all ${active ? "border-primary bg-primary/10 shadow-soft" : "border-border hover:border-primary/40"}`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="font-medium">{title}</span>
                </div>
                <p className="text-xs text-muted-foreground ml-7">{desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      <Button type="submit" disabled={loading} size="lg" className="w-full rounded-full bg-gradient-primary border-0 shadow-soft hover:shadow-glow transition-all">
        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting…</> : "Confirm booking"}
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        By booking you agree to receive a confirmation email. We'll never share your info.
      </p>
    </form>
  );
};
