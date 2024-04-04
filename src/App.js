import React, { useEffect, useState } from "react";
import { FiSearch } from 'react-icons/fi';
import { FaStreetView } from "react-icons/fa";
import './styles.css'
import api from "./services/api";

function App() {

  const [isVisible, setIsVisible] = useState(false); // Boolean
  const [input, setInput] = useState(''); // String
  const [cep, setCEP] = useState({}); // Objeto

  async function handleSearch() {
    if (input === '') {
      alert("Insira algum CEP válido.");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCEP(response.data);
      setInput("")
    } catch (error) {
      alert("Erro na busca.");
      console.log(error);
      setInput("")
    }

  }

  useEffect(() => {
      setIsVisible(Object.keys(cep).length > 0);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timeout);
  }, [cep]);

  return (
    <div className="container">
      <h1 className="title"> Busca de CEP </h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        maxLength="8"
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>
      
      {Object.keys(cep).length > 0 && (
            <main className={`main ${isVisible ? 'visible': ''}`}>
              <div className="mainHeader"> <FaStreetView className="mainHeaderIcon"/> </div>
          <h2>CEP: {cep.cep} </h2>
          <span>Rua: {cep.logradouro} </span>
          <span>Complemento: {cep.complemento} </span>
          <span>Bairro: {cep.bairro} </span>
          <span>Localidade/UF: {cep.localidade} - {cep.uf} </span>
        </main>
      )}
      
    </div>
  );
}

export default App;
