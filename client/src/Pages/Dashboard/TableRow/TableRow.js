import React from 'react';
import warning from '../../../Assets/Icon/warning.png';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineError } from 'react-icons/md';


const TableRow = ({ user, i, setSelectUser, refetch }) => {

   const verifySeller = (txt) => {
      fetch(`https://bike-one.vercel.app/usersVerify/admin/${user._id}`, {
         method: 'PUT',
         headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         },
         body: JSON.stringify({ sellerVerify: txt })
      })
         .then(res => res.json())
         .then(data => {
            if (data.modifiedCount > 0) {
               refetch();
            }
         })
   }

   const updateRole = (user) => {
      const infoObj = {
         user,
         message: 'Do you want to change role of',
         key: 'Role',
         sing: '?'
      }
      setSelectUser(infoObj);
   }
   const removeUser = (user) => {
      const infoObj = {
         user,
         message: 'Do you want to remove',
         key: 'Remove',
         sing: '?'
      }
      setSelectUser(infoObj);
   }

   return (
      <tr className="hover">
         <th>{i + 1}</th>
         <td>{user?.name}</td>
         <td>{user?.email}</td>

         {user?.role === 'Admin' && <td> <FaCheckCircle className=' text-green-500 text-2xl' /></td>}

         {user?.role === 'Seller' && <td>{
            (!(user?.sellerVerify) || user?.sellerVerify !== "Verified") ?
               <MdOutlineError onClick={() => verifySeller('Verified')} className=' text-red-500 text-2xl cursor-pointer' />
               :
               <FaCheckCircle onClick={() => verifySeller("Unverified")} className=' text-green-500 text-2xl cursor-pointer' />
         }</td>}

         <td><label htmlFor="admin-modal" onClick={() => updateRole(user)} className='btn btn-sm btn-info px-auto w-20 text-white text-md font-semibold'>{user?.role}</label></td>
         <td>
            <label onClick={() => removeUser(user)} htmlFor="admin-modal" className="w-fit"><img src={warning} alt="" className='w-7 h-7 cursor-pointer' /></label>
         </td>
      </tr>
   );
};

export default TableRow;