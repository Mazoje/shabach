import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, PropertyType, PropertyStatus } from '@prisma/client';

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting Shabach Empire database seeding...');

  // Clear existing data to avoid conflicts
  await prisma.unit.deleteMany();
  await prisma.property.deleteMany();
  await prisma.amenity.deleteMany();

  console.log('🗑️ Existing seed data cleared.');

  // Create Amenities
  const infinityPool = await prisma.amenity.create({ data: { name: 'Infinity Pool', icon: 'waves' } });
  const helipad = await prisma.amenity.create({ data: { name: 'Private Helipad', icon: 'plane' } });
  const wineCellar = await prisma.amenity.create({ data: { name: 'Climate-Controlled Wine Cellar', icon: 'wine' } });
  const smartHome = await prisma.amenity.create({ data: { name: 'Full Home Automation', icon: 'cpu' } });

  console.log('✨ Amenities created.');

  // Create Flagship Property
  const villaSerenity = await prisma.property.create({
    data: {
      title: 'Villa Serenity, Palm Jumeirah',
      slug: 'villa-serenity-palm-jumeirah',
      description: 'An architectural masterpiece offering unobstructed panoramic views of the Arabian Gulf, featuring bespoke Italian marble interiors and private beach access.',
      type: PropertyType.RESIDENTIAL_VILLA,
      status: PropertyStatus.AVAILABLE,
      isFeatured: true,
      price: 24500000,
      currency: 'USD',
      address: 'Frond M, Palm Jumeirah',
      city: 'Dubai',
      state: 'Dubai',
      country: 'United Arab Emirates',
      zipCode: '00000',
      latitude: 25.1124,
      longitude: 55.1390,
      bedrooms: 6,
      bathrooms: 8,
      sqft: 11200,
      coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
      ],
      amenities: {
        connect: [{ id: infinityPool.id }, { id: helipad.id }, { id: wineCellar.id }, { id: smartHome.id }],
      },
    },
  });

  console.log(`✅ Seeded property: ${villaSerenity.title}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });