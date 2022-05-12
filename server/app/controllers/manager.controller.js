const Manager = require("../models/manager.model.js");

// Create and Save a new manager
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

  // Create a manager
  const manager = new Manager({
    manager_id : req.body.manager_id,
    manager_name : req.body.manager_name,
    manager_nationality : req.body.manager_nationality
  });

  // Save manager in the database
  Manager.create(manager, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the manager."
      });
    else res.send(data);
  });
};

// Retrieve all managers from the database.
exports.findAll = (req, res) => {
    Manager.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving managers."
      });
    else res.send(data);
  });
};

// Find a single manager with a managerId
exports.findOne = (req, res) => {
    Manager.findById(req.params.manager_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found manager with id ${req.params.manager_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving manager with id " + req.params.manager_id
        });
      }
    } else res.send(data);
  });
};

// Update a manager identified by the managerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

//   console.log(req.body);

Manager.updateById(
    req.params.manager_id,
    new Manager(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found manager with id ${req.params.manager_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating manager with id " + req.params.manager_id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a manager with the specified managerId in the request
exports.delete = (req, res) => {
    console.log("DELEETE")
    console.log(req.params)
    Manager.remove(req.params.manager_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found manager with id ${req.params.manager_id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete manager with id " + req.params.manager_id
        });
      }
    } else res.send({ message: `manager was deleted successfully!` });
  });
};

// Delete all managers from the database.
exports.deleteAll = (req, res) => {
    Manager.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all managers."
      });
    else res.send({ message: `All managers were deleted successfully!` });
  });
};
