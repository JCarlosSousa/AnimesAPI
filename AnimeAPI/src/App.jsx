import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAnimes = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`);
      setAnimes(response.data.data);
    } catch (err) {
      setError('Erro ao buscar animes. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Busca de Animes</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Digite o nome do anime"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchAnimes}>Buscar</button>
      </div>
      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
      <div className="anime-list">
        {animes.map((anime) => (
          <div key={anime.mal_id} className="anime-card">
            <img src={anime.images.jpg.image_url} alt={anime.title} />
            <h2>{anime.title}</h2>
            <p>{anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'Sem descrição.'}</p>
            <a href={anime.url} target="_blank" rel="noopener noreferrer">
              Mais detalhes
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

