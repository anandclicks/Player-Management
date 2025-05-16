const playerModel = require("../models/player.model");
const { v4: uuidv4 } = require("uuid");

const createPlayer = async (req, res, next) => {
  try {
    const { name, team, country, runs, image, role, salary } = req.body;
    // unique player id
    const id = uuidv4();
    const status = await playerModel.create({
      id: id,
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
    const id = req.params?.id;
    if (!id) {
      return res.json({
        message: "Player id is required to update details!",
        status: 403,
      });
    }

    const playerForUpdate = await playerModel.findOne({ id });
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
          message: "Player could'nt Update!",
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

const deletePlayer = async (req, res, next) => {
  try {
    const id = req.params?.id;
    const playerForDelete = await playerModel.findOneAndDelete({ id });

    if (!playerForDelete) {
      return res.json({
        message: "Player not Found!",
        status: 400,
      });
    } else {
      return res.json({
        message: "Player Deleted successfully!",
        status: 200,
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
      return res.json({
        message: "Player's id is reqired!",
        status: 402,
      });
    }
    const descriptionOfPlayer = await playerModel
      .findOne({ id })
      .select("-_id");
    if (!descriptionOfPlayer) {
      return res.json({
        message: "Player not found!",
        status: 400,
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
    const sortBy = req.query.sortBy;
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
      return res.json({
        message: "Data not found!",
        status: 400,
      });
    } else {
      return res.json({
        page : pageNumber,
        limit : limit,
        total : await playerModel.countDocuments(),
        players : result
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
