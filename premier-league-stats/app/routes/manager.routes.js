module.exports = app => {
    const managers = require("../controllers/manager.controller.js");
  
    
    // Create a new Customer
    app.post("/managers", managers.create);
  
    // Retrieve all Customers
    app.get("/managers", managers.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/managers/:manager_id", managers.findOne);
  
    // Update a Customer with customerId
    app.put("/managers/:manager_id", managers.update);
  
    // Delete a Customer with customerId
    app.delete("/managers/:manager_id", managers.delete);
  
    // Create a new Customer
    app.delete("/managers", managers.deleteAll);
  };
  