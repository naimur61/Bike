import React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { MdPayments } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';



const OrderTable = ({ order, i, setSelectOrder }) => {

   const { sellerName, productName, productPrice, productImg, productId } = order;


   const { data: bike = [], refetch } = useQuery({
      queryKey: ['wishesProduct'],
      queryFn: async () => {
         const res = await fetch(`https://bike-one.vercel.app/wishesProduct/${productId}`);
         const data = await res.json();
         return data;
      }
   });

   refetch();

   return (
      <tr>
         <td>
            {i + 1}
         </td>
         <td>
            <div className="mask scale-125 rounded-lg w-12 h-12">
               <img src={productImg
               } alt="Product" className='rounded-lg' />
            </div>
         </td>
         <td>
            <div className="flex items-center space-x-3">
               <div className="avatar">

               </div>
               <div>
                  <div className="font-bold">{productName}</div>
               </div>
            </div>
         </td>
         <td>
            {productPrice} BDT
         </td>
         <td>
            <p>{sellerName}</p>
         </td>
         <td>
            {(bike && bike?.productStatus !== 'Sold') ?
               <Link to={`/dashboard/payment/${productId}`}><div className=' btn text-orange-500 border-0 flex items-center gap-2 justify-center shadow-xl hover:bg-orange-500 hover:text-white bg-base-200 font-bold font-serif rounded animate-pulse hover:animate-none'><MdPayments className='text-xl' /> <p>Pay</p></div></Link>
               :
               <div className='text-green-500 flex items-center gap-2 justify-center shadow-lg bg-base-200 w-24 font-bold font-serif px-auto  py-1 rounded-xl'><FaCheckCircle /> <p>Paid</p></div>
            }
         </td>
         <th>
            <label htmlFor='order-modal' onClick={() => setSelectOrder({ order, key: "Remove" })} className="w-9 h-9 bg-red-500 text-white btn-circle flex items-center justify-center hover:text-red-400 hover:bg-base-200 transition-all shadow-xl cursor-pointer hover:scale-125"><BsTrashFill className=' text-xl' /></label>
         </th>
      </tr>
   );
};

export default OrderTable;