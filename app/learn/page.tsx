import { getSession } from '@/lib/session';
const LearnPage = async () => {
  const session = await getSession();
  return (
    <div className='text-white'>
      <h1>Learn Page</h1>
      <h2>User: {session?.user?.name}</h2>
    </div>
  );
};
export default LearnPage;
