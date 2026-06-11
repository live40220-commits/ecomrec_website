export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: string;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  fabric: string;
  stock: number;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=82`;

export const products: Product[] = [
  {
    id: "p1",
    slug: "jahanara-embroidered-lawn-set",
    name: "Jahanara Embroidered Lawn",
    category: "Luxury Lawn",
    brand: "Jahanara Heritage",
    price: 14500,
    compareAt: 18500,
    rating: 4.9,
    reviews: 142,
    badge: "New",
    colors: ["Pastel Mint", "Powder Pink", "Ivory"],
    sizes: ["Unstitched", "XS", "S", "M", "L", "XL"],
    images: ["/images/hero_lawn.png"],
    description: "An exquisite 3-piece embroidered lawn suit. Features a heavily detailed organza neckline patch, digital printed pure silk dupatta, and matching dyed trousers fabric.",
    fabric: "Premium Lawn with Silk Dupatta",
    stock: 24
  },
  {
    id: "p2",
    slug: "gul-e-noor-festive-peshwas",
    name: "Gul-e-Noor Chiffon Peshwas",
    category: "Festive Chiffon",
    brand: "Jahanara Couture",
    price: 24500,
    compareAt: 29500,
    rating: 4.8,
    reviews: 96,
    badge: "Bestseller",
    colors: ["Crimson Red", "Emerald Green", "Royal Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["/images/festive_peshwas.png"],
    description: "A traditional floor-length chiffon Peshwas with a total flow of 12 panels, detailed gold tilla embroidery, hand-crafted gota borders, and a matching embellished net dupatta.",
    fabric: "Pure Chiffon & Net Dupatta",
    stock: 12
  },
  {
    id: "p3",
    slug: "chikankari-cotton-kurti",
    name: "Chikankari Cotton Kurti",
    category: "Ready To Wear",
    brand: "Jahanara Pret",
    price: 6800,
    compareAt: 8500,
    rating: 4.7,
    reviews: 78,
    badge: "New",
    colors: ["Mint Green", "Lilac", "Peach Pink"],
    sizes: ["XS", "S", "M", "L"],
    images: ["/images/chikankari_pret.png"],
    description: "A ready-to-wear pastel kurti featuring intricate hand-embroidered Lucknowi chikankari (shadow work) on breathable cotton fabric. Tailored for daily elegance.",
    fabric: "Hand-embroidered Cotton",
    stock: 18
  },
  {
    id: "p4",
    slug: "zari-velvet-shawl-suit",
    name: "Zari Velvet Shawl Suit",
    category: "Winter Festive",
    brand: "Jahanara Couture",
    price: 18500,
    compareAt: 22000,
    rating: 4.9,
    reviews: 34,
    colors: ["Plum Wine", "Midnight Black", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1617627143750-d86bc21e42bb"), img("photo-1583391733956-3750e0ff4e8b")],
    description: "A luxurious deep-toned velvet shirt adorned with intricate gold zari borders, paired with a matching velvet shawl featuring heavy multi-head embroidery.",
    fabric: "Micro-velvet with raw silk pants",
    stock: 8
  },
  {
    id: "p5",
    slug: "mehendi-organza-suit",
    name: "Mehendi Organza Suit",
    category: "Festive Chiffon",
    brand: "Jahanara Heritage",
    price: 13500,
    rating: 4.6,
    reviews: 54,
    colors: ["Mustard Gold", "Olive Green"],
    sizes: ["Unstitched", "XS", "S", "M", "L"],
    images: [img("photo-1595777457583-95e059d581b8"), img("photo-1509631179647-0177331693ae")],
    description: "Perfect for pre-wedding festivities. Bright mustard organza kameez featuring floral tilla embroidery, combined with a tulip shalwar and block-printed dupatta.",
    fabric: "Organza & Tulip Cotton Shalwar",
    stock: 15
  },
  {
    id: "p6",
    slug: "noor-ul-ain-silk-formal",
    name: "Noor-ul-Ain Silk Formal",
    category: "Festive Chiffon",
    brand: "Jahanara Couture",
    price: 29500,
    compareAt: 35000,
    rating: 4.8,
    reviews: 41,
    badge: "Pre-Order",
    colors: ["Emerald Green", "Maroon Red"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1529139574466-a303027c1d8b"), img("photo-1483985988355-763728e1935b")],
    description: "A pure raw silk straight shirt hand-embellished with dabka, crystal beads, and resham work. Paired with wide-leg pants and an organza border-embroidered dupatta.",
    fabric: "Raw Silk & Organza Dupatta",
    stock: 6
  },
  {
    id: "p7",
    slug: "summer-bloom-coord",
    name: "Summer Bloom Co-ord Set",
    category: "Ready To Wear",
    brand: "Jahanara Pret",
    price: 5500,
    compareAt: 7200,
    rating: 4.5,
    reviews: 63,
    badge: "Sale",
    colors: ["Ice Blue", "Lavender Lilac", "Lemon Yellow"],
    sizes: ["XS", "S", "M", "L"],
    images: [img("photo-1496747611176-843222e1e57c"), img("photo-1485968579580-b6d095142e6e")],
    description: "A daily-wear casual co-ord set with a soft floral print, classic band collar, and modern cigarette pants.",
    fabric: "Viscose Cotton Blend",
    stock: 32
  },
  {
    id: "p8",
    slug: "shehnaai-bridal-lehenga",
    name: "Shehnaai Bridal Lehenga",
    category: "Bridal & Couture",
    brand: "Jahanara Couture",
    price: 85000,
    rating: 5.0,
    reviews: 15,
    badge: "Couture",
    colors: ["Crimson Gold", "Blush Pink Gold"],
    sizes: ["Custom Size"],
    images: [img("photo-1502716119720-b23a93e5fe1b"), img("photo-1469334031218-e382a71b716b")],
    description: "An opulent bridal lehenga set meticulously crafted over 120 hours. Heavily embellished with hand-crafted kora, dabka, tilla, and sequins on premium raw silk.",
    fabric: "Raw Silk Lehenga & Choli with Net Dupatta",
    stock: 3
  },
  {
    id: "p9",
    slug: "dilara-crushed-gharara-set",
    name: "Dilara Crushed Gharara Set",
    category: "Festive Chiffon",
    brand: "Jahanara Heritage",
    price: 16500,
    compareAt: 19800,
    rating: 4.7,
    reviews: 43,
    badge: "Bestseller",
    colors: ["Sage Green", "Blush Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1595777457583-95e059d581b8")],
    description: "A romantic chiffon short kurti with delicate gold zari embroidery, paired with a matching crushed georgette gharara and a borders-finished dupatta.",
    fabric: "Chiffon Kurti with Crushed Georgette Gharara",
    stock: 14
  },
  {
    id: "p10",
    slug: "bahar-festive-angrakha-gown",
    name: "Bahar Festive Angrakha Gown",
    category: "Bridal & Couture",
    brand: "Jahanara Couture",
    price: 32000,
    compareAt: 38000,
    rating: 4.9,
    reviews: 28,
    badge: "New",
    colors: ["Deep Rust", "Emerald Green"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1583391733956-3750e0ff4e8b")],
    description: "A traditional wrap-around Angrakha cut frock in premium flowy chiffon, adorned with elaborate mirrors, gota embellishments, and handmade silk tassel ties.",
    fabric: "Chiffon Angrakha with Silk Linings",
    stock: 7
  },
  {
    id: "p11",
    slug: "zoya-silk-embellished-kaftan",
    name: "Zoya Silk Embellished Kaftan",
    category: "Ready To Wear",
    brand: "Jahanara Pret",
    price: 12500,
    rating: 4.8,
    reviews: 19,
    colors: ["Teal Blue", "Plum Wine"],
    sizes: ["Free Size"],
    images: [img("photo-1539008835657-9e8e9680c956")],
    description: "A modern-meets-traditional premium silk kaftan featuring an intricately hand-worked neckline with dabka and sequence work, cut for an elegant free-flowing drape.",
    fabric: "Premium Korean Raw Silk",
    stock: 11
  },
  {
    id: "p12",
    slug: "firdaus-jacquard-kurta",
    name: "Firdaus Jacquard Kurta",
    category: "Ready To Wear",
    brand: "Jahanara Pret",
    price: 4800,
    compareAt: 6000,
    rating: 4.6,
    reviews: 32,
    colors: ["Ivory Gold", "Sky Blue"],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [img("photo-1551803091-e20673f15770")],
    description: "Ready-to-wear everyday luxury shirt made of self-design jacquard cotton silk fabric, detailed with pearl button detailing on the neckline and lace inserts.",
    fabric: "Self-Jacquard Cotton Silk",
    stock: 25
  }
];

export const categories = [
  "Luxury Lawn",
  "Festive Chiffon",
  "Ready To Wear",
  "Bridal & Couture",
  "Winter Festive",
  "Sale"
];

export const testimonials = [
  "The details on the Shehnaai lehenga are breathtaking. The karigars have done absolute magic with the embroidery.",
  "Highly impressed by the fabric quality of the Unstitched Lawn. The silk dupatta is so soft and drapes elegantly.",
  "Super fast international shipping to the UK! The stitching service was perfectly tailored to my measurements."
];

export const blogPosts = [
  { slug: "heritage-lawn-edit", title: "The Heritage Lawn Edit", category: "Styling", image: "/images/hero_lawn.png", excerpt: "How to style your luxury unstitched lawn sets with statement jewelry and traditional khussas." },
  { slug: "caring-for-embellishments", title: "Caring for Zari and Chiffon", category: "Care", image: "/images/festive_peshwas.png", excerpt: "A complete guide to preserving hand-crafted tilla, gota, and dabka work on festive wear." },
  { slug: "evolution-of-peshwas", title: "The Evolution of the Peshwas", category: "Editorial", image: "/images/chikankari_pret.png", excerpt: "Exploring the historic roots of the flowy South Asian Peshwas silhouette and its modern revival." }
];
