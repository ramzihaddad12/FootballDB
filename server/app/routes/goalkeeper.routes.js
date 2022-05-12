module.exports = app => {
    const goalkeepers = require("../controllers/goalkeeper.controller.js");
  
    
    // Create a new Customer
    app.post("/players", goalkeepers.create);
  
    // Retrieve all Customers
    app.get("/goalkeepers", goalkeepers.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/goalkeepers/:goalkeeper_id", goalkeepers.findOne);

    app.get("/:club_name/goalkeepers", goalkeepers.findInClub);
  
    // Update a Customer with customerId
    app.put("/goalkeepers/:goalkeeper_id", goalkeepers.update);
  
    // Delete a Customer with customerId
    app.delete("/goalkeepers/:goalkeeper_id", goalkeepers.delete);
  
    // Create a new Customer
    app.delete("/goalkeepers", goalkeepers.deleteAll);
  };
  