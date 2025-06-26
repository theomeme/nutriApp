import React, {useState} from "react";
import "./Clientes.css";
import Navbar from "../../components/Navbar";

const Clientes: React.FC = () => {
  const [activeTab, setActiveTab] = useState("informacoesPessoais");

  const client = {
    name: "Ana Silva",
    id: "12345",
    profileImage: "/path/to/profile.jpg",
    fullName: "Ana Silva",
    birthDate: "15 de março de 1988",
    gender: "Feminino",
    contact: "+55 11 98765-4321",
    address: "Rua das Flores, 123, São Paulo, SP",
    weight: "65 kg",
    height: "1,65 m",
    healthGoals: "Perder peso e melhorar a saúde geral",
    medicalConditions: "Nenhuma",
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
                <p>{client.fullName}</p>
              </div>

              <div className="detail-item">
                <h3>Data de nascimento</h3>
                <p>{client.birthDate}</p>
              </div>

              <div className="detail-item">
                <h3>Gênero</h3>
                <p>{client.gender}</p>
              </div>

              <div className="detail-item">
                <h3>Contato</h3>
                <p>{client.contact}</p>
              </div>

              <div className="detail-item full-width">
                <h3>Endereço</h3>
                <p>{client.address}</p>
              </div>
            </div>

            <h2>Informações de saúde</h2>

            <div className="details-grid">
              <div className="detail-item">
                <h3>Peso atual</h3>
                <p>{client.weight}</p>
              </div>

              <div className="detail-item">
                <h3>Altura</h3>
                <p>{client.height}</p>
              </div>

              <div className="detail-item">
                <h3>Objetivos de saúde</h3>
                <p>{client.healthGoals}</p>
              </div>

              <div className="detail-item">
                <h3>Condições médicas</h3>
                <p>{client.medicalConditions}</p>
              </div>
            </div>
          </div>
        );
      case "historicoConsultas":
        return <div>Conteúdo do histórico de consultas</div>;
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

  return (
    <div>
      <Navbar />

      <div className="client-profile-container">
        <div className="sidebar">
          <div className="user-profile">
            <img src="/path/to/nutritionist-avatar.jpg" alt="Nutricionista" />
            <div>
              <h3>Sofia Mendes</h3>
              <p>Nutricionista</p>
            </div>
          </div>

          <ul className="menu">
            <li className={activeTab === "visaoGeral" ? "active" : ""}>
              <span className="icon-wrapper"></span> Visão geral
            </li>
            <li className={activeTab === "consultas" ? "active" : ""}>
              <span className="icon-wrapper"></span> Consultas
            </li>
            <li className={activeTab === "planosRelacoes" ? "active" : ""}>
              <span className="icon-wrapper"></span> Planos de relações
            </li>
            <li className={activeTab === "progresso" ? "active" : ""}>
              <span className="icon-wrapper"></span> Progresso
            </li>
            <li className={activeTab === "notas" ? "active" : ""}>
              <span className="icon-wrapper"></span> Notas
            </li>
          </ul>
        </div>

        <div className="main-content">
          <h1>Perfil do cliente</h1>
          <p className="subtitle">
            Detalhe as informações do cliente, histórico de consultas e planos
            de relações.
          </p>

          <div className="client-header">
            <div className="client-info">
              <img
                src={client.profileImage}
                alt="Cliente"
                className="client-avatar"
              />
              <div>
                <h2>{client.name}</h2>
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

export default Clientes;
