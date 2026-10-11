'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');
}

export async function getAdminData() {
  try {
    const [propertiesRaw, unitsRaw] = await Promise.all([
      prisma.property.findMany({
        include: { units: true, amenities: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.unit.findMany({
        include: { property: true },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const properties = (propertiesRaw || []).map((p: any) => ({
      ...p,
      price: p.price ? Number(p.price) : 0,
      sqft: p.sqft ? Number(p.sqft) : 0,
      units: (p.units || []).map((u: any) => ({
        ...u,
        salePrice: u.salePrice ? Number(u.salePrice) : 0,
        nightlyRate: u.nightlyRate ? Number(u.nightlyRate) : 0,
        sqft: u.sqft ? Number(u.sqft) : 0,
      })),
    }));

    const units = (unitsRaw || []).map((u: any) => ({
      ...u,
      salePrice: u.salePrice ? Number(u.salePrice) : 0,
      nightlyRate: u.nightlyRate ? Number(u.nightlyRate) : 0,
      sqft: u.sqft ? Number(u.sqft) : 0,
      property: u.property
        ? {
            ...u.property,
            price: u.property.price ? Number(u.property.price) : 0,
            sqft: u.property.sqft ? Number(u.property.sqft) : 0,
          }
        : null,
    }));

    const milestones: any[] = [];

    return { success: true, data: { properties, units, milestones } };
  } catch (error) {
    console.error('Failed to fetch admin data:', error);
    return { success: false, error: 'Failed to load database records.' };
  }
}

// --- Property CRUD Actions ---

export async function createPropertyAction(data: {
  title: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  coverImage: string;
  gallery: string[];
  city: string;
  country: string;
  intent: 'buy' | 'rent' | 'offplan';
  category: string;
}) {
  try {
    const slug = `${generateSlug(data.title)}-${Math.random().toString(36).substring(2, 7)}`;

    const listingType = data.intent === 'rent' ? 'FOR_RENT' : 'FOR_SALE';
    const status = 'AVAILABLE';
    const type = data.category.toLowerCase().includes('penthouse')
      ? 'PENTHOUSE'
      : 'RESIDENTIAL_VILLA';

    const property = await prisma.property.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        sqft: data.sqft,
        coverImage: data.coverImage,
        gallery: data.gallery,
        city: data.city,
        state: data.city,
        country: data.country,
        address: `${data.city}, ${data.country}`,
        zipCode: '100001',
        listingType: listingType as any,
        status: status as any,
        type: type as any,
        currency: 'USD',
        isFeatured: false,
      } as any,
      include: { units: true, amenities: true },
    });

    revalidatePath('/admin');
    revalidatePath('/properties');
    return {
      success: true,
      data: { ...property, price: Number(property.price), sqft: Number(property.sqft) },
    };
  } catch (error) {
    console.error('Failed to create property:', error);
    return { success: false, error: 'Failed to create property in database.' };
  }
}

export async function updatePropertyAction(
  id: string,
  data: {
    title: string;
    description: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    coverImage: string;
    gallery: string[];
    city: string;
    country: string;
    intent: 'buy' | 'rent' | 'offplan';
    category: string;
  }
) {
  try {
    const listingType = data.intent === 'rent' ? 'FOR_RENT' : 'FOR_SALE';
    const status = 'AVAILABLE';
    const type = data.category.toLowerCase().includes('penthouse')
      ? 'PENTHOUSE'
      : 'RESIDENTIAL_VILLA';

    const property = await prisma.property.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        sqft: data.sqft,
        coverImage: data.coverImage,
        gallery: data.gallery,
        city: data.city,
        state: data.city,
        country: data.country,
        listingType: listingType as any,
        status: status as any,
        type: type as any,
      } as any,
      include: { units: true, amenities: true },
    });

    revalidatePath('/admin');
    revalidatePath('/properties');
    return {
      success: true,
      data: { ...property, price: Number(property.price), sqft: Number(property.sqft) },
    };
  } catch (error) {
    console.error('Failed to update property:', error);
    return { success: false, error: 'Failed to update property.' };
  }
}

export async function deletePropertyAction(id: string) {
  try {
    await prisma.property.delete({ where: { id } });
    revalidatePath('/admin');
    revalidatePath('/properties');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete property:', error);
    return { success: false, error: 'Failed to delete property.' };
  }
}

// --- Unit Actions ---

export async function createUnitAction(data: {
  unitNumber: string;
  propertyId: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  salePrice: number;
  status: string;
}) {
  try {
    const unit = await prisma.unit.create({
      data: {
        unitNumber: data.unitNumber,
        propertyId: data.propertyId,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        sqft: data.sqft,
        salePrice: data.salePrice,
        status: (data.status || 'AVAILABLE') as any,
      } as any,
      include: { property: true },
    });

    revalidatePath('/admin');
    return { success: true, data: { ...unit, salePrice: Number(unit.salePrice), sqft: Number(unit.sqft) } };
  } catch (error) {
    console.error('Failed to create unit:', error);
    return { success: false, error: 'Failed to save unit to database.' };
  }
}

export async function updateUnitStatusAction(unitId: string, status: string) {
  try {
    const unit = await prisma.unit.update({
      where: { id: unitId },
      data: { status: status as any },
      include: { property: true },
    });

    revalidatePath('/admin');
    return { success: true, data: { ...unit, salePrice: Number(unit.salePrice), sqft: Number(unit.sqft) } };
  } catch (error) {
    console.error('Failed to update unit status:', error);
    return { success: false, error: 'Failed to update unit status.' };
  }
}

export async function createMilestoneAction(data: {
  title: string;
  projectName: string;
  inspector: string;
  notes: string;
  type: string;
}) {
  try {
    revalidatePath('/admin');
    return { success: true, data };
  } catch (error) {
    console.error('Failed to log milestone:', error);
    return { success: false, error: 'Failed to save milestone log.' };
  }
}