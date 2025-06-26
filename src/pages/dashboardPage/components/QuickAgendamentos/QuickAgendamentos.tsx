import React from "react";
import "./QuickAgendamentos.css";
import {UserProps, AppointmentProps} from "../../../../Interfaces/UserProps";

interface Props {
  userData: UserProps;
}

const QuickAgendamentos: React.FC<Props> = ({ userData }) => {
  // Converter as strings JSON em objetos
  const appointments: AppointmentProps[] = userData?.agendamentos?.map(agendamento => {
    try {
      return JSON.parse(agendamento);
    } catch (error) {
      console.error("Erro ao fazer parse do agendamento:", error);
      return {
        client: "Erro",
        date: "-",
        time: "-",
        type: "-",
        status: "Erro"
      };
    }
  }) || [];

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
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment?.client || '-'}</td>
                <td>{appointment?.date || '-'}</td>
                <td>{appointment?.time || '-'}</td>
                <td>{appointment?.type || '-'}</td>
                <td>
                  {appointment?.status ? (
                    <span className={`status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  ) : (
                    <span className="status">-</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>Nenhum agendamento encontrado</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default QuickAgendamentos;
