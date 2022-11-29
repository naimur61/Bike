import React from 'react';

const SliderImg = ({ sld }) => {
   return (
      <div id={`item${sld.id}`} className="carousel-item w-full">
         <img src={sld.img} alt='' className="w-full" />
      </div>
   );
};

export default SliderImg;