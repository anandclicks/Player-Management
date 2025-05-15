const joi = require("joi")

const playerScheme = joi.object({
    name : joi.string().required(),
    team : joi.string().required(),
    country : joi.string().required(),
    runs : joi.number().required(),
    image : joi.string().required(),
    role : joi.string().valid('Batsman', 'Bowler', 'All-rounder').required(),
    salary : joi.number().positive().required()
})

module.exports = playerScheme