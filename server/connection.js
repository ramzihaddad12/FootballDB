const mysql = require("mysql");

var mySqlConnection = mysql.createConnection(
    {
        host: "premier-league.cyohrbp0brvn.us-east-1.rds.amazonaws.com",
        user : "admin",
        password: "admin123",
        database : "premier_league",
        multipleStatements: true
    }
);

mySqlConnection.connect ((err) => {
    if (!err) {
        console.log("Successful connection to database!");
    }

    else {
        console.log("Failed connection to database");
    }
});

module.exports = mySqlConnection;