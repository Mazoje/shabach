import { getAdminData } from '@/actions/admin';
import AdminClient from '../../components/AdminClient';

export default async function AdminPage() {
  const result = await getAdminData();
  const { properties = [], units = [], milestones = [] } = result.success && result.data ? result.data : {};

  return (
    <AdminClient 
      initialProjects={properties} 
      initialUnits={units} 
      initialMilestones={milestones} 
    />
  );
}