import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Hooks/Admin/useAdmin';
import { useAuth } from '../../Hooks/Auth/useAuth';
import { Loader } from '../../Pages/Shared/Loader/Loader';

const AdminRoute = ({ children }) => {
   const { user, loading } = useAuth();
   const [isAdmin, adminLoading] = useAdmin(user?.email)
   const location = useLocation()

   if (loading || adminLoading) {
      return <Loader />;
   }

   if (user && isAdmin) {
      return children;
   }

   return <Navigate to='/login' state={{ from: location }} replace />
};

export default AdminRoute;