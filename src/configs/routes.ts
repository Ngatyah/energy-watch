import IRoute from "../interfaces/route";
import LoginForm from "../pages/LoginForm";
import RegistrationForm from "../pages/RegistrationForm";

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
];
export default routes;
