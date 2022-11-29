import React from 'react';
import useTitle from '../../../Hooks/Title/useTitle';
import Advertise from '../Advertise/Advertise';
import Banner from '../Banner/Banner';
import InfoSliders from '../InfoSliders/InfoSliders';
import './Home.css'
import HappyClient from '../HappyClient/HappyClient';
import About from '../About/About';
import Categories from '../Categories/Categories';


const Home = () => {
   useTitle('Home')

   return (
      <div className=' mb-16'>
         {/* Banner  */}
         <div>
            <Banner />
         </div>

         {/* Advertise  */}
         <div className='my-14'>
            <Advertise />
         </div>


         {/* Category Name  */}
         <div>
            <Categories />
         </div>


         {/* slider with info  */}
         <div className='my-14'>
            <InfoSliders />
         </div>

         {/* History  */}
         <div>
            <HappyClient />
         </div>

         {/* About  */}
         <div>
            <About />
         </div>

      </div>
   );
};

export default Home;