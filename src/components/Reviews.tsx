import { Star } from "lucide-react";
import { REVIEWS, SALON } from "@/lib/salon-data";

export const Reviews = () => {
  return (
    <section id="reviews" className="py-24 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-6">
            <div className="text-sm uppercase tracking-[0.2em] text-primary">Loved by clients</div>
            <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">
              {SALON.rating} stars
              <br />
              <em className="italic font-normal text-gradient">from real visits</em>
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                ))}
              </div>
              <span className="text-muted-foreground">{SALON.reviewsCount} Google reviews</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              From precision manicures to glowing facials, our guests keep coming back for the warmth, hygiene and the little details.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {REVIEWS.map((r, i) => (
              <article
                key={i}
                className="bg-gradient-card backdrop-blur border border-border/60 rounded-3xl p-7 md:p-9 shadow-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="font-display text-lg">{r.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{r.badge}</div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-[hsl(var(--gold))] text-[hsl(var(--gold))]" />
                    ))}
                  </div>
                </div>
                <p className="text-base md:text-lg leading-relaxed">{r.text}</p>
                <div className="text-xs text-muted-foreground mt-4">{r.date}</div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
