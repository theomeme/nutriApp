import React from "react";
import icon from "../Assets/icon.png";
import profile from "../Assets/profile.png";

const Navbar: React.FC = () => {
  return (
    <div>
      <div className="navbar">
        <a href="/" className="logo-title">
          <img src="/logo.png" alt="NutriTrack Logo" className="logo-icon" />
          <span className="navbar-title">NutriTrack</span>
        </a>
        <div className="navbar-links">
          <a href="/dashboard">Dashboard</a>
          <a href="/clientes">Clientes</a>
          <a href="/agendamentos">Agendamentos</a>
          <a href="/relatorios">Relatórios</a>
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
