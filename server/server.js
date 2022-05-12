// const express = require("express");
// const bodyParser = require("body-parser");
// const countryRoutes = require("./routes/countries");
// const leagueRoutes = require("./routes/leagues");
// const managerRoutes = require("./routes/managers");
// const playerRoutes = require("./routes/players");
// const goalkeeperRoutes = require("./routes/goalkeepers");
// const clubRoutes = require("./routes/clubs");

// const mySqlConnection = require("./connection");
// var app = express();

// app.use(bodyParser.json());
// app.use("/countries", countryRoutes);
// app.use("/leagues", leagueRoutes);
// app.use("/managers", managerRoutes);
// app.use("/players", playerRoutes);
// app.use("/clubs", clubRoutes);
// app.use("/goalkeepers", goalkeeperRoutes);

// // app.get("")
// app.listen(3000);
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var cors = require('cors')

app.use(cors()) // Use this after the variable declaration

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});


require("./app/routes/player.routes.js")(app);
require("./app/routes/league.routes.js")(app);
require("./app/routes/manager.routes.js")(app);
require("./app/routes/club.routes.js")(app);
require("./app/routes/goalkeeper.routes.js")(app);
require("./app/routes/country.routes.js")(app);
require("./app/routes/stadium.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
