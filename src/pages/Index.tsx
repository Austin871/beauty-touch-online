import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { Visit } from "@/components/Visit";
import { BookingSection } from "@/components/BookingSection";
import { SiteFooter } from "@/components/SiteFooter";
import { useEffect } from "react";
import { SALON } from "@/lib/salon-data";

const Index = () => {
  useEffect(() => {
    document.title = `${SALON.name} — Beauty Salon in Monterrey`;
    const meta = document.querySelector('meta[name="description"]');
    const desc = `${SALON.name} in Monterrey: hair, nails, facials & makeup. ${SALON.rating}★ from ${SALON.reviewsCount} reviews. Book online today.`;
    if (meta) meta.setAttribute("content", desc);
    else {
      const m = document.createElement("meta");
      m.name = "description"; m.content = desc;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Reviews />
        <Visit />
        <BookingSection />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
