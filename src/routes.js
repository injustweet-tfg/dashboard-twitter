import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import DashboardApp from './pages/DashboardApp';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      element: <DashboardLayout />,
      children: [
        { element: <DashboardApp /> }
      ]
    }
  ]);
}
