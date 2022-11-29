import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../Hooks/Auth/useAuth';
import { GoArrowSmallLeft } from 'react-icons/go';
import { useState } from "react";
import useToken from "../../../Hooks/Token/useToken";




const SignUp = () => {
   const imageHostKey = process.env.REACT_APP_imgbb_key;
   const { createAccountByEmail, updateUserProfile } = useAuth();
   const { register, handleSubmit, formState: { errors } } = useForm();
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';
   const [userEmail, setUserEmail] = useState('');
   const [token] = useToken(userEmail);


   if (token) {
      navigate(from, { replace: true })
   }



   const onSubmit = (data, e) => {
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
               const userObj = {
                  displayName: data.name,
                  photoURL: imgData.data.url
               };

               createAccountByEmail(data.email, data.password)
                  .then(result => {
                     const user = result.user;

                     updateUserProfile(userObj)
                        .then(() => {
                           // saveUser(data.email, data.name)
                           console.log(user);
                           saveUser(data.name, data.email, data.role)
                           e.target.reset();

                        })
                        .catch(er => console.log(er))
                  })
                  .catch(er => {
                     console.log(er);
                     errorToast(er.message)
                  })
            }
         })
   };


   const saveUser = (name, email, role) => {
      const info = {
         name,
         email,
         role
      }
      fetch('https://bike-one.vercel.app/users', {
         method: 'POST',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify(info)
      })
         .then(res => res.json())
         .then(data => {
            setUserEmail(email)
            successToast('SignUp successfully.')
         })
   }




   // ToastyFye 
   const successToast = (done) => {
      toast.success(done, {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
      });
   }

   const errorToast = (er) => {
      toast.error(er, {
         position: "top-center",
         autoClose: 5000,
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
         <div className='flex justify-end mt-4 mr-5 md:mr-14'><Link to='/' className='font-bold text-4xl ' style={{ fontFamily: '"Permanent Marker", cursive', color: '#E11244' }}>X</Link></div>

         <div className='px-5 md:px-0 mt-12'>


            <div className="card md:w-6/12 bg-base-100 shadow-xl mx-auto">
               <div className="card-body">
                  <h1 className='text-secondary font-bold text-2xl text-center'>Sign up</h1>

                  <form onSubmit={handleSubmit(onSubmit)}>

                     {/* Name */}
                     <span className="label-text font-semibold">Enter Your Full Name</span>
                     <input type='text' placeholder="Enter your name." {...register("name", { required: true })} className="input input-bordered w-full  block  mb-2" />
                     {/* errors will return when field validation fails  */}
                     {errors.name && <small className='block bg-red-300 px-4 mt-1 mb-4  py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> Name must be required</small>}


                     {/* Image */}
                     <span className="label-text font-semibold">Select your Profile Picture.</span>
                     <input type="file" className="file-input file-input-bordered file-input-info w-full block  mb-2" {...register("image", { required: true })} />
                     {/* errors will return when field validation fails  */}
                     {errors.image && <small className='block bg-red-300 px-4 mt-1 mb-4 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> Image must be required</small>}


                     {/* Role */}
                     <span className="label-text font-semibold">Select Your Role</span>
                     <select  {...register("role", { required: true })} className="select select-bordered  w-full  block  mb-2">
                        <option>Buyer</option>
                        <option>Seller</option>
                     </select>
                     {errors.role && <small className='block bg-red-300 px-4 mt-1 mb-4 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'> Role must be required</small>}


                     {/* Email  */}
                     <span className="label-text font-semibold">Enter Your Email</span>
                     <input placeholder="Email" type='email' {...register("email", { required: true })} className="input input-bordered w-full  block  mb-2" />
                     {errors.email && <small className='block bg-red-300 px-4 mt-1 mb-4 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>Email must be required</small>}


                     {/* Password */}
                     <span className="label-text font-semibold">Enter Your Password</span>

                     <input type='password' placeholder='Password' {...register("password", { required: "Password must be required.", minLength: { value: 6, message: "Password must be min six digit." }, pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: "Password must be strong." } })} className="input input-bordered w-full  block" />
                     {/* errors will return when field validation fails  */}
                     {errors.password && <small className='block bg-red-300 px-4 mt-1 mb-4 py-1 text-red-700 font-serif font-semibold rounded-lg w-fit'>{errors.password.message}</small>}

                     <div className="flex justify-between items-center mt-5">
                        {/* Back for signIn  */}
                        <strong><Link to='/login' className='text-info font-bold'><GoArrowSmallLeft className="inline font-bold text-4xl" />Sign in</Link></strong>

                        <input type="submit" placeholder='Register' className=' w-fit btn btn-sm my-3 block' />
                     </div>
                  </form>
               </div >
               <ToastContainer />
            </div>
         </div>
      </div>
   );
}

export default SignUp;