const mongoose = require("mongoose");

const MusicSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  link: { type: String, required: true },
  comentario: { type: String, required: true },
});

module.exports = mongoose.model("Music", MusicSchema);