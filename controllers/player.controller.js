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
        message: "Player could'nt Created! please try again",
        status: 500,
      });
    }
    if (status) {
      return res.json({
        message: "Player created successfully!",
        status: 200,
      });
    }
  } catch (error) {
    next(error);
  }
};

const updatePlayer = async (req, res, next) => {
  try {
    const playerId = req.params.id;
    if (!playerId) {
      return res.json({
        message: "Player id is required to update details!",
        status: 403,
      });
    }

    const playerForUpdate = await playerModal.findOne({ playerId });
    if (!playerForUpdate) {
      return res.json({
        message: "Player not found!",
        status: 404,
      });
    } else {
      const fieldsForUpdate = [
        "name",
        "team",
        "country",
        "runs",
        "image",
        "role",
        "salary",
      ];
      fieldsForUpdate.forEach((field) => {
        if (req.body[field] !== undefined) {
          playerForUpdate[field] = req.body[field];
        }
      });
      const updateState = await playerForUpdate.save();
      if (!updateState) {
        return res.json({
          message: "Player could'nt successfully!",
          status: 500,
        });
      } else {
        return res.json({
          message: "Player updated successfully!",
          status: 200,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { createPlayer, updatePlayer };
