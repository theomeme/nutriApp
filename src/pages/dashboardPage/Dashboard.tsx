import React, {useEffect, useState} from "react";
import "./Dashboard.css";
import QuickDashboard from "./components/QuickDashboard/QuickDashboard";
import QuickAgendamentos from "./components/QuickAgendamentos/QuickAgendamentos";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import {UserProps} from "../../Interfaces/UserProps";

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserProps | null>(null);

  useEffect(() => {
    fetchData();
  });

  const fetchData = async () => {
    try {
      const response = await api.get("/api/v1/user/me");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <Navbar />
      {userData && <QuickDashboard userData={userData} />}
      {userData && <QuickAgendamentos userData={userData} />}
    </div>
  );
};

export default Dashboard;
