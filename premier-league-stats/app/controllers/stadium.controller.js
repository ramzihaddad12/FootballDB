const Stadium = require("../models/stadium.model.js");

// Create and Save a new stadium
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

  // Create a stadium
  const stadium = new Stadium({
    stadium_id : req.body.stadium_id,
    stadium_name : req.body.stadium_name,
    club_name : req.body.club_name,
    capacity : req.body.capacity
  });

  // Save stadium in the database
  Stadium.create(stadium, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the stadium."
      });
    else res.send(data);
  });
};

// Retrieve all leagues from the database.
exports.findAll = (req, res) => {
    Stadium.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving countries."
      });
    else res.send(data);
  });
};

// Find a single stadium with a stadiumId
exports.findOne = (req, res) => {
    Stadium.findById(req.params.stadium_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stadium with id ${req.params.stadium_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving stadium with id " + req.params.stadium_id
        });
      }
    } else res.send(data);
  });
};

// Update a stadium identified by the stadiumId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

//   console.log(req.body);

Stadium.updateById(
    req.body.stadium_id,
    new Stadium(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found stadium with id ${req.params.stadium_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating stadium with id " + req.params.stadium_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a stadium with the specified stadiumId in the request
exports.delete = (req, res) => {
    console.log("DELEETE")
    console.log(req.params)
    Stadium.remove(req.params.stadium_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found stadium with id ${req.params.stadium_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete stadium with id " + req.params.stadium_id
        });
      }
    } else res.send({ message: `stadium was deleted successfully!` });
  });
};

// Delete all countries from the database.
exports.deleteAll = (req, res) => {
    Stadium.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all countries."
      });
    else res.send({ message: `All countries were deleted successfully!` });
  });
};
