const express = require("express");
const router = express.Router();
const Music = require("../models/Music");

// Criar uma nova música
router.post("/", async (req, res) => {
  try {
    const { titulo, link, comentario } = req.body;
    const novaMusica = new Music({ titulo, link, comentario });
    await novaMusica.save();
    res.status(201).json(novaMusica);
  } catch (error) {
    console.error("Erro ao adicionar música:", error);
    res.status(500).json({ message: "Erro ao adicionar música", error });
  }
});

// Obter todas as músicas
router.get("/", async (req, res) => {
  try {
    const musicas = await Music.find();
    res.json(musicas);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar músicas", error });
  }
});

module.exports = router;