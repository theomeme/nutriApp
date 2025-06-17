import React from "react";
import "./Dashboard.css";
import QuickDashboard from "./components/QuickDashboard/QuickDashboard";
import QuickAgendamentos from "./components/QuickAgendamentos/QuickAgendamentos";
function Dashboard() {
  return (
    <div>
      <QuickDashboard />
      <QuickAgendamentos />
    </div>
  );
}

export default Dashboard;
