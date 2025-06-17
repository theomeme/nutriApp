import React from "react";
import "./QuickDashboard.css";

function QuickDashboard(QuickDashboardProps) {
  return (
    <div className="dashboard dashboard-container">
      <h1>Dashboard</h1>
      <p>Bem-vindo de volta, {QuickDashboardProps.name}</p>
      <div className="dashboard-cards">
        <div className="card">
          <h2>Clientes Ativos</h2>
          <p>45</p>
        </div>
        <div className="card">
          <h2>Agendamentos para Hoje</h2>
          <p>3</p>
        </div>
        <div className="card">
          <h2>Próximo Agendamento</h2>
          <p>Amanhã, 10h00</p>
        </div>
      </div>
    </div>
  );
}

export default QuickDashboard;
