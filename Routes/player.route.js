const express = require("express");
const validateBody = require("../helpers/validate.js");
const {
  player_create_scheme,
  player_update_schema,
} = require("../helpers/player_joi_schema.js");
const Router = express.Router();

const {
  createPlayer,
  getPlayerDescription,
  updatePlayer,
  deletePlayer,
  filteringAndSorting,
} = require("../controllers/player.controller");

Router.post("/", validateBody(player_create_scheme), createPlayer);
Router.get("/:id/description", getPlayerDescription);
Router.patch("/:id", validateBody(player_update_schema), updatePlayer);
Router.delete("/:id", deletePlayer);
Router.get("/", filteringAndSorting);

module.exports = Router;
