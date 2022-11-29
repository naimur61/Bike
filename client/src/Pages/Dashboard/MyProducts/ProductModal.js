import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { BsTrashFill } from 'react-icons/bs';
import warning from '../../../Assets/Icon/warning.png';





const ProductModal = ({ selectProduct, setSelectProduct, refetch }) => {

   const { _id, modelName } = selectProduct;

   const deleteProduct = (id) => {
      fetch(`https://bike-one.vercel.app/bikes/${id}`, {
         method: "DELETE",
         headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         }
      })
         .then(res => res.json())
         .then(data => {
            if (data.deletedCount > 0) {
               successToast('Delete Successful.')
               setSelectProduct(null);
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
         <input type="checkbox" id="product-modal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box relative">
               <label htmlFor="product-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

               <div className="w-20 mx-auto">
                  <img src={warning} alt="" />
               </div>
               <p className="py-4 text-center">Do you want to delete <strong>{modelName}</strong>  permanently ?</p>

               <div onClick={() => deleteProduct(_id)} className='flex items-center mx-auto gap-2 bg-red-500 text-white w-28 px-5 py-2 rounded-md cursor-pointer hover:bg-white hover:text-red-500 border border-red-500 transition-all'>
                  <BsTrashFill /> <strong>Delete</strong>
               </div>
            </div>
         </div>
         <ToastContainer />
      </div>
   );
};

export default ProductModal;