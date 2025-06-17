import React from 'react';
import './App.css';
import icon from './Assets/icon.png'; 
import profile from './Assets/profile.png'; 
import logo from './Assets/vector.png'

function App() {
  return (
    <div className="navbar">
      <div className='logo-title'>
        <img src={logo} alt='logo-icon' className='logo-icon'/>
        <div className="navbar-title">NutriTrack</div>
      </div>
      <div className="navbar-links">
        <a href="#dashboard">Dashboard</a>
        <a href="#clientes">Clientes</a>
        <a href="#agendamentos">Agendamentos</a>
        <a href="#relatorios">Relatórios</a>
        <div className="navbar-icons">
          <img src={icon} alt="Notificações" className="notification-icon" />
          <a href='#profile'><img src={profile} alt="Perfil" className="profile-icon" /></a>
        </div>
      </div>
      
    </div>
  );
}

export default App;