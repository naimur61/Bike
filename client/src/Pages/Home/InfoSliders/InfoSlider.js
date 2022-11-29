import React from 'react';

const InfoSlider = ({ sld }) => {
   const { id, img, previews, next, title, about } = sld;



   return (
      <div id={`slide${id}`} className="carousel-item relative w-full rounded-lg">
         <div className="hero-content flex-col lg:flex-row items-start gap-10">
            <div>
               <img src={img} alt='' className="w-full rounded-md" />
            </div>

            <div className='lg:w-1/2' >
               <h1 className="text-5xl font-bold" style={{ fontFamily: "'Philosopher', sans-serif" }}>{title}</h1>
               <p className="py-6" style={{ fontFamily: "'Poppins', sans-serif" }}>{about}</p>
               {/* <div className="flex items-center gap-3 font mb-5 px-lg-5 m">
                  <p className="mb-0 text-red-500">Let's go</p>
               </div> */}
            </div>
         </div>
         <div className="absolute flex justify-between transform -translate-y-1/2 left-8 top-12 gap-5">
            <a href={`#slide${previews}`} className="btn btn-sm btn-circle sld-btn">❮</a>
            <a href={`#slide${next}`} className="btn btn-sm btn-circle sld-btn">❯</a>
         </div>
      </div>
   );
};

export default InfoSlider;