import React, { useState, useEffect } from "react";

import api from './services/api';

import Header from './components/Header';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('/repositories',
    { 
      title: `Novo projeto ${Date.now()}`, 
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs", 
      techs: ["Node", "Express", "TypeScript"],
      likes: 0 
    });

    const project = response.data;

    setRepositories([... repositories, project]);

  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
 
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <>
    <Header title="Repositories" />    
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}  
                <button className="removeBtn" onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
            </li>
        ))}
      </ul>
      <button className="addBtn" onClick={handleAddRepository}>Adicionar</button>
    </div>
    </>
  );
}

export default App;
