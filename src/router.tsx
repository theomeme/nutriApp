import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./pages/dashboardPage/Dashboard";
import Clientes from "./pages/Clientes";
import Agendamentos from "./pages/Agendamentos";
import Relatorios from "./pages/Relatorios";
import SignIn from "./pages/AuthPages/SignInPage/SignIn";
import SignUp from "./pages/AuthPages/SignUpPage/SignUp";
import AuthRedirect from "./components/AuthRedirect";

export const AuthRoute = createBrowserRouter([
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <AuthRedirect isLogged={false} />,
  },
]);

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/clientes",
    element: <Clientes />,
  },
  {
    path: "/agendamentos",
    element: <Agendamentos />,
  },
  {
    path: "/relatorios",
    element: <Relatorios />,
  },
]);
