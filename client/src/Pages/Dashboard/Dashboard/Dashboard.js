import React from 'react';
import useTitle from '../../../Hooks/Title/useTitle';
import Profile from '../../Profile/Profile';

const Dashboard = () => {
   useTitle('DashBoard');

   return (
      <div>
         <Profile />
      </div>
   );
};

export default Dashboard;