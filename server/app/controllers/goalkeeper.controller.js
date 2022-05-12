const Goalkeeper = require("../models/goalkeeper.model.js");

// Create and Save a new goalkeeper
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

  // Create a goalkeeper
  const goalkeeper = new Goalkeeper({
    goalkeeper_id : req.body.goalkeeper_id,
    goalkeeper_name : req.body.goalkeeper_name,
    club_name : req.body.club_name,
    player_nationality : req.body.player_nationality,
    position : req.body.position,
    matches_played : req.body.matches_played,
    age : req.body.age,
    minutes_played : req.body.minutes_played,
    goals_against : req.body.goals_against,
    shots_on_target_against : req.body.shots_on_target_against,
    saves : req.body.saves,
    clean_sheets : req.body.clean_sheets,
    pks_saved : req.body.pks_saved
  });

  // Save Goalkeeper in the database
  Goalkeeper.create(goalkeeper, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the goalkeeper."
      });
    else res.send(data);
  });
};

// Retrieve all goalkeepers from the database.
exports.findAll = (req, res) => {
    Goalkeeper.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving goalkeepers."
      });
    else res.send(data);
  });
};

// Find a single goalkeeper with a goalkeeperId
exports.findOne = (req, res) => {
    Goalkeeper.findById(req.params.goalkeeper_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found goalkeeper with id ${req.params.goalkeeper_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving goalkeeper with id " + req.params.goalkeeper_id
        });
      }
    } else res.send(data);
  });
};

exports.findInClub = (req, res) => {
    Goalkeeper.findByClubName(req.params.club_name, (err, data) => {
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

// Update a Goalkeeper identified by the GoalkeeperId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

//   console.log(req.body);

Goalkeeper.updateById(
    req.params.goalkeeper_id,
    new Goalkeeper(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found goalkeeper with id ${req.params.goalkeeper_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating goalkeeper with id " + req.params.goalkeeper_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Goalkeeper with the specified goalkeeperId in the request
exports.delete = (req, res) => {
    console.log("DELEETE")
    console.log(req.params)
    Goalkeeper.remove(req.params.goalkeeper_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Goalkeeper with id ${req.params.goalkeeper_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Goalkeeper with id " + req.params.goalkeeper_id
        });
      }
    } else res.send({ message: `Goalkeeper was deleted successfully!` });
  });
};

// Delete all Goalkeepers from the database.
exports.deleteAll = (req, res) => {
    Goalkeeper.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Goalkeepers."
      });
    else res.send({ message: `All Goalkeepers were deleted successfully!` });
  });
};
