import { useState } from "react";
import axios from "axios";

function AdicionarMusica() {
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");
  const [comentario, setComentario] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaCorreta, setSenhaCorreta] = useState(false);
  const [erroSenha, setErroSenha] = useState("");

  const SENHA = "senha123"; // Senha hardcoded para proteger a página

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

export default AdicionarMusica;