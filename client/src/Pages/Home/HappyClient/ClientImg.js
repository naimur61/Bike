import React from 'react';

const ClientImg = ({ client }) => {
   const { img, brand } = client;
   // console.log(client);

   return (
      <div className='memoryBox'>
         <img src={img} alt="" />
         <span>Brand</span>
         <h3>{brand}</h3>
      </div>
   );
};

export default ClientImg;