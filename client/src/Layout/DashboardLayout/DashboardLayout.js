import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/Admin/useAdmin';
import useBuyer from '../../Hooks/Buyer/useBuyer';
import useSeller from '../../Hooks/Seller/useSeller';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import logout from '../../Assets/Login/logout.svg'






const DashboardLayout = () => {
   const { user, userLogout } = useContext(AuthContext);
   const [isAdmin] = useAdmin(user?.email)
   const [isSeller] = useSeller(user?.email)
   const [isBuyer] = useBuyer(user?.email)


   const handlerLogout = () => {
      userLogout()
         .then(() => { })
         .catch(error => console.error(error))
   }



   return (
      <div className=' mx-auto container'>
         <Navbar />
         <div className="drawer drawer-mobile">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content px-5 md:px-14 my-16">
               <Outlet />

            </div>
            <div className="drawer-side">
               <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

               <ul className="menu p-4 w-80 bg-white lg:bg-opacity-0">

                  <li className='lg:hidden'>
                     <Link to='/profile'>
                        <img className="w-10 h-10 rounded-full" src={user?.photoURL
                        } alt='' />
                        <span className="badge">{(user?.displayName !== null) ?
                           user?.displayName
                           : 'New'}</span>
                     </Link>
                  </li>

                  <li className='lg:hidden'>
                     <Link to='/login' onClick={handlerLogout} ><img className='profile-i' src={logout} alt="" />Logout</Link>
                  </li>

                  {/* user's  */}
                  {isBuyer &&
                     <>
                        <li><Link to='/dashboard/myOrders'>My Orders</Link></li>
                        <li><Link to='/dashboard/myWishlists'>My wishlists</Link></li>
                     </>
                  }

                  {/* seller  */}
                  {isSeller &&
                     <>
                        <li><Link to='/dashboard/myProducts'>My Products</Link></li>
                        <li><Link to='/dashboard/addProduct'>Add Product</Link></li>
                     </>
                  }

                  {/* Admin */}
                  {isAdmin &&
                     <>
                        <li><Link to='/dashboard/admins'>Admins</Link></li>
                        <li><Link to='/dashboard/sellers'>Sellers</Link></li>
                        <li><Link to='/dashboard/buyers'>Buyers </Link></li>
                     </>
                  }
               </ul>

            </div>
         </div>

      </div>
   );
};

export default DashboardLayout;