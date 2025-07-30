import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./ClientDetails.css";
import Navbar from "../../../../components/Navbar";
import profile from "../../../../Assets/profile.png";
import api from "../../../../services/api";

interface ClientData {
  id: string;
  login: string;
  fullName: string;
  height: number;
  weight: number;
  status: string;
  consultas: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Consultation {
  id: string;
  date: string;
  time: string;
  type: string;
  status: string;
  notes: string;
}

interface LocationState {
  client: ClientData;
}

const ClientDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("informacoesPessoais");
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as LocationState | undefined;
  
  useEffect(() => {
    if (locationState && locationState.client) {
      setClient(locationState.client);
      setLoading(false);
    } else if (id) {
      fetchClientData(id);
    } else {
      setError("ID do cliente não fornecido");
      setLoading(false);
    }
    
    // Mock data for consultations
    setConsultations([
      {
        id: "1",
        date: "15/05/2023",
        time: "14:30",
        type: "Avaliação Inicial",
        status: "Concluída",
        notes: "Cliente apresentou bom estado geral. Recomendado plano alimentar com restrição de carboidratos."
      },
      {
        id: "2",
        date: "30/05/2023",
        time: "15:00",
        type: "Acompanhamento",
        status: "Concluída",
        notes: "Cliente relatou melhora na disposição. Perda de 2kg desde a última consulta."
      },
      {
        id: "3",
        date: "15/06/2023",
        time: "14:00",
        type: "Acompanhamento",
        status: "Concluída",
        notes: "Ajuste no plano alimentar. Inclusão de mais proteínas e redução de gorduras."
      },
      {
        id: "4",
        date: "01/07/2023",
        time: "16:30",
        type: "Acompanhamento",
        status: "Concluída",
        notes: "Cliente atingiu meta de perda de peso. Novo objetivo estabelecido para manutenção."
      },
      {
        id: "5",
        date: "20/07/2023",
        time: "10:00",
        type: "Avaliação Física",
        status: "Concluída",
        notes: "Medidas atualizadas. Redução significativa de percentual de gordura."
      },
      {
        id: "6",
        date: "10/08/2023",
        time: "11:30",
        type: "Acompanhamento",
        status: "Agendada",
        notes: ""
      }
    ]);

  }, [id, locationState]);

  const fetchClientData = async (clientId: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/v1/nutri/client/${clientId}`);
      setClient(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching client data:", error);
      setError("Não foi possível carregar os dados do cliente.");
      setLoading(false);
    }
  };

  const fetchConsultationData = async (consultationId: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/api/v1/nutri/consultation/${consultationId}`);
      setClient(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching consultation data:", error);
      setError("Não foi possível carregar os dados da consulta.");
      setLoading(false);
    }
  };

  const formatWeight = (weight?: number) => {
    return weight ? `${weight} kg` : "Não informado";
  };

  const formatHeight = (height?: number) => {
    return height ? `${height} cm` : "Não informado";
  };

  const formatEmail = (login?: string) => {
    if (!login) return "Não informado";
    if (login.includes('@')) return login;
    return login.toLowerCase() + '@example.com';
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'concluída':
        return 'status-completed';
      case 'agendada':
        return 'status-scheduled';
      case 'cancelada':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "informacoesPessoais":
        return (
          <div className="personal-details">
            <h2>Detalhes pessoais</h2>

            <div className="details-grid">
              <div className="detail-item">
                <h3>Nome completo</h3>
                <p>{client?.fullName || "Não informado"}</p>
              </div>

              <div className="detail-item">
                <h3>Email</h3>
                <p>{formatEmail(client?.login)}</p>
              </div>

              <div className="detail-item">
                <h3>Status</h3>
                <p>{client?.status || "ATIVO"}</p>
              </div>

              <div className="detail-item">
                <h3>Data de cadastro</h3>
                <p>{client?.createdAt || "Não informado"}</p>
              </div>
            </div>

            <h2>Informações de saúde</h2>

            <div className="details-grid">
              <div className="detail-item">
                <h3>Peso atual</h3>
                <p>{formatWeight(client?.weight)}</p>
              </div>

              <div className="detail-item">
                <h3>Altura</h3>
                <p>{formatHeight(client?.height)}</p>
              </div>
            </div>
          </div>
        );
      case "historicoConsultas":
        return (
          <div className="consultation-history">
            <div className="consultation-header">
              <h2>Histórico de Consultas</h2>
              <button className="new-consultation-btn">Nova Consulta</button>
            </div>
            
            {consultations.length === 0 ? (
              <div className="no-consultations">
                <p>Nenhuma consulta registrada para este cliente.</p>
              </div>
            ) : (
              <div className="consultations-list">
                {consultations.map((consultation) => (
                  <div key={consultation.id} className="consultation-card">
                    <div className="consultation-info">
                      <div className="consultation-date">
                        <h3>{consultation.date}</h3>
                        <p>{consultation.time}</p>
                      </div>
                      <div className="consultation-type">
                        <h3>{consultation.type}</h3>
                        <span className={`consultation-status ${getStatusClass(consultation.status)}`}>
                          {consultation.status}
                        </span>
                      </div>
                    </div>
                    {consultation.notes && (
                      <div className="consultation-notes">
                        <h4>Observações:</h4>
                        <p>{consultation.notes}</p>
                      </div>
                    )}
                    <div className="consultation-actions">
                      <button className="action-btn view-btn">Ver detalhes</button>
                      <button className="action-btn edit-btn">Editar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case "planosRelacoes":
        return <div>Conteúdo dos planos de relações</div>;
      case "progresso":
        return <div>Conteúdo do progresso</div>;
      case "notas":
        return <div>Conteúdo das notas</div>;
      default:
        return <div>Selecione uma aba</div>;
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="client-profile-container">
          <p>Carregando dados do cliente...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="client-profile-container">
          <p>Erro: {error}</p>
          <button onClick={() => navigate('/clientes')}>Voltar para a lista de clientes</button>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div>
        <Navbar />
        <div className="client-profile-container">
          <p>Cliente não encontrado</p>
          <button onClick={() => navigate('/clientes')}>Voltar para a lista de clientes</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="client-profile-container">
        <div className="main-content">
          <h1>Perfil do cliente</h1>
          <p className="subtitle">
            Detalhe as informações do cliente, histórico de consultas e planos
            de relações.
          </p>

          <div className="client-header">
            <div className="client-info">
              <img
                src={profile}
                alt="Cliente"
                className="client-avatar"
              />
              <div>
                <h2>{client.fullName}</h2>
                <p>Cliente</p>
                <p>ID do cliente: {client.id}</p>
              </div>
            </div>
            <button className="edit-button">Editar perfil</button>
          </div>

          <div className="tabs">
            <button
              className={activeTab === "informacoesPessoais" ? "active" : ""}
              onClick={() => setActiveTab("informacoesPessoais")}
            >
              Informações pessoais
            </button>
            <button
              className={activeTab === "historicoConsultas" ? "active" : ""}
              onClick={() => setActiveTab("historicoConsultas")}
            >
              Histórico de consultas
            </button>
            <button
              className={activeTab === "planosRelacoes" ? "active" : ""}
              onClick={() => setActiveTab("planosRelacoes")}
            >
              Planos de relações
            </button>
            <button
              className={activeTab === "progresso" ? "active" : ""}
              onClick={() => setActiveTab("progresso")}
            >
              Progresso
            </button>
            <button
              className={activeTab === "notas" ? "active" : ""}
              onClick={() => setActiveTab("notas")}
            >
              Notas
            </button>
          </div>

          <div className="tab-content">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;