import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { BsTrashFill } from 'react-icons/bs';
import caution from '../../../Assets/Icon/caution.png';
import warning from '../../../Assets/Icon/warning.png';




const Modal = ({ selectUser, setSelectUser, refetch }) => {
   const { register, handleSubmit } = useForm();

   const { user, message, key, sing } = selectUser;

   const onSubmit = (data) => {

      fetch(`https://bike-one.vercel.app/users/admin/${user._id}`, {
         method: 'PUT',
         headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         },
         body: JSON.stringify(data)
      })
         .then(res => res.json())
         .then(data => {
            if (data.modifiedCount > 0) {
               refetch();
               successToast('Update Successful.')
               setSelectUser(null);
            }
         })
   }



   const deleteUser = (user) => {
      fetch(`https://bike-one.vercel.app/users/${user._id}`, {
         method: "DELETE",
         headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         }
      })
         .then(res => res.json())
         .then(data => {
            if (data.deletedCount > 0) {
               successToast('Delete Successful.')
               setSelectUser(null);
               refetch();
            }
         })
   }

   const successToast = (er) => {
      toast.success(er, {
         position: "top-center",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
   }


   return (
      <div>
         {/* Put this part before </body> tag */}
         <input type="checkbox" id="admin-modal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box relative">
               <label htmlFor="admin-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
               <div className="w-20 mx-auto">
                  {key === 'Remove' && <img src={warning} alt="" />}
                  {key === 'Role' && <img src={caution} alt="" />}

               </div>
               <p className="py-4 text-center">{message} {user.name} {sing}</p>
               {key === 'Remove' &&
                  <div onClick={() => deleteUser(user)} className='flex items-center mx-auto gap-2 bg-red-500 text-white w-28 px-5 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-500 border border-red-500 transition-all'>
                     <BsTrashFill /> <strong>Delete</strong>
                  </div>
               }
               {/* Role */}
               {key === 'Role' &&
                  <form onSubmit={handleSubmit(onSubmit)} className='w-10/12 mx-auto'>
                     <span className="label-text font-semibold">Select Your Role</span>
                     <select {...register("role", { required: true })} className="select select-bordered  w-full  block  mb-2">
                        <option>Buyer</option>
                        <option>Seller</option>
                        <option>Admin</option>
                     </select>

                     <div className='flex justify-end'>
                        <input type="submit" placeholder='Update' className='btn btn-info text-white font-bold font-serif btn-sm block my-3' />
                     </div>
                  </form>

               }
               <ToastContainer />
            </div>
         </div>
      </div>
   );
};

export default Modal;