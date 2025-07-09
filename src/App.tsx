import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';

//Pages
import Dashboard from './pages/dashboard/dashboard';
import DeliveryRequest from './pages/deliveryRequest/deliveryRequest';

//Components
import NavBar from './components/navBar/navBar';
import SideBar from './components/sideBar/sideBar';

//Utils
import * as constants from './utils/constants';
import Routes from './pages/routes';
import TransfersHistory from './pages/transfers';


const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  backgroundColor: '#f9fafb',
  paddingTop: 20,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  [theme.breakpoints.up('lg')]: {
    paddingTop: 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const THEME = createTheme({
  typography: {
    "fontFamily": `"San Francisco", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});

function App() {

  const Layout = () => {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <NavBar />
        <div className="flex flex-1 overflow-hidden">
          <SideBar />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: constants.dashboardURL,
      element: <Layout />,
      children: [
        {
          path: constants.dashboardURL,
          element: <Dashboard />
        },
        {
          path: constants.requestDeliveryURL,
          element: <DeliveryRequest />
        },
        {
          path: constants.transfersHistoryURL,
          element: <TransfersHistory />
        },
        {
          path: constants.routesURL,
          element: <Routes />
        }
      ]
    },
  ]);

  return (
    <ThemeProvider theme={THEME}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
