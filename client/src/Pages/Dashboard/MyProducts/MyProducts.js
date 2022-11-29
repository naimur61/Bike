import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../Hooks/Auth/useAuth';
import useTitle from '../../../Hooks/Title/useTitle';
import { Loader } from '../../Shared/Loader/Loader';
import motorcycle from '../../../Assets/Icon/motorbike.png'
import { MdWavingHand } from 'react-icons/md'
import ProductCard from './ProductCard';
import { useState } from 'react';
import ProductModal from './ProductModal';




const MyProducts = () => {
   useTitle('My Products');
   const { user } = useAuth();
   const email = user?.email;
   const [selectProduct, setSelectProduct] = useState(null);



   const url = `https://bike-one.vercel.app/bikes?email=${email}`;

   const { data: bikes = [], isLoading, refetch } = useQuery({
      queryKey: ['bikes'],
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
         {
            bikes?.length === 0 ?
               <div className="card px-3 md:px-0 md:w-96 shadow-xl image-full mx-auto mt-20 flex-1 items-center rounded-md relative text-white">
                  <figure><img src={motorcycle} alt="Shoes" /></figure>
                  <div className='w-full h-full rounded-md' style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0,0, 0.5))' }}>
                     <div className="card-body absolute top-1/4 items-center">
                        <MdWavingHand className='text-yellow-400 text-5xl' />
                        <h2 className="card-title font text-center text-red-600"> {user?.displayName}</h2>
                        <p className=' mt-3 font-serif font-semibold'>You don't add any product for sell.</p>
                     </div>
                  </div>
               </div>
               :
               <div className="overflow-x-auto w-full">
                  <table className="table w-full">
                     <thead>
                        <tr>
                           <th></th>
                           <th>Product</th>
                           <th>Name</th>
                           <th>Price</th>
                           <th>Status</th>
                           <th>Advertise</th>
                           <th>Remove</th>
                        </tr>
                     </thead>
                     <tbody>
                        {/* <!-- row  --> */}
                        {
                           bikes?.length &&
                           bikes.map((bike, i) => <ProductCard key={bike?._id} bike={bike} i={i} setSelectProduct={setSelectProduct} refetch={refetch} />)
                        }
                     </tbody>
                  </table>

                  {/* Modal  Section */}
                  {
                     selectProduct &&
                     <ProductModal selectProduct={selectProduct} setSelectProduct={setSelectProduct} refetch={refetch} />
                  }

               </div>
         }
      </div>
   );
};

export default MyProducts;





