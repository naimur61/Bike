import { useQuery } from '@tanstack/react-query';
import BikeCard from '../../Shared/BikeCard/BikeCard';



const WishTable = ({ id }) => {

   const { data: wishesProduct = [], refetch } = useQuery({
      queryKey: ['wishesProduct'],
      queryFn: async () => {
         const res = await fetch(`https://bike-one.vercel.app/wishesProduct/${id}`);
         const data = await res.json();
         return data;
      }
   })
   console.log(wishesProduct);

   refetch();

   return (
      <>

         <div>
            <BikeCard bike={wishesProduct} />
         </div>

      </>
   );
};

export default WishTable;