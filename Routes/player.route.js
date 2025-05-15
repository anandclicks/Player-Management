const express = require('express')
const validateBody = require('../helpers/validate.js')
const playerScheme = require('../helpers/joi.schema.js')
const Router = express.Router()

const {createPlayer} = require('../controllers/player.controller')

Router.post("/",validateBody(playerScheme),createPlayer)

module.exports = Router