import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import Timeline from "@mui/icons-material/Timeline";
import { NavLink } from "react-router-dom";
import * as constants from "../../utils/constants";

const navItems = [
  {
    to: constants.dashboardURL,
    icon: DashboardRoundedIcon,
    label: "Dashboard",
  },
  {
    to: constants.requestDeliveryURL,
    icon: AssignmentIcon,
    label: "Solicitar traslado",
  },
  {
    to: constants.deliveryHistoryURL,
    icon: HistoryRoundedIcon,
    label: "Traslados realizados",
  },
  {
    to: constants.routesURL,
    icon: Timeline,
    label: "Rutas",
  },
];

const SideBar = () => {
  return (
    <div className="min-w-[250px] p-6 bg-white border-r border-gray-200 flex flex-col gap-4 shadow-sm">

      {/* Navegación */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`
            }
          >
            <Icon fontSize="small" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer (opcional) */}
      <div className="mt-auto pt-6 text-xs text-gray-400">v1.0.0</div>
    </div>
  );
};

export default SideBar;
