import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    const newProduct = await prisma.product.create({
      data: {
        title: data.name || data.title,
        description: data.description || "",
        price: Number(data.price),
        imagePath: data.imagePath || data.images?.[0] || "",
        category: data.category || "Uncategorized",
        collection: data.collection || (Number(data.price) >= 5000 ? "Luxury Atelier" : "Everyday Essentials"),
        sizes: Array.isArray(data.sizes) ? data.sizes.join(", ") : data.sizes || "S, M, L",
        colors: Array.isArray(data.colors) ? data.colors.join(", ") : data.colors || "Default",
        inStock: data.stock > 0 || data.inStock !== false,
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Failed to create product", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
