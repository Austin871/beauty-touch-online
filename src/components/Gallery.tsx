import nails from "@/assets/service-nails.jpg";
import hair from "@/assets/service-hair.jpg";
import facial from "@/assets/service-facial.jpg";
import makeup from "@/assets/service-makeup.jpg";
import hero from "@/assets/hero-salon.jpg";

const items = [
  { src: hero, alt: "Salon interior", className: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" },
  { src: nails, alt: "Nail polish flatlay", className: "aspect-square" },
  { src: hair, alt: "Styling station", className: "aspect-square" },
  { src: facial, alt: "Spa facial products", className: "aspect-square" },
  { src: makeup, alt: "Makeup brushes", className: "aspect-square" },
];

export const Gallery = () => {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-gradient-soft">
      <div className="container">
        <div className="max-w-2xl mb-12 md:mb-16">
          <div className="text-sm uppercase tracking-[0.2em] text-primary mb-4">Inside the salon</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            A space designed
            <br />
            <em className="italic font-normal text-gradient">for self-care</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((it, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl md:rounded-3xl shadow-card group ${it.className}`}
            >
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
