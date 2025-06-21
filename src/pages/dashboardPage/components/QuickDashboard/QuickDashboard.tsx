import React from "react";
import "./QuickDashboard.css";
import {useAuth} from "../../../../context/authContext";
import api from "../../../../services/api";
import { useNavigate } from "react-router-dom";
import {UserProps} from "../../../../Interfaces/UserProps";


interface Props {
  userData: UserProps;
}

const QuickDashboard: React.FC<Props> = ({ userData }) => {
  const {handleSetToken, getRefreshToken, getToken} = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const accessToken = await getToken();
      const refreshToken = await getRefreshToken();

      const response = await api.post("/api/v1/auth/logout", {
        accessToken,
        refreshToken,
      });

      if (response.status === 200) {
        handleSetToken("", "");
        localStorage.removeItem("refreshToken");
        navigate("/login");
      } else {
        alert("Erro ao fazer logout");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Erro ao fazer logout. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <div className="dashboard dashboard-container">
      <h1>Dashboard</h1>
      <p>Bem-vindo de volta {userData.fullName}</p>
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
        <button onClick={logout}>Sair</button>
      </div>
    </div>
  );
};

export default QuickDashboard;