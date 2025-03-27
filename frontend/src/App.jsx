import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'; // Certifique-se de importar o CSS

// Página Inicial - Home (Exibe as músicas)
function Home() {
  const [musicas, setMusicas] = useState([]);

  useEffect(() => {
    const fetchMusicas = async () => {
      try {
        const response = await axios.get("http://localhost:5010/musicas");
        setMusicas(response.data);
      } catch (error) {
        console.error("Erro ao buscar músicas:", error);
      }
    };

    fetchMusicas(); // Chama a função para buscar músicas
  }, []);

  const renderMusicas = () => {
    return musicas.map((musica) => (
      <div key={musica._id} className="musica-item">
        <div className="musica-video">
          <VideoPlayer link={musica.link} />
        </div>
        <h2>{musica.titulo}</h2>
        <div className="musica-comentario">
          <p>{musica.comentario}</p>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h1>João Costa music</h1>
      <div className="musicas-container">
        {musicas.length === 0 ? (
          <p>Não há músicas disponíveis.</p>
        ) : (
          renderMusicas()
        )}
      </div>
      <Link to="/adicionar">Adicionar Música</Link>
    </div>
  );
}

// Componente do Player de Vídeo (Usando o player do YouTube)
function VideoPlayer({ link }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Função para extrair o videoId do link do YouTube
  const getVideoId = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0]; // Extrai o ID do vídeo do link do YouTube
    return videoId;
  };

  return (
    <div className="video-container">
      {!isPlaying ? (
        <div className="video-thumbnail" onClick={handlePlay}>
          <img
            src={`https://img.youtube.com/vi/${getVideoId(link)}/hqdefault.jpg`}
            alt="Thumbnail"
            width="320"
            height="180"
          />
          <button className="play-btn">Play</button>
        </div>
      ) : (
        <iframe
          width="320"
          height="180"
          src={`https://www.youtube.com/embed/${getVideoId(link)}?autoplay=1`}
          title="Vídeo do YouTube"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}

// Página de Adicionar Música com Senha
function AdicionarMusica() {
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const [comentario, setComentario] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaCorreta, setSenhaCorreta] = useState(false);
  const [erroSenha, setErroSenha] = useState("");

  const SENHA = "senha123";

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5010/musicas", {
        titulo,
        link,
        comentario,
      });

      if (response.status === 201) {
        alert("Música adicionada com sucesso!");
        setTitulo("");
        setLink("");
        setComentario("");
      }
    } catch (error) {
      console.error("Erro ao adicionar música:", error);
      alert("Erro ao adicionar música");
    }
  };

  const handleSenhaSubmit = (e) => {
    e.preventDefault();
    if (senha === SENHA) {
      setSenhaCorreta(true);
      setErroSenha("");
    } else {
      setErroSenha("Senha incorreta!");
    }
  };

  if (!senhaCorreta) {
    return (
      <div>
        <h2>Digite a Senha para Adicionar Música</h2>
        <form onSubmit={handleSenhaSubmit}>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit">Acessar</button>
        </form>
        {erroSenha && <p style={{ color: "red" }}>{erroSenha}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2>Adicionar Nova Música</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Link do YouTube"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <textarea
        placeholder="Comentário"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />
      <button onClick={handleSubmit}>Adicionar</button>
    </div>
  );
}

// Configuração das Rotas
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adicionar" element={<AdicionarMusica />} />
      </Routes>
    </Router>
  );
}

export default App;