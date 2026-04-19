import { Sparkles } from "lucide-react";
import { SALON } from "@/lib/salon-data";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-gradient-soft">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary">
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              </span>
              <span className="font-display text-lg">{SALON.name}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A beauty sanctuary in Monterrey — devoted to detail, hygiene and the art of feeling beautiful.
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Visit</div>
            <p className="text-sm leading-relaxed">{SALON.address}</p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Contact</div>
            <p className="text-sm">
              <a href={SALON.phoneHref} className="hover:text-primary transition-colors">{SALON.phone}</a>
            </p>
            <a href={SALON.facebook} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
              Facebook
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/60 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} {SALON.name}. All rights reserved.</span>
          <span>Designed with care · Monterrey, México</span>
        </div>
      </div>
    </footer>
  );
};
