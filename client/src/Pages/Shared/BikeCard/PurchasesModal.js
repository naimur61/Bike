import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Hooks/Auth/useAuth';

const PurchasesModal = ({ product, setProduct }) => {
   const { user } = useAuth();
   const { register, handleSubmit, formState: { errors } } = useForm();
   const navigate = useNavigate();

   const onSubmit = data => {
      const booking = {
         buyerName: user?.displayName,
         buyerEmail: user?.email,
         buyerPhone: data.mobile,
         meetLocation: data.meetLocation,
         productName: product?.modelName,
         productImg: product?.photoURL,
         productPrice: product?.rslPrice,
         sellerName: product?.sellerName,
         productId: product?._id
      }
      fetch('https://bike-one.vercel.app/orders', {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         },
         body: JSON.stringify(booking)
      })
         .then(res => res.json())
         .then(data => {
            if (data.acknowledged === true) {
               setProduct(null);
               navigate('/dashboard/myOrders')
            }
         })

   };





   return (
      <div>
         <input type="checkbox" id="purchases-modal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box relative">
               <label htmlFor="purchases-modal" onClick={() => setProduct(null)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
               <h1 className=' text-center text-2xl my-4 font-bold font-serif text-info'>Please Give Your Information.</h1>
               <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Name */}
                  <span className="label-text font-semibold">Enter Your Full Name</span>
                  <input type='text' defaultValue={user?.displayName} disabled {...register("name")} className="input input-bordered w-full  block  mb-2" />

                  {/* Email  */}
                  <span className="label-text font-semibold">Enter Your Email</span>
                  <input defaultValue={user?.email} disabled type='email' {...register("email")} className="input input-bordered w-full  block  mb-2" />

                  {/* Product Name */}
                  <span className="label-text font-semibold">Product model Name</span>
                  <input type='text' defaultValue={product?.modelName} disabled {...register("productName")} className="input input-bordered w-full  block  mb-2" />

                  {/* Price  */}
                  <span className="label-text font-semibold">Product Price</span>
                  <input defaultValue={product?.rslPrice} disabled type='number' {...register("productPrice")} className="input input-bordered w-full  block  mb-3" />


                  {/* mobile  */}
                  <span className="label-text font-semibold">Enter Your Phone Number</span>
                  <input placeholder="Phone Number" type='number' {...register("mobile", { required: "Your Phone Number field is empty", minLength: { value: 10, message: "Please Give Right Number." } })} className="input input-bordered w-full  block  mb-3" />
                  {errors.mobile && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>{errors.mobile.message}</small>}


                  {/* location  */}
                  <span className="label-text font-semibold">Where you want to meet seller ?</span>
                  <input placeholder="Location" type='text' {...register("meetLocation", { required: true })} className="input input-bordered w-full  block  mb-3" />
                  {errors.meetLocation && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>Your Location field is empty</small>}


                  <div className="flex justify-center items-center mt-5">
                     <input type="submit" placeholder='Register' className=' w-fit px-10 py-3 btn btn-info hover:bg-cyan-600 text-white font-serif font-bold block' />
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default PurchasesModal;