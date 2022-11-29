import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../Hooks/Auth/useAuth';
import { format } from "date-fns";





const AddProduct = () => {
   const imageHostKey = process.env.REACT_APP_imgbb_key;
   const { user } = useAuth();
   const { register, handleSubmit, formState: { errors } } = useForm();
   const navigate = useNavigate();
   const postTime = format(new Date(), "PP");


   const onSubmit = (data, e) => {
      const dateFormate = (format(new Date(data.purchaseYears), "Pp")).split(',');
      const date = dateFormate[0];

      const image = data.image[0];
      const formData = new FormData();
      formData.append('image', image);
      const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
      fetch(url, {
         method: 'POST',
         body: formData,
      })
         .then(res => res.json())
         .then(imgData => {
            // console.log(imgData.data.url);

            if (imgData) {
               const bikeObj = {
                  sellerName: user?.displayName,
                  sellerEmail: user?.email,
                  seller_Ph_No: data.mobile,
                  location: data.location,
                  description: data.description,
                  purchaseYears: date,
                  postTime,
                  brand: data.brand,
                  modelName: data.modelName,
                  photoURL: imgData.data.url,
                  orgPrice: data.orgPrice,
                  rslPrice: data.rslPrice,
                  condition: data.condition,
                  productStatus: "Available",
               };
               sendInfo(bikeObj);
            }
         })
   };


   // Send information to server 
   const sendInfo = (bikeObj) => {
      fetch('https://bike-one.vercel.app/bikes', {
         method: "POST",
         headers: {
            'content-type': 'application/json',
            authorization: `bearer ${localStorage.getItem('accessToken')}`
         },
         body: JSON.stringify(bikeObj)
      })
         .then(res => res.json())
         .then(data => {
            if (data.acknowledged === true) {
               successToast('Product added successful.')
               navigate('/dashboard/myProducts');
            }
         })

   }



   // ToastyFye 
   const successToast = (done) => {
      toast.success(done, {
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
      <div className=" login-form">
         <div className='px-5 md:px-0 my-14'>

            <div className="card md:w-10/12 bg-base-100 shadow-xl mx-auto">
               <div className="card-body">
                  <h1 className='font-bold text-3xl mb-4 text-center text-info font-serif'>Add Product</h1>

                  <form onSubmit={handleSubmit(onSubmit)}>

                     {/* Name */}
                     <span className="label-text font-semibold">Enter Your Full Name</span>
                     <input type='text' defaultValue={user?.displayName} disabled {...register("name")} className="input input-bordered w-full  block  mb-3" />



                     {/* Email  */}
                     <span className="label-text font-semibold">Enter Your
                        email</span>
                     <input defaultValue={user?.email} disabled type='email' {...register("email")} className="input input-bordered w-full  block  mb-3" />



                     {/* mobile  */}
                     <span className="label-text font-semibold">Enter Your Phone Number</span>
                     <input placeholder="Phone Number" type='number' {...register("mobile", { required: "Your Phone Number field is empty" })} className="input input-bordered w-full  block  mb-3" />
                     {errors.mobile && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>{errors.mobile.message}</small>}


                     {/* location  */}
                     <span className="label-text font-semibold">Enter Your Location</span>
                     <input placeholder="Location" type='text' {...register("location", { required: true })} className="input input-bordered w-full  block  mb-3" />
                     {errors.location && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>Your Location field is empty</small>}


                     {/* description  */}
                     <span className="label-text font-semibold">Why you want to sell this product.</span>
                     <textarea placeholder="Say something..." {...register("description", { required: "Your Description field is empty", minLength: { value: 20, message: "Description must be 20 character." } })} className="textarea textarea-bordered w-full  block  mb-3" ></textarea>
                     {errors.description && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>{errors.description?.message}</small>}


                     {/* purchaseYears */}
                     <span className="label-text font-semibold">When you Brought this product :</span>
                     <input type="date"  {...register("purchaseYears", { required: "Your Purchase Years field is empty" })} className="textarea textarea-bordered w-full  block  mb-3" />
                     {errors.purchaseYears && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>{errors.purchaseYears?.message}</small>}


                     {/* Brand  */}
                     <span className="label-text font-semibold">Select Your Product's Brand</span>
                     <select  {...register("brand", { required: "Your Product's Brand field is empty" })} className="select select-bordered  w-full  block  mb-3">
                        <option>Royal-Enfield</option>
                        <option>Yamaha</option>
                        <option>GPX</option>
                        <option>Suzuki</option>
                     </select>
                     {errors.brand && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> {errors.brand?.message}</small>}

                     {/* modelName  */}
                     <span className="label-text font-semibold">Enter Your Model Name</span>
                     <input placeholder="Model Name" type='text' {...register("modelName", { required: "Your Model Name field is empty" })} className="input input-bordered w-full  block  mb-3" />
                     {errors.modelName && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>{errors.modelName?.message}</small>}


                     {/* Image */}
                     <span className="label-text font-semibold">Select your Product Picture.</span>
                     <input type="file" className="file-input file-input-bordered file-input-info w-full block  mb-3" {...register("image", { required: "Your Product Picture field is empty" })} />
                     {errors.image && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> {errors.image?.message}</small>}


                     {/* orgPrice  */}
                     <span className="label-text font-semibold">Enter Your Original Price</span>
                     <input placeholder="Price" type='number' {...register("orgPrice", { required: "Your Original Price field is empty" })} className="input input-bordered w-full  block  mb-3" />
                     {errors.orgPrice && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>{errors.orgPrice?.message}</small>}



                     {/* rslPrice  */}
                     <span className="label-text font-semibold">Enter Your Sells Price</span>
                     <input placeholder="Price" type='number' {...register("rslPrice", { required: "Your Sells Price field is empty" })} className="input input-bordered w-full  block  mb-3" />
                     {errors.rslPrice && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>{errors.rslPrice?.message}</small>}



                     {/* Condition */}
                     <span className="label-text font-semibold">Select Your Product Condition</span>
                     <select  {...register("condition", { required: "Your Product Condition field is empty" })} className="select select-bordered  w-full  block  mb-3">
                        <option>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                     </select>
                     {errors.condition && <small className='block bg-red-300 px-4 mt-2 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> {errors.condition?.message}</small>}

                     <div className="flex justify-center items-center mt-5">
                        <input type="submit" placeholder='Register' className=' w-fit px-10 py-3 btn btn-info hover:bg-cyan-600 text-white font-serif font-bold block' />
                     </div>
                  </form>
               </div >
               <ToastContainer />
            </div>
         </div>
      </div>
   );
}

export default AddProduct;