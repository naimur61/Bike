import React from 'react';
import { CategoryBtn } from './CategoryBtn';

const Categories = () => {
   const allCategories = ['Royal-Enfield', 'Yamaha', 'GPX', 'Suzuki'];


   return (
      <div className='lg:w-6/12 md:w-9/12 mx-auto px-5 grid gap-10 justify-items-center md:grid-cols-2 '>
         {
            allCategories.map((ctgName, i) => <CategoryBtn key={i} ctgName={ctgName} />)
         }
      </div>
   );
};

export default Categories;