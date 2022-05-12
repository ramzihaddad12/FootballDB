module.exports = app => {
    const stadiums = require("../controllers/stadium.controller.js");
  
    
    // Create a new Customer
    app.post("/stadiums", stadiums.create);
  
    // Retrieve all Customers
    app.get("/stadiums", stadiums.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/stadiums/:stadium_id", stadiums.findOne);

    // app.get("/:league_id/stadiums", stadiums.findInLeague);

  
    // Update a Customer with customerId
    app.put("/stadiums/:stadium_id", stadiums.update);
  
    // Delete a Customer with customerId
    app.delete("/stadiums/:stadium_id", stadiums.delete);
  
    // Create a new Customer
    app.delete("/stadiums", stadiums.deleteAll);
  };
  