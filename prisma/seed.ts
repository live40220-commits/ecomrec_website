import { PrismaClient } from '@prisma/client'
import { products } from '../src/data/products'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with products...')
  
  // Clear existing products if we want to re-seed cleanly
  await prisma.product.deleteMany({})

  let count = 0
  for (const p of products) {
    await prisma.product.create({
      data: {
        title: p.name,
        description: p.description || 'Premium Pakistani Suit',
        price: p.price,
        imagePath: p.images[0], // Store the first image
        category: p.category,
        collection: p.price >= 5000 ? 'Luxury Atelier' : 'Everyday Essentials',
        sizes: 'S, M, L, XL', // Default sizes
        colors: 'Default',
        inStock: true,
      }
    })
    count++
  }

  // Create default admin user
  const bcrypt = await import('bcryptjs')
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await prisma.user.upsert({
    where: { email: 'admin@ecomrec.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@ecomrec.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log(`Seeded ${count} products and 1 admin user.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
