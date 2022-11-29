import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Hooks/Auth/useAuth';
import useBuyer from '../../Hooks/Buyer/useBuyer';
import { Loader } from '../../Pages/Shared/Loader/Loader';

const BuyerRoute = ({ children }) => {
   const { user, loading } = useAuth();
   const [isBuyer, buyerLoading] = useBuyer(user?.email)
   const location = useLocation()

   if (loading || buyerLoading) {
      return <Loader />;
   }

   if (user && isBuyer) {
      return children;
   }

   return <Navigate to='/login' state={{ from: location }} replace />
};

export default BuyerRoute;