import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Hooks/Auth/useAuth';
import useSeller from '../../Hooks/Seller/useSeller';
import { Loader } from '../../Pages/Shared/Loader/Loader';

const SellerRoute = ({ children }) => {
   const { user, loading } = useAuth();
   const [isAdmin, adminLoading] = useSeller(user?.email)
   const location = useLocation()

   if (loading || adminLoading) {
      return <Loader />;
   }

   if (user && isAdmin) {
      return children;
   }

   return <Navigate to='/login' state={{ from: location }} replace />
};

export default SellerRoute;