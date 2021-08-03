import IRoute from "../interfaces/route";
import LoginForm from "../pages/LoginForm";
import RegistrationForm from "../pages/RegistrationForm";
import Dashboard from "../components/Dashboard";

const routes: IRoute[] = [
  {
    path: "/",
    name: "login",
    component: LoginForm,
    exact: true,
  },
  {
    path: "/register",
    name: "register",
    component: RegistrationForm,
    exact: true,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    exact: true,
  },
];
export default routes;
