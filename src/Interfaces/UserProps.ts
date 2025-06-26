export interface UserProps{
    id: string
    login: string
    fullName: string
    clients: [string]
    agendamentos: AppointmentProps[];
}

export interface AppointmentProps {
  client: string;
  date: string;
  time: string;
  type: string;
  status: string;
}