import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../Hooks/Auth/useAuth';
import useTitle from '../../../Hooks/Title/useTitle';
import { Loader } from '../../Shared/Loader/Loader';
import WishTable from './WishTable';




const MyWishlist = () => {

   useTitle('My Wishlist');
   const { user } = useAuth();
   const email = user?.email;


   const url = `https://bike-one.vercel.app/wishlists?email=${email}`;

   const { data: wishes = [], isLoading, refetch } = useQuery({
      queryKey: ['wishes'],
      queryFn: async () => {
         const res = await fetch(url, {
            headers: {
               authorization: ` bearer ${localStorage.getItem('accessToken')}`
            }
         });
         const data = await res.json();
         return data;
      }
   })
   refetch();




   if (isLoading) {
      return <Loader />;
   }
   return (
      <div className='my-20 px-5'>
         <div className=' grid  lg:grid-cols-2 gap-10 md:w-10/12 mx-auto justify-items-center'>
            {wishes.map(wish => <WishTable key={wish._id} id={wish?.wishProduct} refetch={refetch()} />)}
         </div>
      </div>
   );
};

export default MyWishlist;