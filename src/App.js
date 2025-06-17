import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-logo">
          <span>NutriTrack</span>
        </div>
        <ul className="navbar-list">
          <li className="navbar-item"><a href="#dashboard">Dashboard</a></li>
          <li className="navbar-item"><a href="#clientes">Clientes</a></li>
          <li className="navbar-item"><a href="#agendamentos">Agendamentos</a></li>
          <li className="navbar-item"><a href="#relatorios">Relatórios</a></li>
        </ul>
        <span className="navbar-icon"></span>
        
      </nav>
    </div>
  );
}

export default App;