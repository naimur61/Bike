import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layout/DashboardLayout/DashboardLayout';
import Main from '../../Layout/Main/Main';
import Bikes from '../../Pages/Bikes/Bikes';
import Blogs from '../../Pages/Blogs/Blogs';
import AddProduct from '../../Pages/Dashboard/AddProduct/AddProduct';
import Admin from '../../Pages/Dashboard/Admin/Admin';
import Buyers from '../../Pages/Dashboard/Buyers/Buyers';
import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard';
import MyOrders from '../../Pages/Dashboard/MyOrders/MyOrders';
import Payment from '../../Pages/Dashboard/MyOrders/Payment';
import MyProducts from '../../Pages/Dashboard/MyProducts/MyProducts';
import MyWishlist from '../../Pages/Dashboard/MyWishlist/MyWishlist';
import Sellers from '../../Pages/Dashboard/Sellers/Sellers';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login/Login';
import SignUp from '../../Pages/Login/SignUp/SignUp';
import Profile from '../../Pages/Profile/Profile';
import ErrorPage from '../../Pages/Shared/Error/ErrorPage';
import AdminRoute from '../AdminRoute/AdminRoute';
import BuyerRoute from '../BuyerRoute/BuyerRoute';
import PrivetRoutes from '../PrivetRoutes/PrivetRoutes';
import SellerRoute from '../SellerRoute/SellerRoute';




export const Routes = createBrowserRouter([

   // Main Layout 
   {
      path: '/', element: <Main />,
      errorElement: <ErrorPage />, children: [
         { path: '/', element: <Home /> },
         { path: '/home', element: <Home /> },
         { path: '/blog', element: <Blogs /> },
         {
            path: '/bikes/:brand', element: <PrivetRoutes><Bikes /></PrivetRoutes>,
            loader: ({ params }) => fetch(`https://bike-one.vercel.app/bikes/${params.brand}`)
         },
         { path: '/profile', element: <PrivetRoutes><Profile /></PrivetRoutes> }
      ]
   },

   // Dashboard Layout 
   {
      path: '/dashboard', element: <PrivetRoutes><DashboardLayout /></PrivetRoutes>, errorElement: <ErrorPage />, children: [
         { path: '/dashboard', element: <PrivetRoutes><Dashboard /></PrivetRoutes> },
         { path: '/dashboard/payment/:id', element: <PrivetRoutes><Payment /></PrivetRoutes>, loader: ({ params }) => fetch(`https://bike-one.vercel.app/payBike/${params.id}`) },


         { path: '/dashboard/myOrders', element: <BuyerRoute><MyOrders /></BuyerRoute> },
         { path: '/dashboard/myWishlists', element: <BuyerRoute><MyWishlist /></BuyerRoute> },

         { path: '/dashboard/myProducts', element: <SellerRoute><MyProducts /></SellerRoute> },
         { path: '/dashboard/addProduct', element: <SellerRoute><AddProduct /></SellerRoute> },

         { path: '/dashboard/sellers', element: <AdminRoute><Sellers /></AdminRoute> },
         { path: '/dashboard/buyers', element: <AdminRoute> <Buyers /></AdminRoute> },
         { path: '/dashboard/admins', element: <AdminRoute> <Admin /></AdminRoute> },
      ]
   },



   { path: '/login', element: <Login /> },
   { path: '/signup', element: <SignUp /> },
])

