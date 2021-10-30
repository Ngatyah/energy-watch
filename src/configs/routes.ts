import IRoute from "../interfaces/route";
import LoginForm from "../pages/LoginForm";
import RegistrationForm from "../pages/RegistrationForm";
import Dashboard from "../components/Dashboard";
import {
  DASHBOARD,
  GRAPH_URL,
  LOGIN,
  ADD_METER,
  METERS_URL,
  REGISTRATION,
  EDIT_METER,
} from "../constants";
import EnergyGraph from "../components/EnergyGraph";
import MeterForm from "../pages/MeterForm";
import MeterPanel from "../components/MeterPanel";

export const routes: IRoute[] = [
  {
    path: LOGIN,
    name: "login",
    component: LoginForm,
    exact: true,
  },
  {
    path: REGISTRATION,
    name: "register",
    component: RegistrationForm,
    exact: true,
  },
  {
    path: DASHBOARD,
    name: "dashboard",
    component: Dashboard,
    exact: false,
  },
];

// Dashboard Routes
export const dashboardRoutes: IRoute[] = [
  {
    path: METERS_URL,
    name: "meters",
    component: MeterPanel,
    exact: true,
  },
  {
    path: GRAPH_URL,
    name: "graphs",
    component: EnergyGraph,
    exact: true,
  },
  {
    path: ADD_METER,
    name: "meterform",
    component: MeterForm,
    exact: true,
  },
  {
    path: EDIT_METER,
    name: "meterform",
    component: MeterForm,
    exact: false,
  },
];
