module.exports = app => {
    const leagues = require("../controllers/league.controller.js");
  
    
    // Create a new Customer
    app.post("/leagues", leagues.create);
  
    // Retrieve all Customers
    app.get("/leagues", leagues.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/leagues/:league_id", leagues.findOne);
  
    // Update a Customer with customerId
    app.put("/leagues/:league_id", leagues.update);
  
    // Delete a Customer with customerId
    app.delete("/leagues/:league_id", leagues.delete);
  
    // Create a new Customer
    app.delete("/leagues", leagues.deleteAll);
  };
  