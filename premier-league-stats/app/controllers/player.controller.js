const Player = require("../models/player.model.js");

// Create and Save a new Player
exports.create = (req, res) => {
    // print(req);
    // print(req.body)
    console.log("exports.create")
    console.log(req.body)
    console.log("exports.create")
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Player
  const player = new Player({
    player_id : req.body.player_id,
    player_name : req.body.player_name,
    club_name : req.body.club_name,
    player_nationality : req.body.player_nationality,
    position : req.body.position,
    matches_played : req.body.matches_played,
    age : req.body.age,
    minutes_played : req.body.minutes_played,
    goals : req.body.goals,
    assists : req.body.assists,
    xG : req.body.xG,
    xA : req.body.xA
  });

  // Save Player in the database
  Player.create(player, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Player."
      });
    else res.send(data);
  });
};

// Retrieve all Players from the database.
exports.findAll = (req, res) => {
  Player.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Players."
      });
    else res.send(data);
  });
};

// Find a single Player with a PlayerId
exports.findOne = (req, res) => {
  Player.findById(req.params.player_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Player with id ${req.params.player_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Player with id " + req.params.player_id
        });
      }
    } else res.send(data);
  });
};

exports.findInClub = (req, res) => {
  Player.findByClubName(req.params.club_name, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found club with club_name ${req.params.club_name}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving club with club_name " + req.params.club_name
      });
    }
  } else res.send(data);
});
};

exports.findInCountry = (req, res) => {
  Player.findByCountryName(req.params.country_name, (err, data) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found club with country_name ${req.params.country_name}.`
      });
    } else {
      res.status(500).send({
        message: "Error retrieving club with country_name " + req.params.country_name
      });
    }
  } else res.send(data);
});
};

// Update a Player identified by the PlayerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

//   console.log(req.body);

  Player.updateById(
    req.params.player_id,
    new Player(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Player with id ${req.params.player_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Player with id " + req.params.player_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Player with the specified PlayerId in the request
exports.delete = (req, res) => {
    console.log("DELEETE")
    console.log(req.params)
  Player.remove(req.params.player_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Player with id ${req.params.player_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Player with id " + req.params.player_id
        });
      }
    } else res.send({ message: `Player was deleted successfully!` });
  });
};

// Delete all Players from the database.
exports.deleteAll = (req, res) => {
  Player.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Players."
      });
    else res.send({ message: `All Players were deleted successfully!` });
  });
};
