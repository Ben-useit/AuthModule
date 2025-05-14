import { getSession } from '@/lib/session';
const Dashboard = async () => {
  const session = await getSession();
  return (
    <div className='text-white'>
      <h1>Dashboard</h1>
      <h2>User: {session?.user?.name}</h2>
    </div>
  );
};
export default Dashboard;
