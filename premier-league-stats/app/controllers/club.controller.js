const Club = require("../models/club.model.js");

// Create and Save a new club
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

  // Create a club
  const club = new Club({
    club_name: req.body.club_name,
    league_id : req.body.league_id,
    manager_id : req.body.manager_id,
    matches_played : req.body.matches_played,
    wins: req.body.wins,
    draws: req.body.draws,
    losses: req.body.losses,
    goals_for: req.body.goals_for,
    goals_against: req.body.goals_against,
    points: req.body.points,
    xG : req.body.xG, 
    xGA : req.body.xGA,
    xGD : req.body.xGD,
    xGD_per_90: req.body.xGD_per_90, 
    capacity : req.body.capacity
  });

  // Save club in the database
  Club.create(club, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the club."
      });
    else res.send(data);
  });
};

// Retrieve all clubs from the database.
exports.findAll = (req, res) => {
    Club.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clubs."
      });
    else res.send(data);
  });
};

// Find a single club with a clubId
exports.findOne = (req, res) => {
    Club.findById(req.params.club_name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found club with id ${req.params.club_name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving club with id " + req.params.club_name
        });
      }
    } else res.send(data);
  });
};

exports.findInLeague = (req, res) => {
    Club.findByLeagueID(req.params.league_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found club with league_id ${req.params.league_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving club with league_id " + req.params.league_id
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

Club.updateById(
    req.params.club_name,
    new Club(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found league with id ${req.params.club_name}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating league with id " + req.params.club_name
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a club with the specified clubID in the request
exports.delete = (req, res) => {
    console.log("DELEETE")
    console.log(req.params)
    Club.remove(req.params.club_name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found club with id ${req.params.club_name}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete club with id " + req.params.club_name
        });
      }
    } else res.send({ message: `club was deleted successfully!` });
  });
};

// Delete all clubs from the database.
exports.deleteAll = (req, res) => {
    Club.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all clubs."
      });
    else res.send({ message: `All clubs were deleted successfully!` });
  });
};
