import { getPropertyBySlug } from '@/actions/properties';
import { notFound } from 'next/navigation';
import PropertyDetailClient from '../../../components/PropertyDetailClient';

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params;
  
  // Fetch live property from Supabase by slug
  const result = await getPropertyBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const property = result.data;

  return <PropertyDetailClient property={property} />;
}