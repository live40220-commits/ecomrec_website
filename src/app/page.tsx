import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { SectionHeading } from "@/components/commerce/section-heading";
import { blogPosts, categories, products, testimonials } from "@/data/products";
import { Button } from "@/components/ui/button";

export default function Home() {
  const hero = products[0];
  return (
    <>
      <section className="relative min-h-[calc(100svh-136px)] overflow-hidden">
        <Image src={hero.images[0]} alt="Jahanara Couture Eid Collection" fill priority sizes="100vw" className="object-cover object-[50%_18%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/58 via-black/20 to-transparent" />
        <div className="container-lux relative flex min-h-[calc(100svh-136px)] items-center pb-12 pt-20">
          <div className="max-w-2xl text-white">
            <p className="tracked-luxury mb-5 text-xs">Luxury Lawn & Formals '26</p>
            <h1 className="font-serif text-6xl leading-none md:text-8xl">Jahanara</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/82">Intricate hand-embroidery, premium fabrics, and regal silhouettes celebrating traditional Pakistani craftsmanship.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/shop"><Button>Shop Collection <ArrowRight size={16} /></Button></Link>
              <Link href="/about"><Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">Our Story</Button></Link>
            </div>
          </div>
        </div>
      </section>
      <div className="overflow-hidden border-y border-line bg-foreground py-4 text-background">
        <div className="animate-[marquee_24s_linear_infinite] whitespace-nowrap tracked-luxury text-xs">NEW ARRIVALS · LUXURY LAWN · FESTIVE CHIFFON · READY TO WEAR PRET · BRIDAL COUTURE · FREE SHIPPING IN PAKISTAN · GLOBAL EXPRESS DELIVERIES · </div>
      </div>
      <section className="container-lux py-20">
        <SectionHeading eyebrow="Featured" title="The Collection Edit" text="Explore our signature silhouettes, fine hand-loom fabrics, and intricately detailed embroidery designed for formal elegance." />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 lg:gap-8">{products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>
      <section className="container-lux grid gap-4 py-10 md:grid-cols-4">
        {categories.slice(0, 4).map((cat, i) => (
          <Link href="/shop" key={cat} className="group relative min-h-72 overflow-hidden bg-neutral-100">
            <Image src={products[i % products.length].images[0]} alt={cat} fill sizes="25vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/25" />
            <h3 className="tracked-luxury absolute bottom-6 left-6 right-6 text-sm text-white">{cat}</h3>
          </Link>
        ))}
      </section>
      <section className="container-lux py-20">
        <div className="glass grid gap-8 p-8 md:grid-cols-[1fr_1.4fr] md:p-12">
          <div><p className="tracked-luxury text-xs text-accent">Limited Offer</p><h2 className="mt-3 font-serif text-5xl">Eid Festive Savings</h2><p className="mt-5 text-muted">Get 15% off selected ready-to-wear and unstitched luxury pieces. Use coupon <b>JAHANARA15</b> at checkout.</p></div>
          <div className="grid grid-cols-3 gap-3 text-center"><div className="border border-line p-6"><b className="text-4xl">08</b><p className="tracked-luxury mt-2 text-[10px]">Hours</p></div><div className="border border-line p-6"><b className="text-4xl">42</b><p className="tracked-luxury mt-2 text-[10px]">Minutes</p></div><div className="border border-line p-6"><b className="text-4xl">19</b><p className="tracked-luxury mt-2 text-[10px]">Seconds</p></div></div>
        </div>
      </section>
      <section className="container-lux py-16">
        <SectionHeading eyebrow="Best Sellers" title="Most Desired" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-8">{products.slice(2, 5).map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>
      <section className="border-y border-line py-16">
        <div className="container-lux grid gap-8 md:grid-cols-3">{[[Truck, "Worldwide Express Delivery"], [ShieldCheck, "Secure Payment Options"], [Sparkles, "Artisan Craftsmanship"]].map(([Icon, text]) => <div className="flex items-center gap-4" key={String(text)}><Icon className="text-accent" /><span className="tracked-luxury text-sm">{String(text)}</span></div>)}</div>
      </section>
      <section className="container-lux py-20">
        <SectionHeading eyebrow="Clients" title="Atelier Reviews" />
        <div className="grid gap-4 md:grid-cols-3">{testimonials.map((t) => <blockquote className="glass p-7 leading-8" key={t}>"{t}"</blockquote>)}</div>
      </section>
      <section className="container-lux py-16">
        <SectionHeading eyebrow="Journal" title="Editorial Notes" />
        <div className="grid gap-6 md:grid-cols-3">{blogPosts.map((b) => <Link href={`/blog/${b.slug}`} className="group" key={b.slug}><div className="relative aspect-[4/3] overflow-hidden"><Image src={b.image} alt={b.title} fill sizes="33vw" className="object-cover transition group-hover:scale-105" /></div><p className="tracked-luxury mt-5 text-xs text-accent">{b.category}</p><h3 className="mt-2 font-serif text-3xl">{b.title}</h3><p className="mt-2 text-muted">{b.excerpt}</p></Link>)}</div>
      </section>
      <section className="container-lux py-16">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6">{products.slice(0, 6).map((p) => <div className="relative aspect-square overflow-hidden" key={p.id}><Image src={p.images[0]} alt="Instagram gallery" fill sizes="16vw" className="object-cover" /></div>)}</div>
      </section>
      <section className="container-lux pb-16">
        <SectionHeading eyebrow="FAQ" title="Before You Order" />
        <div className="space-y-2">
          <details className="border-b border-line py-5">
            <summary className="cursor-pointer font-medium">Do you offer tailoring and stitching services?</summary>
            <p className="mt-3 text-muted">Yes, we offer premium professional stitching for both local and international orders. You can choose from standard sizes (XS to XL) or select custom tailoring during checkout by submitting your measurements. Stitching typically adds 7-10 business days to fulfillment.</p>
          </details>
          <details className="border-b border-line py-5">
            <summary className="cursor-pointer font-medium">How fast is shipping, both domestically and internationally?</summary>
            <p className="mt-3 text-muted">Domestic delivery within Pakistan takes 2-4 business days. International express shipping via DHL/FedEx takes 5-7 business days to the USA, UK, Canada, and UAE. Custom-stitched suits require additional processing time.</p>
          </details>
          <details className="border-b border-line py-5">
            <summary className="cursor-pointer font-medium">What is included in the Unstitched fabric options?</summary>
            <p className="mt-3 text-muted">Our 3-piece Unstitched suits include full running fabric for the shirt/kameez (typically 3 meters), matching dyed trousers fabric (2.5 meters), and a fully woven or printed dupatta (2.5 meters). Any separate embroidered borders, necklines, or lace trims are packaged separately for your tailor to attach.</p>
          </details>
          <details className="border-b border-line py-5">
            <summary className="cursor-pointer font-medium">How should I care for suits with heavy tilla and zari work?</summary>
            <p className="mt-3 text-muted">We strongly recommend dry cleaning for all products containing delicate hand-embroidery, gota borders, tilla work, or premium silk/chiffon fabrics. Iron on low heat on the reverse side of the embroidery to avoid damage.</p>
          </details>
        </div>
      </section>
    </>
  );
}
