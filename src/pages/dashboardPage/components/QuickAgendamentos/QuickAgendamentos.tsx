import React from "react";
import "./QuickAgendamentos.css";
import { UserProps } from "../../../../Interfaces/UserProps";

interface Props {
  userData: UserProps;
}

const QuickAgendamentos: React.FC<Props> = ({ userData }) => {
  const appointments = [
    {
      client: "Mariana Oliveira",
      date: "15/07/2024",
      time: "14:00",
      type: "Consulta Inicial",
      status: "Concluído",
    },
    {
      client: "Carlos Mendes",
      date: "16/07/2024",
      time: "11:00",
      type: "Retorno",
      status: "Confirmado",
    },
    {
      client: "Sofia Almeida",
      date: "17/07/2024",
      time: "16:30",
      type: "Consulta Inicial",
      status: "Pendente",
    },
    {
      client: "Lucas Pereira",
      date: "18/07/2024",
      time: "09:00",
      type: "Retorno",
      status: "Confirmado",
    },
    {
      client: "Isabela Costa",
      date: "19/07/2024",
      time: "15:00",
      type: "Consulta Inicial",
      status: "Pendente",
    },
  ];

  return (
    <div className="container">
      <div>
        <h1>Agendamentos Recentes</h1>
      </div>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Tipo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.client}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.type}</td>
              <td>
                <span className={`status ${appointment.status.toLowerCase()}`}>
                  {appointment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuickAgendamentos;
