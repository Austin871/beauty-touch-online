import { Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SALON } from "@/lib/salon-data";
import heroImage from "@/assets/hero-salon.jpg";

export const Hero = () => {
  return (
    <section id="top" className="relative pt-24 md:pt-28 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-accent/40 blur-3xl pointer-events-none" />
      <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

      <div className="container relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center pb-20 md:pb-32">
        <div className="lg:col-span-6 space-y-7 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/70 backdrop-blur border border-border/50 text-sm">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
              ))}
            </div>
            <span className="font-medium">{SALON.rating}</span>
            <span className="text-muted-foreground">· {SALON.reviewsCount} reviews</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] font-medium tracking-tight">
            Where beauty
            <br />
            meets <em className="text-gradient italic font-normal">artistry</em>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Monterrey's beloved beauty sanctuary. Hair, nails, facials and makeup — crafted with care by a team obsessed with details.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button asChild size="lg" className="rounded-full bg-gradient-primary border-0 shadow-soft hover:shadow-glow transition-all px-8">
              <a href="#book">
                Book your appointment
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-border/70">
              <a href="#services">Explore services</a>
            </Button>
          </div>

          <div className="flex items-center gap-2 pt-4 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{SALON.shortAddress}</span>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-glow">
            <img
              src={heroImage}
              alt="Beauty Touch Salon interior with elegant blush and lavender lighting"
              className="absolute inset-0 w-full h-full object-cover"
              width={1600}
              height={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-4 md:-left-8 bg-gradient-card backdrop-blur-xl border border-border/60 rounded-2xl p-5 shadow-card animate-float max-w-[240px]">
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Open today</div>
            <div className="font-display text-lg">10 AM – 8 PM</div>
            <div className="text-xs text-muted-foreground mt-1">Mon – Fri</div>
          </div>
        </div>
      </div>
    </section>
  );
};
