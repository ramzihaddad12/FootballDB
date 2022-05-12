module.exports = app => {
    const countries = require("../controllers/country.controller.js");
  
    
    // Create a new Customer
    app.post("/countries", countries.create);
  
    // Retrieve all Customers
    app.get("/countries", countries.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/countries/:country_name", countries.findOne);

    // app.get("/:league_id/countries", countries.findInLeague);

  
    // Update a Customer with customerId
    app.put("/countries/:country_name", countries.update);
  
    // Delete a Customer with customerId
    app.delete("/countries/:country_name", countries.delete);
  
    // Create a new Customer
    app.delete("/countries", countries.deleteAll);
  };
  