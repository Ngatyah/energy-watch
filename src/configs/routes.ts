import IRoute from "../interfaces/route";
import LoginForm from "../pages/LoginForm";
import RegistrationForm from "../pages/RegistrationForm";
import Dashboard from "../components/Dashboard";
import { DASHBOARD, LOGIN, REGISTRATION } from "../constants";

const routes: IRoute[] = [
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
    exact: true,
  },
];
export default routes;
