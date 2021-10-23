import IRoute from "../interfaces/route";
import LoginForm from "../pages/LoginForm";
import RegistrationForm from "../pages/RegistrationForm";
import Dashboard from "../components/Dashboard";
import { DASHBOARD, LOGIN, METERS_URL, REGISTRATION } from "../constants";
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
  // {
  //   path: METERS_URL,
  //   name: "meters",
  //   component: MeterPanel,
  //   exact: true,
  // },
];
