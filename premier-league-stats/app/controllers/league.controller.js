const League = require("../models/league.model.js");

// Create and Save a new league
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

  // Create a league
  const league = new League({
    league_id : req.body.league_id,
    league_name : req.body.league_name,
    country_name : req.body.country_name
  });

  // Save league in the database
  League.create(league, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the league."
      });
    else res.send(data);
  });
};

// Retrieve all leagues from the database.
exports.findAll = (req, res) => {
    League.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving leagues."
      });
    else res.send(data);
  });
};

// Find a single league with a leagueId
exports.findOne = (req, res) => {
    League.findById(req.params.league_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found league with id ${req.params.league_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving league with id " + req.params.league_id
        });
      }
    } else res.send(data);
  });
};

// Update a league identified by the leagueId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

//   console.log(req.body);

League.updateById(
    req.params.league_id,
    new League(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found league with id ${req.params.league_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating league with id " + req.params.league_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a league with the specified leagueId in the request
exports.delete = (req, res) => {
    console.log("DELEETE")
    console.log(req.params)
    League.remove(req.params.league_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found league with id ${req.params.league_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete league with id " + req.params.league_id
        });
      }
    } else res.send({ message: `league was deleted successfully!` });
  });
};

// Delete all leagues from the database.
exports.deleteAll = (req, res) => {
    League.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all leagues."
      });
    else res.send({ message: `All leagues were deleted successfully!` });
  });
};
