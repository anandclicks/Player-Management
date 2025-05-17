const playerModel = require("../models/player.model");
const { v4: uuidv4 } = require("uuid");

const createPlayer = async (req, res, next) => {
  try {
    const { name, team, country, runs, image, role, salary } = req.body;
    // unique player id
    const id = uuidv4();
    const status = await playerModel.create({
      id,
      name,
      team,
      country,
      runs,
      image,
      role,
      salary,
    });
    if (!status) {
      return res.status(500).json({
        message: "Player couldn't be created! Please try again.",
      });
    }
    if (status) {
      return res.status(201).json({
        message: "Player created successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const updatePlayer = async (req, res, next) => {
  try {
    const id = req.params?.id;
    if (!id) {
      return res.status(400).json({
        message: "Player ID is required to update details!",
      });
    }

    const playerForUpdate = await playerModel.findOne({ id });
    if (!playerForUpdate) {
      return res.status(404).json({
        message: "Player not found!",
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
        return res.status(500).json({
          message: "Player couldn't be updated!",
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

const deletePlayer = async (req, res, next) => {
  try {
    const id = req.params?.id;
    const playerForDelete = await playerModel.findOneAndDelete({ id });

    if (!playerForDelete) {
      return res.status(404).json({
        message: "Player not found!",
      });
    } else {
      return res.status(201).json({
        message: "Player deleted successfully!",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getPlayerDescription = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Player ID is required!",
      });
    }
    const descriptionOfPlayer = await playerModel
      .findOne({ id })
      .select("-_id");
    if (!descriptionOfPlayer) {
      return res.status(404).json({
        message: "Player not found!",
      });
    } else {
      return res.json(descriptionOfPlayer);
    }
  } catch (error) {
    next(error);
  }
};

const filteringAndSorting = async (req, res, next) => {
  try {
    // filtering options
    let filterOption = {};
    if (req.query.team) {
      filterOption.team = { $regex: req.query.team, $options: "i" };
    }
    if (req.query.name) {
      filterOption.name = { $regex: req.query.name, $options: "i" };
    }

    // sorting options
    let sortOptions = {};
    const sortBy = req.query.sortby;
    const sortOrder = req.query.order == "desc" ? -1 : 1;
    if (sortBy == "runs" || sortBy == "salary") {
      sortOptions[sortBy] = sortOrder;
    }

    // pagination
    let pageNumber = Number(req.query.page || 1);
    let limit = 10;

    let skipData = (pageNumber - 1) * limit;

    const result = await playerModel
      .find(filterOption)
      .sort(sortOptions)
      .skip(skipData)
      .limit(limit)
      .select("-_id");

    if (!result.length) {
      return res.status(404).json({
        page: pageNumber,
        message: "No players found!",
        players: result,
      });
    } else {
      return res.status(200).json({
        page: pageNumber,
        players: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPlayer,
  updatePlayer,
  deletePlayer,
  getPlayerDescription,
  filteringAndSorting,
};
