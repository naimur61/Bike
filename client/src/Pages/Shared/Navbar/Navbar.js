import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logout from '../../../Assets/Login/logout.svg'
import profile from '../../../Assets/Login/profile.svg'
import userImg from '../../../Assets/Login/user.svg'
import bike from "../../../Assets/Icon/motorbike.png";
import drBtn from '../../../Assets/Icon/dashboard.png';
import './Navbar.css'
import { useAuth } from '../../../Hooks/Auth/useAuth';



const Navbar = () => {
   const location = useLocation();
   const { user, userLogout } = useAuth();

   const handlerLogout = () => {
      userLogout()
         .then(() => { })
         .catch(error => console.error(error))
   }



   const navLink = <>
      <li><NavLink className={({ isActive }) => isActive ? 'active' : undefined} to='/home'>Home</NavLink></li>
      <li><NavLink to='/blog'>Blogs</NavLink></li>
      {
         (user || user?.uid) &&
         <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
      }
   </>



   return (
      <div className="navbar shadow-md">
         <div className="navbar-start">
            <div className="dropdown">
               <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
               </label>
               <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 header-style">
                  {navLink}
               </ul>
            </div>
            <Link to='/' className='text-3xl text-sky-600 flex items-center gap-2 font-semibold'><img className="w-11 h-11 rounded-full" src={bike} alt="" />  <span style={{ fontFamily: "'Acme', sans-serif" }}>Bike.</span></Link>
         </div>
         <div className="navbar-end">
            <div className="navbar-center hidden lg:flex mr-5">
               <ul className="menu menu-horizontal p-0 header-style">
                  {navLink}
               </ul>
            </div>
            {/* Dashboard btn  */}
            <div>
               {
                  ((location.pathname === '/dashboard') || (location.pathname.startsWith('/dashboard/'))) &&
                  <>
                     <label htmlFor="dashboard-drawer" className='w-fit cursor-pointer'><img src={drBtn} alt="" className='w-5  lg:hidden md:w-7' /></label>

                     {/* Profile  */}
                     <div className=' hidden lg:inline-block'>
                        {(user || user?.uid) ?

                           <div className="dropdown dropdown-end">
                              <label tabIndex={0} className="btn btn-ghost btn-circle ">
                                 <div className="w-10 rounded-full">
                                    {
                                       (user?.photoURL !== null) ?
                                          <img className="w-10 h-10 rounded-full" src={user?.photoURL
                                          } alt='' />
                                          :
                                          <img src={userImg} alt='' />
                                    }
                                 </div>
                              </label>
                              <ul tabIndex={0} className="mt-3 p-2  menu menu-compact dropdown-content bg-base-100 shadow-lg rounded-box w-52">
                                 <li>
                                    <Link to='/profile' className="justify-between">
                                       <img className='profile-i rounded-full' src={!(user?.photoURL === null) ? user?.photoURL : profile} alt="" />
                                       <span className="badge">{(user?.displayName !== null) ?
                                          user?.displayName
                                          : 'New'}</span>
                                    </Link>
                                 </li>
                                 <li><Link to='/login' onClick={handlerLogout} ><img className='profile-i' src={logout} alt="" />Logout</Link></li>
                              </ul>
                           </div>
                           :
                           <div className="w-10 rounded-full">
                              <Link to='/login'><img src={userImg} alt='' /></Link>
                           </div>
                        }
                     </div>
                  </>
               }
            </div>

            {/* Profile  */}
            {!((location.pathname === '/dashboard') || (location.pathname.startsWith('/dashboard/'))) &&
               <div>
                  {(user || user?.uid) ?

                     <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle ">
                           <div className="w-10 rounded-full">
                              {
                                 (user?.photoURL !== null) ?
                                    <img className="w-10 h-10 rounded-full" src={user?.photoURL
                                    } alt='' />
                                    :
                                    <img src={userImg} alt='' />
                              }
                           </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2  menu menu-compact dropdown-content bg-base-100 shadow-lg rounded-box w-52">
                           <li>
                              <Link to='/profile' className="justify-between">
                                 <img className='profile-i rounded-full' src={!(user?.photoURL === null) ? user?.photoURL : profile} alt="" />
                                 <span className="badge">{(user?.displayName !== null) ?
                                    user?.displayName
                                    : 'New'}</span>
                              </Link>
                           </li>
                           <li><Link to='/login' onClick={handlerLogout} ><img className='profile-i' src={logout} alt="" />Logout</Link></li>
                        </ul>
                     </div>
                     :
                     <div className="w-10 rounded-full">
                        <Link to='/login'><img src={userImg} alt='' /></Link>
                     </div>
                  }
               </div>
            }
         </div>
      </div>
   );
};

export default Navbar;




