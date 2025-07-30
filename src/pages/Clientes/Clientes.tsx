import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ClientsList from "./Componentes/ClientsList/ClientsList";

const Clientes: React.FC = () => {
 
  return (
    <div>
      <Navbar />
      <ClientsList />

    </div>
  );
};

export default Clientes;