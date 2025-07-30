import React, { useEffect, useState } from "react";
import "./ClientsList.css";
import { UserProps } from "../../../../Interfaces/UserProps";
import api from "../../../../services/api";
import { useNavigate } from "react-router-dom";

interface ClientDetails {
  id: string;
  login: string;
  fullName: string;
  height: number;
  weight: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ClientReference {
  clientId: string;
  status: string;
  consultas?: string[];
}

const ClientsList: React.FC = () => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const [clientsDetails, setClientsDetails] = useState<ClientDetails[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData && userData.clients && userData.clients.length > 0) {
      fetchClientsDetails();
    } else if (userData) {
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredClients(clientsDetails);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = clientsDetails.filter(client => 
        client.fullName.toLowerCase().includes(lowercasedSearch) ||
        client.login.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredClients(filtered);
    }
  }, [searchTerm, clientsDetails]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/v1/nutri/me");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Não foi possível carregar os dados do usuário.");
      setLoading(false);
    }
  };

  const fetchClientsDetails = async () => {
    try {
      if (!userData || !userData.clients) return;
      
      const clientReferences: ClientReference[] = userData.clients.map(clientString => {
        try {
          return JSON.parse(clientString);
        } catch (e) {
          console.error("Error parsing client string:", clientString);
          return null;
        }
      }).filter(Boolean);
      
      const clientPromises = clientReferences.map(clientRef => 
        api.get(`/api/v1/nutri/client/${clientRef.clientId}`)
      );
      
      const clientResponses = await Promise.all(clientPromises);
      
      const clientsData = clientResponses.map((response, index) => {
        const clientData = response.data;
        const clientRef = clientReferences[index];
        
        return {
          ...clientData,
          status: clientRef.status === "Active" ? "ATIVO" : 
                 clientRef.status === "Inactive" ? "INATIVO" : 
                 clientData.status || "ATIVO"
        };
      });
      
      setClientsDetails(clientsData);
      setFilteredClients(clientsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching clients details:", error);
      setError("Não foi possível carregar os detalhes dos clientes.");
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const formatEmail = (login: string) => {
    if (login.includes('@')) return login;
    return login.toLowerCase() + '@example.com';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Data não disponível";
    
    if (dateString.includes('/')) return dateString.split(' as')[0];
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch (e) {
      return dateString;
    }
  };

  const getStatusClass = (status: string) => {
    if (status === "ATIVO") return "status-active";
    if (status === "INATIVO") return "status-inactive";
    return "";
  };

  const handleViewClient = (client: ClientDetails) => {
    navigate(`/clientes/${client.id}`, { state: { client }});
  };

  if (loading) {
    return (
      <div className="clients-page">
        <div className="loading-state">
          <p>Carregando dados dos clientes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="clients-page">
        <div className="error-state">
          <p>Erro: {error}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="clients-page">
      <div className="clients-table-container">
        <div className="clients-table-header">
          <h2 className="clients-table-title">Clientes</h2>
          <div className="clients-table-actions">
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Pesquisar clientes..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        
        {clientsDetails.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum cliente encontrado.</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="no-results-state">
            <p>Nenhum cliente corresponde à sua pesquisa.</p>
          </div>
        ) : (
          <table className="clients-table">
            <thead className="clients-table-head">
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Altura/Peso</th>
                <th>Data de cadastro</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="clients-table-body">
              {filteredClients.map(client => (
                <tr key={client.id}>
                  <td className="client-name-cell">
                    <span className="user-name">{client.fullName}</span>
                  </td>
                  <td className="client-email-cell">
                    <span className="user-email">{formatEmail(client.login)}</span>
                  </td>
                  <td className="client-metrics-cell">
                    <span className="user-metrics">
                      {client.height}cm / {client.weight}kg
                    </span>
                  </td>
                  <td className="client-date-cell">
                    <span className="user-date">{formatDate(client.createdAt)}</span>
                  </td>
                  <td className="client-status-cell">
                    <div className={`status-badge-container ${getStatusClass(client.status)}`}>
                      <span className="user-status">{client.status || "ATIVO"}</span>
                    </div>
                  </td>
                  <td className="client-actions-cell">
                    <span 
                      className="action-button" 
                      onClick={() => handleViewClient(client)}
                    >
                      Ver
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClientsList;