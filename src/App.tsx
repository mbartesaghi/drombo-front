import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Dashboard from './pages/dashboard/dashboard';
import NavBar from './components/navBar/navBar';
import SideBar from './components/sideBar/sideBar';
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

function App() {

  const Layout = () => {
    return (
      <div>
        <NavBar />
        <div style={{display:'flex'}}>
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
      path: "/",
      element:<Layout />,
      children: [
        {
          path: constants.dashboardURL,
          element: <Dashboard />
        },
        {
          path: constants.requestDeliveryURL,
          element: <div>Solicitud de pedido</div>
        },
        {
          path: constants.deliveryHistoryURL,
          element: <div>Solicitud de pedido</div>
        }
      ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
