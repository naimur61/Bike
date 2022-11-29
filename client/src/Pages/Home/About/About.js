import React from 'react';
import './About.css'

const About = () => {
   return (
      <div className='about-bg p-5 md:p-20'>
         <div className="text-center font mb-5 px-lg-5">
            <p className="mb-0 text-gray-700 w-fit px-10 py-5 rounded-lg mx-auto about-txt">About <span className=' text-red-500'>Us</span> </p>
         </div>
         <div className='px-20 py-5 about-txt rounded-lg text-black font-bold'>
            <p>With more than 18 million motorcycles sold in over 70 countries, the Bajaj brand is truly ‘The World’s Favourite Indian’. It is India’s No.1 motorcycle exporter with two out of three bikes sold internationally carrying a Bajaj badge. The company is also the world’s largest manufacturer of three-wheelers. Bajaj Auto is the first two-wheeler and three-wheeler company in the world to have reached a market capitalisation of INR one trillion and continues to be the world’s most valuable two and three-wheeler company.
            </p>
         </div>
      </div>
   );
};

export default About;