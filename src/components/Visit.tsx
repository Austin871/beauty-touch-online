import { MapPin, Phone, Clock, ExternalLink, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SALON } from "@/lib/salon-data";

export const Visit = () => {
  return (
    <section id="visit" className="py-24 md:py-32">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-8">
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Visit us</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                Come say <em className="italic font-normal text-gradient">hello</em>
              </h2>
            </div>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium mb-1">Address</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{SALON.address}</p>
                  <p className="text-xs text-muted-foreground mt-1">{SALON.plusCode}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium mb-1">Phone</div>
                  <a href={SALON.phoneHref} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {SALON.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium mb-2">Hours</div>
                  <ul className="space-y-1 text-sm">
                    {SALON.hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-4 max-w-xs">
                        <span className="text-muted-foreground">{h.day}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="default" className="rounded-full bg-gradient-primary border-0">
                <a href={`https://www.google.com/maps/search/?api=1&query=${SALON.mapsQuery}`} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-1 h-4 w-4" />
                  Get directions
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href={SALON.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook className="mr-1 h-4 w-4" />
                  Facebook
                </a>
              </Button>
            </div>
          </div>

          <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-glow border border-border/50">
            <iframe
              title="Beauty Touch Salon location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(SALON.address)}&output=embed`}
              className="absolute inset-0 w-full h-full grayscale-[20%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
