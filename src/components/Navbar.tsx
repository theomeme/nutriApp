// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import icon from "../Assets/icon.png";
import profile from "../Assets/profile.png";

const Navbar: React.FC = () => {
  return (
    <div>
      <div className="navbar">
        <Link to="/" className="logo-title">
          <img src="/logo.png" alt="NutriTrack Logo" className="logo-icon" />
          <span className="navbar-title">NutriTrack</span>
        </Link>
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/agendamentos">Agendamentos</Link>
          <Link to="/relatorios">Relatórios</Link>
        </div>
        <div className="navbar-icons">
          <img src={icon} alt="Notificações" className="notification-icon" />
          <img src={profile} alt="Perfil" className="profile-icon" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;