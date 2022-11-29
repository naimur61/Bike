import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useAuth } from '../../../Hooks/Auth/useAuth';
import useTitle from '../../../Hooks/Title/useTitle';
import CheckoutForm from './CheckoutForm';




const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);


const Payment = () => {
   useTitle('Payment');
   const { user } = useAuth();
   const bike = useLoaderData();
   const { brand, condition, modelName, photoURL, rslPrice } = bike;




   return (
      <div>
         <div className='px-5 md:w-10/12 lg:w-8/12 mx-auto'>
            <img src={photoURL} alt="" />
            <div className=''>
               <h2 className='font-bold text-2xl'>{modelName}<small className='text-red-500 font-extrabold text-xs'> ({brand})</small></h2>
               <p className='font-semibold text-sm'>Condition : {condition}</p>
               <p className='font-bold text-sm'> Price : {rslPrice} BDT</p>
            </div>
         </div>
         <div className='my-5 px-5 mx-auto md:w-7/12 lg:w-1/2 bg-base-200 p-14 rounded-md shadow-lg'>
            <Elements stripe={stripePromise}>
               <CheckoutForm bike={bike} user={user} />
            </Elements>
         </div>
      </div>
   );
};

export default Payment;