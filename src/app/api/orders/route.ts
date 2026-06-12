import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const data = await req.json();

    // Determine user ID. If not logged in, we can optionally use a generic "GUEST" ID 
    // or just require login. The schema says userId is required and points to User.
    // If we want guest checkout, we might need to modify schema to make userId optional.
    // Let's check schema: `userId String`, `user User @relation(fields: [userId], references: [id])`.
    // It's required. So we will assign it to a default guest user or require login.
    // Let's create a guest user if one doesn't exist.
    
    let userId = (session?.user as any)?.id;
    
    if (!userId) {
      let guestUser = await prisma.user.findUnique({ where: { email: 'guest@ecomrec.com' } });
      if (!guestUser) {
        guestUser = await prisma.user.create({
          data: {
            email: 'guest@ecomrec.com',
            name: 'Guest User',
            password: 'no-password-guest-account',
            role: 'USER',
          }
        });
      }
      userId = guestUser.id;
    }

    const order = await prisma.order.create({
      data: {
        userId: userId,
        totalAmount: Number(data.total),
        address: `${data.address}, ${data.city}, ${data.zip}`,
        phone: data.phone,
        status: "PROCESSING",
        paymentMethod: data.payMethod === "cod" ? "COD" : "CARD",
      }
    });

    return NextResponse.json({ orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to create order", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
