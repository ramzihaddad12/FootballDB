module.exports = app => {
    const players = require("../controllers/player.controller.js");
  
    
    // Create a new Customer
    app.post("/players", players.create);
  
    // Retrieve all Customers
    app.get("/players", players.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/players/:player_id", players.findOne);

    app.get("/:club_name/players", players.findInClub);
    app.get("/c/:country_name/players", players.findInCountry);
  
    // Update a Customer with customerId
    app.put("/players/:player_id", players.update);
  
    // Delete a Customer with customerId
    app.delete("/players/:player_id", players.delete);
  
    // Create a new Customer
    app.delete("/players", players.deleteAll);
  };
  