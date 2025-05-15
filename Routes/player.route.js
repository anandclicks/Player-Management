const express = require('express')
const validateBody = require('../helpers/validate.js')
const {player_create_scheme,player_update_schema} = require('../helpers/player_joi_schema.js')
const Router = express.Router()

const {createPlayer,updatePlayer} = require('../controllers/player.controller')

Router.post("/",validateBody(player_create_scheme),createPlayer)
Router.patch("/:id",validateBody(player_update_schema),updatePlayer)

module.exports = Router