import React, { useEffect, useState } from 'react';
import { FcCellPhone, FcClock } from 'react-icons/fc';
import { MdLocationOn, MdEmail } from 'react-icons/md';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { GoArrowSmallRight } from 'react-icons/go';
import { FaCheckCircle, FaHeart } from 'react-icons/fa';
import './BikeCard.css'
import PurchasesModal from './PurchasesModal';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Hooks/Auth/useAuth';





const BikeCard = ({ bike, txt }) => {
   const { _id, brand, condition, description, location, modelName, orgPrice, photoURL, postTime, purchaseYears, rslPrice, sellerEmail, sellerName, seller_Ph_No } = bike;
   const { user } = useAuth();
   const [product, setProduct] = useState(null);
   const [verifyInfo, setVerifyInfo] = useState(false);

   useEffect(() => {
      fetch(`https://bike-one.vercel.app/usersVerify?email=${sellerEmail}`, {
         headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         }
      })
         .then(res => res.json())
         .then(data => setVerifyInfo(data))
   }, [sellerEmail])

   // console.log(verifyInfo);

   const handlePurchases = (product) => {

      setProduct(product);
   }

   const handleFavorite = (id) => {

      const wish = {
         wisher: user?.email,
         wishProduct: id
      };
      fetch('https://bike-one.vercel.app/wishlists', {
         method: 'POST',
         headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         },
         body: JSON.stringify(wish)
      })
         .then(res => res.json())
         .then(data => {
            // if (data.acknowledged === true) {

            // }
         })
   }





   const today = new Date().toLocaleDateString();
   const a = new Date(purchaseYears);
   const b = new Date(today);


   const time = Math.abs(b - a);
   const days = Math.ceil(time / (1000 * 60 * 60 * 24));
   const years = (days / 365)
   const mounts = Math.ceil(days / 30) + ' Mounts'

   let usedTime = '';
   if (years < 1) {
      usedTime = mounts;
   }
   else {
      usedTime = Math.ceil(years) + ' Years';
   }



   return (<>
      {(bike && bike?.productStatus !== 'Sold') &&

         <div className={`card bg-base-100 shadow-xl rounded-md w-full relative`}>
            <img src={photoURL} alt="Shoes" className='rounded-t-md card-img' />
            <div className="py-5 px-3 md:px-10 mb-14">

               {/* Body  */}
               <div className='flex justify-between gap-5' id='card-text'>
                  {/* Card Left  */}
                  <div>
                     <small className=' font-sans text-info block font-semibold'>Product Info</small>
                     <h2>{modelName}<small className='text-red-500 font-extrabold text-xs'> ({brand})</small></h2>
                     <div>
                        <p>Original Price : {orgPrice}</p>
                        <p>Resell Price : {rslPrice} </p>
                     </div>
                     {/* use Time  */}
                     <p>Used Time : {usedTime} </p>
                     <p>Condition : {condition} </p>

                  </div>

                  {/* Card Right  */}
                  <div>
                     <small className=' font-sans text-info block font-semibold'>Seller Info</small>
                     <div className='flex gap-1'><h2>{sellerName}</h2>{
                        verifyInfo === true &&
                        <FaCheckCircle className='text-blue-500 text-sm' />
                     }</div>
                     <div className='flex gap-3 items-center' ><MdEmail />  <p>{sellerEmail}</p></div>
                     <div className='flex gap-3 items-center' ><FcCellPhone />  <p>{seller_Ph_No}</p></div>
                     <div className='flex gap-3 items-center'><MdLocationOn /> <p>{location}</p></div>
                     <div className='flex gap-3 items-center'><FcClock /> <p>{postTime}</p></div>
                  </div>
               </div>

               <p className='px-2 text-sm mt-4 font-mono font-semibold text-gray-700'>{description}</p>
            </div>
            <div className=" absolute w-full bottom-0 py-5 px-3 md:px-10 ">
               <div className='flex justify-between items-center'>
                  <FaHeart className='text-2xl cursor-pointer' onClick={() => handleFavorite(_id)} />
                  <div>
                     {(txt && txt.txt === 'advertise') ?
                        <Link to={`/bikes/${brand}`} className="btn btn-info btn-sm text-white rounded-md px-5">Go to Booking <GoArrowSmallRight className='ml-1 text-4xl' /></Link>
                        :
                        <label htmlFor="purchases-modal" onClick={() => handlePurchases(bike)} className="btn btn-info btn-sm text-white rounded-md px-5"><BsFillCartCheckFill className='inline mr-1' /> Book Now</label>
                     }
                  </div>
               </div>
            </div>

            {/* Modal for booking product  */}
            {
               product &&
               <PurchasesModal product={product} setProduct={setProduct} />
            }
         </div>}
   </>
   );
};

export default BikeCard;