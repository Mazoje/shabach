import { getPropertyBySlug } from '@/actions/properties';
import { notFound } from 'next/navigation';
import PropertyDetailClient from '../../../components/PropertyDetailClient';

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  
  const result = await getPropertyBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const rawProperty = result.data;

  const property = {
    ...rawProperty,
    price: Number(rawProperty.price),
    units: (rawProperty.units || []).map((u: any) => ({
      ...u,
      salePrice: u.salePrice ? Number(u.salePrice) : 0,
      nightlyRate: u.nightlyRate ? Number(u.nightlyRate) : 0,
    })),
  };

  const Component = PropertyDetailClient as any;
  return <Component property={property} />;
}