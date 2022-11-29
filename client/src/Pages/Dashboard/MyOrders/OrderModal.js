import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { BsTrashFill } from 'react-icons/bs';
import warning from '../../../Assets/Icon/warning.png';




const OrderModal = ({ selectOrder, setSelectOrder, successToast }) => {
   const { key, order } = selectOrder;



   const deleteProduct = (id) => {
      fetch(`https://bike-one.vercel.app/orders/${id}`, {
         method: "DELETE",
         headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         }
      })
         .then(res => res.json())
         .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
               successToast('Delete Successful.')
               setSelectOrder(null);
            }
         })
   }



   return (
      <div>
         <input type="checkbox" id="order-modal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box relative">
               <label htmlFor="order-modal" onClick={() => setSelectOrder(null)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

               <div className="w-20 mx-auto">
                  <img src={warning} alt="" />
               </div>
               <p className="py-4 text-center">Do you want to {key}<strong> {order?.productName}</strong>   from your order list ?</p>

               <div onClick={() => deleteProduct(order._id)} className='flex items-center mx-auto gap-2 bg-red-500 text-white w-28 px-5 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-500 border border-red-500 hover:scale-110 transition-all'>
                  <BsTrashFill /> <strong>Delete</strong>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrderModal;