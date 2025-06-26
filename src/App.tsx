import React, { useEffect, useMemo } from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { createAppRouter } from "./router";
import { useAuth } from "./context/authContext";
import api from "./services/api";

const App: React.FC = () => {
  const { token } = useAuth();
  const isAuthenticated = Boolean(token);
  
  const router = useMemo(() => createAppRouter(isAuthenticated), [isAuthenticated]);

  useEffect(() => {
    if (typeof window !== "undefined" && token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return <RouterProvider router={router} />;
};

export default App;