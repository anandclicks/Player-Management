const joi = require("joi")

const player_create_scheme = joi.object({
    name : joi.string().required(),
    team : joi.string().required(),
    country : joi.string().required(),
    runs : joi.number().required(),
    image : joi.string().required(),
    role : joi.string().valid('Batsman', 'Bowler', 'All-rounder').required(),
    salary : joi.number().positive().required()
})


const player_update_schema = joi.object({
    name : joi.string(),
    team : joi.string(),
    country : joi.string(),
    runs : joi.number(),
    image : joi.string(),
    role : joi.string().valid('Batsman', 'Bowler', 'All-rounder'),
    salary : joi.number().positive()
})

module.exports = {player_create_scheme,player_update_schema}