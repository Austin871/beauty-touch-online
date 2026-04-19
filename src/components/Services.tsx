import { Clock } from "lucide-react";
import { SERVICES } from "@/lib/salon-data";
import nails from "@/assets/service-nails.jpg";
import hair from "@/assets/service-hair.jpg";
import facial from "@/assets/service-facial.jpg";
import makeup from "@/assets/service-makeup.jpg";

const imageMap: Record<string, string> = {
  manicure: nails,
  pedicure: nails,
  "hair-cut": hair,
  "hair-color": hair,
  facial: facial,
  makeup: makeup,
};

export const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-gradient-soft">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Our menu</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            Treatments crafted <em className="text-gradient italic font-normal">just for you</em>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              className="group relative bg-card rounded-3xl overflow-hidden border border-border/60 shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="aspect-[5/4] overflow-hidden">
                <img
                  src={imageMap[s.id]}
                  alt={s.name}
                  loading="lazy"
                  width={800}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 md:p-7 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-medium">{s.name}</h3>
                  <span className="font-display text-xl text-primary whitespace-nowrap">${s.price}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{s.duration}</span>
                  <span className="text-muted-foreground/50">·</span>
                  <span>MXN</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
