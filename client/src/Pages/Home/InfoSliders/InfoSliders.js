import React from 'react';
import InfoSlider from './InfoSlider';
import tech1 from '../../../Assets/images/slider/tech2.jpg';
import tech2 from '../../../Assets/images/slider/tech1.jpg';
import tech3 from '../../../Assets/images/slider/tech3.jpg';
import tech4 from '../../../Assets/images/slider/tech4.jpg';




const InfoSliders = () => {
   const sliders = [
      {
         id: 1,
         img: tech1,
         title: "SNS Suspension",
         about: "Patented by Bajaj and designed to ensure sage comfort, SNS (Spring-in-Spring) suspension gear enhances balance, and reduces recoil and lends mature riding stability, for both the everyday city rider and avid biking enthusiast alike.",
         previews: 3,
         next: 2
      },
      {
         id: 2,
         img: tech2,
         title: "EXHAUSTEC",
         about: "Bajaj has smartly designed the ExhausTEC ‘Torque Expansion Chamber’ that significantly amps up torque to derive the best fuel-efficiency on every-day, low and mid-intensity riding and is appreciated by riders across the world.",
         previews: 1,
         next: 3
      },
      {
         id: 3,
         img: tech3,
         title: "4-Valve Technology",
         about: "Our 4-valve Technology improves engine capabilities by augmenting power produced while keeping the engine healthier for longer, thus significantly increasing durability for bikers the world-over.",
         previews: 2,
         next: 4
      },
      {
         id: 4,
         img: tech4,
         title: "DTSi Technology",
         about: "Bajaj’s patented DTSi - Digital Twin/ Triple Spark Ignition Technology intelligently makes fuel combustion more efficient, adding power and improving mileage to suit all kinds of riding needs in busy cities and open terrains.",
         previews: 3,
         next: 1
      },


   ]

   return (
      <div className='my-16'>
         {/* Slider section  */}
         <div className="carousel w-10/12 mx-auto">
            {
               sliders.map(sld => <InfoSlider key={sld.id} sld={sld} />)
            }
         </div>
      </div>
   );
};

export default InfoSliders;