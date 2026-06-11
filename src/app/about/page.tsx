import Image from "next/image";
import { products } from "@/data/products";

export default function AboutPage() {
  return (
    <section className="container-lux py-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="tracked-luxury text-xs text-accent">Our Story</p>
          <h1 className="mt-4 font-serif text-7xl">Crafted by Heritage. Tailored for You.</h1>
          <p className="mt-6 leading-8 text-muted">
            Jahanara Couture celebrates the rich tapestry of South Asian clothing. Based in Lahore, Pakistan, we blend centuries-old craftsmanship—like gold tilla, hand-blocked prints, and intricate chikankari—with modern luxury design. Our collections highlight the skill of local karigars (artisans) across Multan, Karachi, and Lahore, bringing premium lawn and majestic festive wear to women worldwide.
          </p>
        </div>
        <div className="relative min-h-[520px]">
          <Image src={products[1].images[0]} alt="Jahanara Couture Atelier" fill sizes="50vw" className="object-cover" />
        </div>
      </div>
      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {[
          "Artisanship: Empowering and preserving the heritage skills of local Pakistani karigars.",
          "Quality: Selecting only the finest cotton lawn, hand-woven raw silk, and premium flowy chiffon.",
          "Global Reach: Connecting the South Asian diaspora to high-quality ethnic wear through express delivery and tailored stitching."
        ].map((t) => (
          <div className="glass p-7 text-sm leading-7" key={t}>
            {t}
          </div>
        ))}
      </div>
    </section>
  );
}
