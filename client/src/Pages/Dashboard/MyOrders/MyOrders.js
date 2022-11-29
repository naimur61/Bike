import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuth } from '../../../Hooks/Auth/useAuth';
import { Loader } from '../../Shared/Loader/Loader';
import motorcycle from '../../../Assets/Icon/motorbike.png'
import { MdWavingHand } from 'react-icons/md'
import useTitle from '../../../Hooks/Title/useTitle';
import OrderModal from './OrderModal';
import OrderTable from './OrderTable';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';





const MyOrders = () => {
   const { user } = useAuth();
   useTitle('My Orders');
   const [selectOrder, setSelectOrder] = useState(null);

   const { data: orders = [], refetch, isLoading } = useQuery({
      queryKey: ['orders'],
      queryFn: async () => {
         const res = await fetch(`https://bike-one.vercel.app/orders?email=${user?.email}`, {
            headers: {
               authorization: ` bearer ${localStorage.getItem('accessToken')}`
            }
         });
         const data = await res.json();
         return data;
      }
   })
   refetch();


   const successToast = (er) => {
      toast.success(er, {
         position: "top-center",
         autoClose: 1,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
      });
   }


   if (isLoading) {
      return <Loader />;
   }
   return (
      <div className='my-20 px-5'>
         {
            orders?.length === 0 ?
               <div className="card px-3 md:px-0 md:w-96 shadow-xl image-full mx-auto mt-20 flex-1 items-center rounded-md relative text-white animate-pulse">
                  <figure><img src={motorcycle} alt="Shoes" /></figure>
                  <div className='w-full h-full rounded-md' style={{ background: 'linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0,0, 0.5))' }}>
                     <div className="card-body absolute top-1/4 items-center">
                        <MdWavingHand className='text-yellow-400 text-5xl' />
                        <h2 className="card-title font text-center text-red-600"> {user?.displayName}</h2>
                        <p className=' mt-3 font-serif font-semibold'>You don't order any product for Buy.</p>
                        <Link to='/' className='font-extrabold text-xl text-yellow-400'>Please go for Order.</Link>
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
                           <th>Seller</th>
                           <th>Payment</th>
                           <th>Remove</th>
                        </tr>
                     </thead>
                     <tbody>
                        {/* <!-- row  --> */}
                        {
                           orders?.length &&
                           orders.map((order, i) => <OrderTable key={order?._id} order={order} i={i} setSelectOrder={setSelectOrder} />)
                        }
                     </tbody>
                  </table>
                  {
                     selectOrder &&
                     <OrderModal selectOrder={selectOrder} setSelectOrder={setSelectOrder} successToast={successToast} />
                  }

               </div>
         }
         <ToastContainer />
      </div>
   );
};

export default MyOrders;