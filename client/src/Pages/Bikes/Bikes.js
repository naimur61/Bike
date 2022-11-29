import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BikeCard from '../Shared/BikeCard/BikeCard';



const Bikes = () => {
   const bikes = useLoaderData();



   return (
      <div className='my-20 px-5'>
         <div className=' grid  lg:grid-cols-2 gap-10 md:w-10/12 mx-auto justify-items-center'>
            {bikes.map(bike => <BikeCard key={bike?._id} bike={bike} />)}
         </div>
      </div>
   );
};

export default Bikes;
