import { BookingForm } from "@/components/BookingForm";
import { Sparkles } from "lucide-react";

export const BookingSection = () => {
  return (
    <section id="book" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[60rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>Book in under a minute</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
              Reserve your <em className="italic font-normal text-gradient">moment</em>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Pick a service, choose a time that works, and decide whether to pay online or at the salon. You'll get a confirmation email instantly — and so will we.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✦ Instant email confirmation</li>
              <li>✦ Pay online or in person</li>
              <li>✦ Free to reschedule up to 24h before</li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};
