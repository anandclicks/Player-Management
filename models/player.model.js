const mongoose = require("mongoose");

const playerModal = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    team: { type: String, required: true },
    country: { type: String, required: true },
    runs: { type: Number, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["Batsman", "Bowler", "All-rounder"] },
    salary: { type: Number, required: true },
  },
);

module.exports = mongoose.model("playerModal", playerModal);
