import React, { useEffect } from 'react';
import AppNavigation from '@components/app-navigation/AppNavigation.component';

const Dashboard = () => {
  useEffect(() => {}, []);

  return (
    <>
      <AppNavigation />
      <div>Welcome to the dashboard</div>
    </>
  );
};

export default Dashboard;
