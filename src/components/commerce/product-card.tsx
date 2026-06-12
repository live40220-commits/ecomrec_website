"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, RootState, toggleWishlist } from "@/store/store";

export function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const wished = useSelector((s: RootState) => s.commerce.wishlist.includes(product.id));
  return (
    <motion.article initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -6 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.45, ease: "easeOut" }} className="group">
      <Link href={`/product/${product.id}`} className="lux-sheen relative block aspect-[3/4] overflow-hidden bg-neutral-100 shadow-sm transition duration-500 group-hover:shadow-2xl">
        <Image src={product.images[0]} alt={product.name} fill sizes="(max-width:768px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.08]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/34 to-transparent opacity-0 transition group-hover:opacity-100" />
        {product.badge && <span className="absolute left-4 top-4 bg-background/92 px-3 py-1 text-[10px] font-bold uppercase tracking-[.22em] shadow-sm">{product.badge}</span>}
      </Link>
      <div className="flex items-start justify-between gap-3 py-4">
        <div>
          <Link href={`/product/${product.id}`} className="font-medium transition hover:text-accent">{product.name}</Link>
          <p className="mt-1 text-sm text-muted">{product.category}</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-accent"><Star size={13} fill="currentColor" /> {product.rating} <span className="text-muted">({product.reviews})</span></p>
          <p className="mt-2 font-semibold">{formatPrice(product.price)} {product.compareAt && <s className="ml-2 text-sm font-normal text-muted">{formatPrice(product.compareAt)}</s>}</p>
        </div>
        <div className="flex gap-2">
          <button className="focus-ring grid size-9 place-items-center border border-line bg-background/70 transition hover:border-accent hover:text-accent" onClick={() => dispatch(toggleWishlist(product.id))} aria-label="Wishlist"><Heart size={18} fill={wished ? "currentColor" : "none"} /></button>
          <button className="focus-ring grid size-9 place-items-center border border-line bg-foreground text-background transition hover:border-accent hover:bg-accent" onClick={() => dispatch(addToCart({ id: product.id, qty: 1, size: product.sizes[0], color: product.colors[0] }))} aria-label="Add to cart"><ShoppingBag size={18} /></button>
        </div>
      </div>
    </motion.article>
  );
}
