import { useQuery } from '@tanstack/react-query';
import React from 'react';
import advertising from '../../../Assets/Icon/advertisements.png';
import Marquee from 'react-fast-marquee';
import BikeCard from '../../Shared/BikeCard/BikeCard';



const txt = { txt: 'advertise' }

const Advertise = () => {
   const { data: advertiseBikes = [], refetch } = useQuery({
      queryKey: ['advertiseBikes'],
      queryFn: async () => {
         const res = await fetch('https://bike-one.vercel.app/advertiseBikes', {
            headers: {
               authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
         });
         const data = await res.json();
         return data;
      }
   })
   refetch();

   return (
      <>{
         (advertiseBikes && advertiseBikes?.length > 0) &&
         <div>
            <div className='flex justify-end'>
               <img src={advertising} className='md:w-20 w-10 ' alt="" />
            </div>
            <Marquee>
               <div className='flex gap-16 scale-y-50 scale-x-50'>
                  {
                     advertiseBikes.map(bike => <BikeCard key={bike?._id} bike={bike} txt={txt} />)
                  }
               </div>
            </Marquee>
         </div>
      }
      </>
   );
};

export default Advertise;