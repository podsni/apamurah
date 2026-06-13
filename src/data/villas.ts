export const AREAS = ["Batu", "Malang"] as const;
export type Area = (typeof AREAS)[number];

export const CATEGORIES = ["Family", "Group", "Romantic", "Budget", "Premium"] as const;
export type Category = (typeof CATEGORIES)[number];

export const AMENITIES = [
  "Kolam Renang",
  "Karaoke",
  "Billiard",
  "Wi-Fi",
  "Rooftop",
  "PS3",
  "Dapur Lengkap",
  "BBQ",
  "Extra Bed",
  "AC",
] as const;
export type Amenity = (typeof AMENITIES)[number];

export type Villa = {
  slug: string;
  name: string;
  area: Area;
  category: Category[];
  /** harga weekday dalam rupiah */
  price: number;
  /** harga weekend dalam rupiah */
  priceWeekend: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  rating: number;
  reviews: number;
  tag: "Populer" | "Baru" | "Hemat" | "Premium";
  cover: string;
  images: string[];
  description: string;
  amenities: Amenity[];
  gdriveLink?: string;
  featured?: boolean;
};

export const VILLAS: Villa[] = [
  {
    slug: "ab-villa",
    name: "AB Villa",
    area: "Batu",
    category: ["Group", "Family", "Premium"],
    price: 2_500_000,
    priceWeekend: 3_500_000,
    bedrooms: 4,
    bathrooms: 5,
    guests: 30,
    rating: 4.9,
    reviews: 142,
    tag: "Populer",
    cover: "/images/ab_villa/image_1.webp",
    images: Array.from({ length: 33 }, (_, i) => `/images/ab_villa/image_${i + 1}.webp`),
    description:
      "Villa megah dengan kapasitas hingga 30 orang, dilengkapi 4 kamar tidur, 5 kamar mandi, kolam renang, karaoke, dan meja billiard. Sangat cocok untuk gathering keluarga besar atau rombongan.",
    amenities: ["Kolam Renang", "Karaoke", "Billiard", "Wi-Fi", "Extra Bed"],
    gdriveLink:
      "https://drive.google.com/drive/folders/1-UVagXMRHV0fOxQnHOSGmGjkBozvgM4U?hl=ID",
    featured: true,
  },
  {
    slug: "sea-villa-2",
    name: "Sea Villa 2",
    area: "Batu",
    category: ["Family", "Group"],
    price: 1_250_000,
    priceWeekend: 2_000_000,
    bedrooms: 4,
    bathrooms: 3,
    guests: 20,
    rating: 4.8,
    reviews: 98,
    tag: "Populer",
    cover: "/images/sea_villa_2/image_1.webp",
    images: Array.from({ length: 20 }, (_, i) => `/images/sea_villa_2/image_${i + 1}.webp`),
    description:
      "Villa nyaman untuk 15–20 orang dengan 4 kamar tidur, kolam renang, karaoke, dan dapur lengkap. Tersedia extra bed gratis untuk 2 orang dan Wi-Fi kencang.",
    amenities: ["Kolam Renang", "Karaoke", "Wi-Fi", "Dapur Lengkap", "Extra Bed"],
    gdriveLink:
      "https://drive.google.com/drive/folders/1-KGxbUQcvSyVeiDhGYx977miA5lViWtv?usp=drive_link",
    featured: true,
  },
  {
    slug: "sea-villa-1",
    name: "Sea Villa 1",
    area: "Batu",
    category: ["Family", "Romantic"],
    price: 1_000_000,
    priceWeekend: 1_500_000,
    bedrooms: 3,
    bathrooms: 3,
    guests: 12,
    rating: 4.8,
    reviews: 76,
    tag: "Hemat",
    cover: "/images/sea_villa_1/image_1.webp",
    images: Array.from({ length: 25 }, (_, i) => `/images/sea_villa_1/image_${i + 1}.webp`),
    description:
      "Villa 3 kamar tidur dengan rooftop view indah, kolam renang, karaoke, PS3, dapur lengkap, dan peralatan BBQ. Pilihan tepat untuk staycation keluarga kecil hingga 12 orang.",
    amenities: ["Kolam Renang", "Karaoke", "Rooftop", "PS3", "Dapur Lengkap", "BBQ", "Wi-Fi"],
    gdriveLink:
      "https://drive.google.com/drive/folders/1-UModzUaAQfZy60WocneW2n15OWr11Op?usp=drive_link",
    featured: true,
  },
  {
    slug: "se-villa",
    name: "Se Villa",
    area: "Batu",
    category: ["Family", "Group"],
    price: 1_500_000,
    priceWeekend: 2_000_000,
    bedrooms: 3,
    bathrooms: 3,
    guests: 12,
    rating: 4.7,
    reviews: 61,
    tag: "Baru",
    cover: "/images/se_villa/image_1.webp",
    images: Array.from({ length: 22 }, (_, i) => `/images/se_villa/image_${i + 1}.webp`),
    description:
      "Villa 3 kamar tidur ber-AC dengan 1 kamar tambahan, rooftop view, kolam renang, karaoke, dan dapur lengkap. Kapasitas hingga 12 orang dengan suasana yang nyaman dan modern.",
    amenities: ["Kolam Renang", "Karaoke", "AC", "Rooftop", "Dapur Lengkap", "Wi-Fi"],
    gdriveLink:
      "https://drive.google.com/drive/folders/1x6PaWP_muGkez_J9QVTupQKLmN4IQ3wR?usp=drive_link",
  },
];

export function getVilla(slug: string): Villa | undefined {
  return VILLAS.find((v) => v.slug === slug);
}

export function getFeaturedVillas(limit = 3): Villa[] {
  return VILLAS.filter((v) => v.featured).slice(0, limit);
}

export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export type SortKey = "recommended" | "price-asc" | "price-desc" | "rating";

export type FilterOptions = {
  q?: string;
  areas?: string[];
  categories?: string[];
  amenities?: string[];
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  sort?: SortKey;
};

export function filterVillas(opts: FilterOptions): Villa[] {
  const q = opts.q?.trim().toLowerCase() ?? "";
  let result = VILLAS.filter((v) => {
    if (q) {
      const hay =
        `${v.name} ${v.area} ${v.amenities.join(" ")} ${v.category.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (opts.areas?.length && !opts.areas.includes(v.area)) return false;
    if (opts.categories?.length && !v.category.some((c) => opts.categories!.includes(c)))
      return false;
    if (opts.amenities?.length && !opts.amenities.every((a) => v.amenities.includes(a as Amenity)))
      return false;
    if (opts.minPrice != null && v.price < opts.minPrice) return false;
    if (opts.maxPrice != null && v.price > opts.maxPrice) return false;
    if (opts.guests != null && v.guests < opts.guests) return false;
    return true;
  });
  switch (opts.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }
  return result;
}

export const PRICE_MIN = 500_000;
export const PRICE_MAX = 4_000_000;
