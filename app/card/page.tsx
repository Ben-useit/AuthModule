import { getSession } from '@/lib/session';

const Card = async () => {
  const session = await getSession();
  if (!session) return;
  return (
    <div className='text-white'>
      <h1>Card Page</h1>
      <h2>User: {session?.user?.name}</h2>
    </div>
  );
};
export default Card;
