module.exports = app => {
    const clubs = require("../controllers/club.controller.js");
  
    
    // Create a new Customer
    app.post("/clubs", clubs.create);
  
    // Retrieve all Customers
    app.get("/clubs", clubs.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/clubs/:club_name", clubs.findOne);

    app.get("/:league_id/clubs", clubs.findInLeague);

  
    // Update a Customer with customerId
    app.put("/clubs/:club_name", clubs.update);
  
    // Delete a Customer with customerId
    app.delete("/clubs/:club_name", clubs.delete);
  
    // Create a new Customer
    app.delete("/clubs", clubs.deleteAll);
  };
  