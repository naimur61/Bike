import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { useAuth } from '../../../Hooks/Auth/useAuth';
import useTitle from '../../../Hooks/Title/useTitle';
import './Error.css'



const ErrorPage = () => {
   useTitle('404')
   const { userLogout } = useAuth();
   const error = useRouteError();


   return (
      <div id='container'>
         <div className='content'>
            <h2 className='erHeader'>404</h2>
            <h4>Opps! Something went wrong !</h4>
            <p>{error.statusText || error.message}</p>
            <h3>Please <Link to='/login'><button onClick={() => userLogout()}>LogOut</button></Link> and log back in.</h3>
         </div>
      </div>
   );
};

export default ErrorPage;