const sql = require("./db.js");

// constructor
const Country = function(Country) {
  this.country_name = Country.country_name;
//   this.num_of_players = Country.num_of_players;
};

Country.create = (newCountry, result) => {
  // console.log(newLeague)
  sql.query("INSERT INTO country SET ?", newCountry, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Country: ", { id: res.insertId, ...newCountry });
    result(null, { id: res.insertId, ...newCountry });
  });
};

Country.findById = (countryId, result) => {
  console.log(`CALL get_nation( "${countryId}")`)
  sql.query(`CALL get_nation( "${countryId}")`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Country: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found League with the id
    result({ kind: "not_found" }, null);
  });
};

Country.getAll = result => {
  sql.query("CALL get_all_nations()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Countries: ", res[0]);
    result(null, res[0]);
  });
};


Country.updateById = (country_name, Country, result) => {
  sql.query(
    "UPDATE country SET country_name = ? WHERE country_name = ?",
    [Country.country_name, Country.country_name],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result({ kind: "not_found" }, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Country with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Country: ", { country_name: country_name, ...Country });
      result(null, {  country_name: country_name, ...Country });
    }
  );
};

Country.remove = (country_name, result) => {
  console.log(country_name)
  sql.query("DELETE FROM country WHERE country_name = ?", country_name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      // result({ kind: "not_found" }, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found League with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted country with country_name: ", country_name);
    result(null, res);
  });
};

Country.removeAll = result => {
  sql.query("DELETE FROM country", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} Country`);
    result(null, res);
  });
};

module.exports = Country;
