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


const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  backgroundColor: '#f6f6f8',
  paddingTop: 20,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingBottom: theme.spacing(10),
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
      <div>
        <NavBar />
        <div style={{ display: 'flex' }}>
          <SideBar />
          <MainStyle>
            <Outlet />
          </MainStyle>
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
          path: constants.deliveryHistoryURL,
          element: <div>Solicitud de pedido</div>
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
