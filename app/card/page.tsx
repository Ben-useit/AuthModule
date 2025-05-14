import { getSession } from '@/lib/session';

const Card = async () => {
  const user = await getSession();
  return (
    <div className='text-white'>
      <h1>Card Page</h1>
      <h2>User: {user?.name}</h2>
    </div>
  );
};
export default Card;
