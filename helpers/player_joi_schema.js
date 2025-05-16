const joi = require("joi");

const player_create_scheme = joi.object({
  name: joi.string().required(),
  team: joi.string().required(),
  country: joi.string().required(),
  runs: joi.number().required(),
  image: joi.string().uri().required(),
  role: joi.string().insensitive().valid("Batsman", "Bowler", "All-rounder").required(),
  salary: joi.number().integer().positive().required(),
});

const player_update_schema = joi.object({
  name: joi.string(),
  team: joi.string(),
  country: joi.string(),
  runs: joi.number(),
  image: joi.string().uri(),
  role: joi.string().insensitive().valid("Batsman", "Bowler", "All-rounder"),
  salary: joi.number().integer().positive(),
});

module.exports = { player_create_scheme, player_update_schema };
