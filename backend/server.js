const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const app = express();
// Habilitar CORS para todas as origens
app.use(cors());

// Configuração do Body-Parser
app.use(bodyParser.json());

// Conectar ao MongoDB
const mongoURI = 'mongodb+srv://jcosta_dev:%21Passw0rd%23@clustermusic.fudpdpg.mongodb.net/?retryWrites=true&w=majority&appName=clustermusic';
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Importar o modelo de música corretamente
const Music = require('./models/Music'); // Verifique se o caminho está correto!

// Endpoint para adicionar música
app.post('/musicas', async (req, res) => {
  const { titulo, link, comentario } = req.body;

  try {
    const novaMusica = new Music({
      titulo,
      link,
      comentario,
    });

    await novaMusica.save();
    res.status(201).json({ message: 'Música adicionada com sucesso!', novaMusica });
  } catch (err) {
    console.error('Erro ao adicionar música:', err);
    res.status(500).json({ message: 'Erro ao adicionar música', error: err });
  }
});

// Endpoint para buscar músicas
app.get("/musicas", async (req, res) => {
  try {
    const musicas = await Music.find();  // Agora usa o modelo correto
    res.status(200).json(musicas); // Retorna as músicas no formato JSON
  } catch (error) {
    console.error("Erro ao buscar músicas:", error);
    res.status(500).json({ message: "Erro ao buscar músicas" });
  }
});

// Iniciar o servidor
const port = 5010;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});