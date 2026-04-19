export const SALON = {
  name: "Beauty Touch Salon",
  rating: 4.9,
  reviewsCount: 25,
  address: "Av. Anillo Periferico 975, Colinas de San Jerónimo, 64630 Monterrey, N.L., Mexico",
  shortAddress: "Colinas de San Jerónimo, Monterrey",
  phone: "+52 81 2967 91",
  phoneHref: "tel:+528129679100",
  facebook: "https://facebook.com",
  mapsQuery: "Beauty+Touch+Salon+Monterrey",
  plusCode: "MJPG+85 Monterrey, Nuevo Leon",
  hours: [
    { day: "Monday", time: "10:00 AM – 8:00 PM" },
    { day: "Tuesday", time: "10:00 AM – 8:00 PM" },
    { day: "Wednesday", time: "10:00 AM – 8:00 PM" },
    { day: "Thursday", time: "10:00 AM – 8:00 PM" },
    { day: "Friday", time: "10:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
} as const;

export const SERVICES = [
  { id: "manicure", name: "Signature Manicure", duration: "45 min", price: 350, description: "Gentle care, perfect shaping, and a glossy finish that lasts." },
  { id: "pedicure", name: "Spa Pedicure", duration: "60 min", price: 450, description: "Warm soak, exfoliation, and pampering massage for tired feet." },
  { id: "hair-cut", name: "Hair Cut & Style", duration: "60 min", price: 550, description: "Precision cut and blowout tailored to your face shape." },
  { id: "hair-color", name: "Hair Coloring", duration: "120 min", price: 1200, description: "Professional color, highlights, and balayage techniques." },
  { id: "facial", name: "Glow Facial", duration: "75 min", price: 800, description: "Deep cleanse, hydration, and radiant-skin treatment." },
  { id: "makeup", name: "Event Makeup", duration: "60 min", price: 950, description: "Flawless makeup for weddings, parties, and special occasions." },
] as const;

export const REVIEWS = [
  {
    name: "Teacher Elizabeth",
    badge: "Local Guide · 133 reviews",
    rating: 5,
    text: "It's a great team! Attention to details and polite service. Highly recommended for manicure :)",
    date: "2 years ago",
  },
  {
    name: "Alejandra Bazán",
    badge: "13 reviews",
    rating: 5,
    text: "Excellent service and attention. The quality of the products is very good and superior! The hygiene measures make you feel safe while you are being served! 🥰",
    date: "5 years ago",
  },
  {
    name: "Jaqueline Acebo",
    badge: "Local Guide · 343 reviews",
    rating: 5,
    text: "Very good service. Cynthia served me, and her work was excellent, very attentive.",
    date: "2 years ago",
  },
] as const;

export type ServiceId = typeof SERVICES[number]["id"];
