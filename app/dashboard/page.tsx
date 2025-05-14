import { getSession } from '@/lib/session';
const Dashboard = async () => {
  const user = await getSession();
  return (
    <div className='text-white'>
      <h1>Dashboard</h1>
      <h2>User: {user?.name}</h2>
    </div>
  );
};
export default Dashboard;
