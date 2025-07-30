import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Dashboard from "./pages/dashboardPage/Dashboard";
import Clientes from "./pages/Clientes/Clientes";
import ClientDetails from "./pages/Clientes/Componentes/ClientDetails/ClientDetails";
import Agendamentos from "./pages/Agendamentos";
import Relatorios from "./pages/Relatorios";
import SignIn from "./pages/AuthPages/SignInPage/SignIn";
import SignUp from "./pages/AuthPages/SignUpPage/SignUp";

// Protected route component
const ProtectedRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/signIn" replace />;
  }
  return <Outlet />;
};

// Public route component (redirects to dashboard if already authenticated)
const PublicRoute = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};

// Create a function that returns the router based on authentication state
export const createAppRouter = (isAuthenticated: boolean) => {
  return createBrowserRouter([
    // Public routes (login, signup)
    {
      element: <PublicRoute isAuthenticated={isAuthenticated} />,
      children: [
        {
          path: "/signIn",
          element: <SignIn />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
      ],
    },
    
    // Protected routes (dashboard, etc.)
    {
      element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
      children: [
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
          path: "/clientes/:id",
          element: <ClientDetails />,
        },
        {
          path: "/agendamentos",
          element: <Agendamentos />,
        },
        {
          path: "/relatorios",
          element: <Relatorios />,
        },
      ],
    },
    
    // Fallback route - redirect to sign in or dashboard based on auth state
    {
      path: "*",
      element: isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/signIn" />,
    },
  ]);
};