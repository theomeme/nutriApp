export interface UserProps {
  id: string;
  login: string;
  fullName: string;
  clients: [string];
  agendamentos: string[];
}

export interface AppointmentProps {
  client: string;
  date: string;
  time: string;
  type: string;
  status: string;
}
