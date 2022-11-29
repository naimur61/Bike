import React from 'react';
import slider1 from "../../../Assets/images/slider/banner1.jpg";
import slider2 from "../../../Assets/images/slider/banner2.jpg";
import slider3 from "../../../Assets/images/slider/banner3.jpg";
import slider4 from "../../../Assets/images/slider/banner4.jpg";
import { SliderBtn } from './SliderBtn';
import SliderImg from './SliderImg';
import './Banner.css'


const Banner = () => {

   const sliders = [
      {
         id: 1,
         img: slider1,
         previews: 3,
         next: 2
      },
      {
         id: 2,
         img: slider2,
         previews: 1,
         next: 3
      },
      {
         id: 3,
         img: slider3,
         previews: 2,
         next: 4
      },
      {
         id: 4,
         img: slider4,
         previews: 3,
         next: 1
      },
   ]




   return (
      <div>
         <div className="carousel w-full banner-css" >
            {/* Slider image  */}
            {
               sliders.map(sld => <SliderImg key={sld.id} sld={sld} />)
            }
         </div>
         <div className="flex justify-start w-full py-2 gap-1 md:gap-2 absolute top-16 pl-3 md:mt-2">
            {/* Slider Button  */}
            {
               sliders.map(sld => <SliderBtn key={sld.id} sld={sld} />)
            }
         </div>
      </div>
   );
};

export default Banner;