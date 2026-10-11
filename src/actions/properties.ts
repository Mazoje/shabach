import { prisma } from '@/lib/db';
import { PropertyType, PropertyStatus, ListingType } from '@prisma/client';

export interface PropertyFilterOptions {
  type?: PropertyType;
  listingType?: ListingType;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  isFeatured?: boolean;
}

/**
 * Fetch featured luxury properties for the homepage landing showcase
 */
export async function getFeaturedProperties(limit = 6) {
  try {
    const properties = await prisma.property.findMany({
      where: {
        isFeatured: true,
        status: PropertyStatus.AVAILABLE,
      },
      include: {
        amenities: true,
        units: true,
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, data: properties };
  } catch (error) {
    console.error('Failed to fetch featured properties:', error);
    return { success: false, error: 'Could not retrieve featured properties.' };
  }
}

/**
 * Fetch all properties with optional filters (location, price, type, bedrooms)
 */
export async function getProperties(filters: PropertyFilterOptions = {}) {
  try {
    const { type, listingType, city, minPrice, maxPrice, bedrooms, isFeatured } = filters;

    const properties = await prisma.property.findMany({
      where: {
        status: PropertyStatus.AVAILABLE,
        ...(type && { type }),
        ...(listingType && { listingType }),
        ...(city && { city: { contains: city, mode: 'insensitive' } }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(bedrooms && { bedrooms: { gte: bedrooms } }),
        ...(minPrice || maxPrice
          ? {
              price: {
                ...(minPrice && { gte: minPrice }),
                ...(maxPrice && { lte: maxPrice }),
              },
            }
          : {}),
      },
      include: {
        amenities: true,
        units: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { success: true, data: properties };
  } catch (error) {
    console.error('Failed to fetch filtered properties:', error);
    return { success: false, error: 'Could not retrieve properties.' };
  }
}

/**
 * Fetch a single luxury property by its URL slug
 */
export async function getPropertyBySlug(slug: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { slug },
      include: {
        amenities: true,
        units: true,
      },
    });

    if (!property) {
      return { success: false, error: 'Property not found.' };
    }

    return { success: true, data: property };
  } catch (error) {
    console.error(`Failed to fetch property with slug ${slug}:`, error);
    return { success: false, error: 'Could not retrieve property details.' };
  }
}