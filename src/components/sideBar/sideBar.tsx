import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import { SideBarWrapper, MenuLink } from './styles';
import * as constants from '../../utils/constants';

const SideBar = () => {
  return (
    <SideBarWrapper>
      <MenuLink to={constants.dashboardURL}>
        <DashboardRoundedIcon />
        <span>Dashboard</span>
      </MenuLink>
      <MenuLink to={constants.requestDeliveryURL}>
        <AssignmentIcon />
        <span>Solicitar traslado</span>
      </MenuLink>
      <MenuLink to={constants.deliveryHistoryURL}>
        <HistoryRoundedIcon />
        <span>Traslados realizados</span>
      </MenuLink>
    </SideBarWrapper>
  );
}

export default SideBar;

