import villa1 from "@/assets/villa-1.jpg";
import villa2 from "@/assets/villa-2.jpg";
import villa3 from "@/assets/villa-3.jpg";
import heroVilla from "@/assets/hero-villa-batu.jpg";

export const AREAS = [
  "Songgoriti",
  "Batu Kota",
  "Bumiaji",
  "Pujon",
  "Coban Rondo",
] as const;
export type Area = (typeof AREAS)[number];

export const CATEGORIES = [
  "Family",
  "Group",
  "Romantic",
  "Budget",
  "Premium",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const AMENITIES = [
  "Kolam Pribadi",
  "BBQ",
  "Karaoke",
  "Wi-Fi",
  "Mountain View",
  "Pemanas Air",
  "Perapian",
  "Taman",
  "Parkir Luas",
  "Sunset Deck",
] as const;
export type Amenity = (typeof AMENITIES)[number];

export type Villa = {
  slug: string;
  name: string;
  area: Area;
  category: Category[];
  price: number;
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
  featured?: boolean;
};

export const VILLAS: Villa[] = [
  {
    slug: "villa-asana-pinus",
    name: "Villa Asana Pinus",
    area: "Songgoriti",
    category: ["Family", "Group"],
    price: 1850000,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    rating: 4.9,
    reviews: 184,
    tag: "Populer",
    cover: villa1,
    images: [villa1, heroVilla, villa2, villa3],
    description:
      "Villa modern di antara pohon pinus Songgoriti dengan kolam pribadi berair hangat, ruang BBQ outdoor, dan ruang karaoke. Cocok untuk keluarga 6 orang yang ingin liburan tenang dekat dengan pusat wisata Batu.",
    amenities: ["Kolam Pribadi", "BBQ", "Karaoke", "Wi-Fi", "Pemanas Air", "Parkir Luas"],
    featured: true,
  },
  {
    slug: "villa-bukit-pandang",
    name: "Villa Bukit Pandang",
    area: "Bumiaji",
    category: ["Premium", "Family"],
    price: 2450000,
    bedrooms: 4,
    bathrooms: 4,
    guests: 8,
    rating: 4.8,
    reviews: 96,
    tag: "Baru",
    cover: villa2,
    images: [villa2, heroVilla, villa1, villa3],
    description:
      "Villa eksklusif di perbukitan Bumiaji dengan infinity pool menghadap pegunungan. Sunset deck luas, dapur lengkap, dan kamar utama dengan bathtub menghadap jendela panorama.",
    amenities: ["Kolam Pribadi", "Mountain View", "Pemanas Air", "Sunset Deck", "Wi-Fi", "Parkir Luas"],
    featured: true,
  },
  {
    slug: "villa-pinewood-coban",
    name: "Villa Pinewood Coban",
    area: "Pujon",
    category: ["Romantic", "Budget"],
    price: 950000,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    rating: 4.7,
    reviews: 132,
    tag: "Hemat",
    cover: villa3,
    images: [villa3, villa1, villa2, heroVilla],
    description:
      "Cabin kayu hangat dekat air terjun Coban Rondo. Cocok untuk pasangan atau keluarga kecil, dilengkapi perapian indoor untuk malam dingin Pujon.",
    amenities: ["Perapian", "Taman", "Wi-Fi", "Pemanas Air", "Mountain View"],
    featured: true,
  },
  {
    slug: "villa-songgoriti-grand",
    name: "Villa Songgoriti Grand",
    area: "Songgoriti",
    category: ["Group", "Premium"],
    price: 3200000,
    bedrooms: 5,
    bathrooms: 4,
    guests: 12,
    rating: 4.9,
    reviews: 211,
    tag: "Premium",
    cover: heroVilla,
    images: [heroVilla, villa2, villa1, villa3],
    description:
      "Villa 5 kamar untuk rombongan besar atau gathering. Kolam pribadi, ruang BBQ, ruang karaoke kedap suara, dan ruang keluarga lapang.",
    amenities: ["Kolam Pribadi", "BBQ", "Karaoke", "Wi-Fi", "Pemanas Air", "Parkir Luas", "Taman"],
  },
  {
    slug: "villa-mawar-batu-kota",
    name: "Villa Mawar Batu Kota",
    area: "Batu Kota",
    category: ["Family", "Budget"],
    price: 1150000,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    rating: 4.6,
    reviews: 78,
    tag: "Hemat",
    cover: villa1,
    images: [villa1, villa3, villa2],
    description:
      "Villa minimalis di pusat Kota Batu, dekat alun-alun dan kuliner. Pilihan praktis untuk liburan singkat keluarga.",
    amenities: ["Wi-Fi", "Pemanas Air", "Parkir Luas", "Taman"],
  },
  {
    slug: "villa-pinus-romantica",
    name: "Villa Pinus Romantica",
    area: "Bumiaji",
    category: ["Romantic", "Premium"],
    price: 1750000,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    rating: 5.0,
    reviews: 54,
    tag: "Baru",
    cover: villa2,
    images: [villa2, heroVilla, villa1],
    description:
      "Studio premium untuk pasangan dengan bathtub outdoor, perapian, dan jendela panorama menghadap hutan pinus.",
    amenities: ["Perapian", "Mountain View", "Pemanas Air", "Wi-Fi", "Sunset Deck"],
  },
  {
    slug: "villa-coban-rondo-camp",
    name: "Villa Coban Rondo Camp",
    area: "Coban Rondo",
    category: ["Group", "Family"],
    price: 1450000,
    bedrooms: 4,
    bathrooms: 3,
    guests: 10,
    rating: 4.7,
    reviews: 102,
    tag: "Populer",
    cover: villa3,
    images: [villa3, villa1, villa2],
    description:
      "Villa berkonsep camp dengan halaman luas untuk api unggun & BBQ, dekat wisata Coban Rondo dan Paralayang.",
    amenities: ["BBQ", "Taman", "Wi-Fi", "Parkir Luas", "Mountain View"],
  },
  {
    slug: "villa-pujon-skyhouse",
    name: "Villa Pujon Skyhouse",
    area: "Pujon",
    category: ["Premium", "Romantic"],
    price: 2150000,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    rating: 4.9,
    reviews: 67,
    tag: "Premium",
    cover: heroVilla,
    images: [heroVilla, villa2, villa3],
    description:
      "Rumah kaca di atas bukit Pujon dengan view 270°. Sunset deck, kolam kecil, dan dapur lengkap untuk staycation premium.",
    amenities: ["Kolam Pribadi", "Mountain View", "Sunset Deck", "Pemanas Air", "Wi-Fi"],
  },
  {
    slug: "villa-keluarga-batu-kota",
    name: "Villa Keluarga Batu Kota",
    area: "Batu Kota",
    category: ["Family", "Group"],
    price: 1650000,
    bedrooms: 4,
    bathrooms: 3,
    guests: 10,
    rating: 4.7,
    reviews: 145,
    tag: "Populer",
    cover: villa2,
    images: [villa2, villa1, villa3],
    description:
      "Villa luas dekat BNS dan Jatim Park. Ruang keluarga lapang, dapur lengkap, dan area bermain anak.",
    amenities: ["Kolam Pribadi", "BBQ", "Wi-Fi", "Pemanas Air", "Parkir Luas", "Taman"],
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
      const hay = `${v.name} ${v.area} ${v.amenities.join(" ")} ${v.category.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (opts.areas?.length && !opts.areas.includes(v.area)) return false;
    if (opts.categories?.length && !v.category.some((c) => opts.categories!.includes(c))) return false;
    if (opts.amenities?.length && !opts.amenities.every((a) => v.amenities.includes(a as Amenity))) return false;
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