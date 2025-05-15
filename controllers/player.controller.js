const playerModal = require("../models/player.model");
const { v4: uuidv4 } = require("uuid");

const createPlayer = async (req, res, next) => {
  try {
    const { name, team, country, runs, image, role, salary } = req.body;
    // unique player id
    const playerId = uuidv4();
    const status = await playerModal.create({
      playerId: playerId,
      name,
      team,
      country,
      runs,
      image,
      role,
      salary,
    });
    if (!status) {
      return res.json({
        message: "Player could'nt Created!",
      });
    }
    if (status) {
      return res.json({
        message: "Player created successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createPlayer };
