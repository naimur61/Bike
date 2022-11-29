import React from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { FcAdvertising } from 'react-icons/fc';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';




const ProductCard = ({ bike, i, setSelectProduct, refetch }) => {
   const { brand, modelName, photoURL, rslPrice, } = bike;


   const handleAdvertise = (id, txt) => {
      fetch(`https://bike-one.vercel.app/bikes/${id}`, {
         method: 'PUT',
         headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         },
         body: JSON.stringify({ status: txt })
      })
         .then(res => res.json())
         .then(data => {
            // console.log(data);
            if (data.modifiedCount > 0) {
               refetch();
               successToast('Update Successful.')
            }
         })
   }


   // Toast 
   const successToast = (er) => {
      toast.success(er, {
         position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
   }



   return (
      <tr>
         <td>
            {i + 1}
         </td>
         <td>
            <div className="mask scale-125 rounded-lg w-12 h-12">
               <img src={photoURL} alt="Product" className='rounded-lg' />
            </div>
         </td>
         <td>
            <div className="flex items-center space-x-3">
               <div className="avatar">

               </div>
               <div>
                  <div className="font-bold">{modelName}</div>
                  <div className="text-xs text-red-500 font-bold">{brand}</div>
               </div>
            </div>
         </td>
         <td>
            {rslPrice} BDT
         </td>
         <td>
            {(bike?.productStatus !== 'Sold') ?
               <p className='bg-orange-400 w-24 font-bold font-serif text-center px-auto py-1 rounded-xl'>Available</p>
               :
               <p className='bg-green-500 text-white text-center w-24 font-bold font-serif px-auto py-1 rounded-xl'>Sold</p>
            }

         </td>
         <td>
            {(bike && bike?.productStatus !== 'Sold') &&

               <>{
                  bike?.productStatus !== 'Advertise' ?
                     <FcAdvertising onClick={() => handleAdvertise(bike._id, 'Advertise')} className='text-4xl cursor-pointer animate-pulse hover:animate-none' />
                     :
                     <FaCheckCircle onClick={() => handleAdvertise(bike._id, 'Available')} className=' cursor-pointer text-green-500 text-2xl' />
               }
               </>

            }
         </td>
         <th>
            <label htmlFor='product-modal' onClick={() => setSelectProduct(bike)} className="w-9 h-9 bg-red-500 text-white btn-circle flex items-center justify-center hover:text-red-400 hover:bg-base-200 transition-all shadow-slate-700 shadow-2xl cursor-pointer hover:scale-125"><BsTrashFill className=' text-xl' /></label>
         </th>
      </tr>
   );
};

export default ProductCard;

