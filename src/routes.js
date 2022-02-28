import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import DashboardApp from './pages/DashboardApp';
import InfoApp from './pages/InfoApp';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    { 
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '/dashboard', element: <DashboardApp /> },
        { path: '/info', element: <InfoApp /> }
      ]
    }
  ]);
}
