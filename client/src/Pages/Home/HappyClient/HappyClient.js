import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Loader } from '../../Shared/Loader/Loader';
import ClientImg from './ClientImg';
import './HappyClient.css'





const HappyClient = () => {

   const { data: clientsImg = [], isLoading } = useQuery({
      queryKey: ['clientsImg'],
      queryFn: async () => {
         const res = await fetch('https://bike-one.vercel.app/history');
         const data = await res.json();
         return data;
      }
   })

   if (isLoading) {
      return <Loader />;
   }


   return (
      <div className='mx-10 my-10'>
         <p className=' text-center text-xl font-bold font-serif  text-red-500'>History</p>

         <div className="text-center font mb-5 px-lg-5 m">
            <p className="mb-0 text-gray-700">Our Best sell's</p>
         </div>

         <div className='memoryBox-container'>
            {
               clientsImg.map(client => <ClientImg key={client._id} client={client} />)
            }
         </div>
      </div>
   );
};

export default HappyClient;