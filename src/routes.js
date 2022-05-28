import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import DashboardApp from './pages/DashboardApp';
import InfoApp from './pages/InfoApp';
import { TweetsProvider } from './context';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard" /> },
        {
          path: '/dashboard', element: <TweetsProvider>
            <DashboardApp />
          </TweetsProvider>
        },
        { path: '/info', element: <InfoApp /> }
      ]
    }
  ]);
}
