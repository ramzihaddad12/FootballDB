const Country = require("../models/country.model.js");

// Create and Save a new Country
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

  // Create a Country
  const country = new Country({
    // league_id : req.body.league_id,
    // league_name : req.body.league_name,
    country_name : req.body.country_name
  });

  // Save country in the database
  Country.create(country, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the country."
      });
    else res.send(data);
  });
};

// Retrieve all leagues from the database.
exports.findAll = (req, res) => {
    Country.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving countries."
      });
    else res.send(data);
  });
};

// Find a single country with a countryId
exports.findOne = (req, res) => {
    Country.findById(req.params.country_name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found country with id ${req.params.country_name}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving country with id " + req.params.country_name
        });
      }
    } else res.send(data);
  });
};

// Update a country identified by the countryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

//   console.log(req.body);

Country.updateById(
    req.params.country_name,
    new Country(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found country with id ${req.params.country_name}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating country with id " + req.params.country_name
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a country with the specified countryId in the request
exports.delete = (req, res) => {
    console.log("DELEETE")
    console.log(req.params)
    Country.remove(req.params.country_name, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found country with id ${req.params.country_name}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete country with id " + req.params.country_name
        });
      }
    } else res.send({ message: `country was deleted successfully!` });
  });
};

// Delete all countries from the database.
exports.deleteAll = (req, res) => {
    Country.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all countries."
      });
    else res.send({ message: `All countries were deleted successfully!` });
  });
};
