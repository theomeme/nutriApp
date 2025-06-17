import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import icon from "./Assets/icon.png";
import profile from "./Assets/profile.png";
import logo from "./Assets/vector.png";
import Clientes from "./pages/Clientes";
import Dashboard from "./pages/Dashboard";
import Agendamentos from "./pages/Agendamentos";
import Relatórios from "./pages/Relatórios";

function App() {
  return (
    <Router>
      <div>
        <div className="navbar">
          <div className="logo-title">
            <img src={logo} alt="logo-icon" className="logo-icon" />
            <div className="navbar-title">NutriTrack</div>
          </div>
          <div className="navbar-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/agendamentos">Agendamentos</Link>
            <Link to="/relatorios">Relatórios</Link>
            <div className="navbar-icons">
              <img src={icon} alt="Notificações" className="notification-icon" />
              <Link to="/profile">
                <img src={profile} alt="Perfil" className="profile-icon" />
              </Link>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="/relatorios" element={<Relatórios />} />
          {/* Você precisará criar um componente Profile para esta rota */}
          <Route path="/profile" element={<div>Página de Perfil</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;