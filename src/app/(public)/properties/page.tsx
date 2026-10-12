import { getProperties } from '@/actions/properties';
import PropertiesClient from '../../components/PropertiesClient';
import { ListingType } from '@prisma/client';

interface PropertiesPageProps {
  searchParams: Promise<{
    city?: string;
    type?: string;
    price?: string;
    intent?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = await searchParams;

  // Map incoming URL search parameters to database filters
  const filterOptions: any = {};
  if (params.city) filterOptions.city = params.city;
  if (params.type) filterOptions.type = params.type;
  if (params.price) filterOptions.maxPrice = Number(params.price);

  // Fetch live properties from Supabase
  const result = await getProperties(filterOptions);
  const rawProperties = result.success && result.data ? result.data : [];

  // Format database properties using correct Prisma enums
  const formattedProperties = rawProperties.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    location: `${p.city}, ${p.country}`,
    price: `$${p.price.toLocaleString()}`,
    type: (p.listingType === ListingType.FOR_RENT ? 'rent' : p.listingType === ListingType.SHORT_LET ? 'offplan' : 'buy') as 'buy' | 'rent' | 'offplan',
    category: (p.type.includes('VILLA') ? 'Villa' : p.type.includes('PENTHOUSE') ? 'Penthouse' : 'Apartment') as 'Villa' | 'Penthouse' | 'Apartment' | 'Commercial' | 'Land',
    tag: p.isFeatured ? 'Featured' : 'Available',
    beds: p.bedrooms ?? 0,
    baths: p.bathrooms,
    sqft: `${p.sqft} Sq.Ft`,
    image: p.coverImage,
    description: p.description,
    featured: p.isFeatured,
  }));

 return <PropertiesClient initialProperties={formattedProperties as any} />;
}