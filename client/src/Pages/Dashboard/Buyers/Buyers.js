import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import TableRow from '../TableRow/TableRow';
import Modal from '../../Shared/Modal/Modal';



const Buyers = () => {
   const [selectUser, setSelectUser] = useState(null);


   const { data: users = [], refetch } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
         const res = await fetch('https://bike-one.vercel.app/users?role=Buyer', {
            headers: {
               authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
         });
         const data = await res.json();
         return data;
      }
   })
   refetch();


   return (
      <div>
         <div>
            <div className="overflow-x-auto">
               <table className="table w-full">
                  <thead>
                     <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Remove</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        users.map((user, i) => <TableRow key={user._id} i={i} user={user} setSelectUser={setSelectUser} />)
                     }
                  </tbody>
               </table>
               {selectUser &&
                  <Modal selectUser={selectUser} setSelectUser={setSelectUser} refetch={refetch} />
               }
            </div>
         </div>
      </div>
   );


};

export default Buyers;