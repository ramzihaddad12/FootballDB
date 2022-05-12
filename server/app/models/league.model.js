const sql = require("./db.js");

// constructor
const League = function(League) {
  this.league_id = League.league_id;
  this.league_name = League.league_name;
  this.country_name = League.country_name;
};

League.create = (newLeague, result) => {
  // console.log(newLeague)
  sql.query("INSERT INTO league SET ?", newLeague, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created League: ", { league_id: res.insertId, ...newLeague });
    result(null, { league_id: res.insertId, ...newLeague });
  });
};

League.findById = (leagueId, result) => {
  sql.query(`CALL get_league_stats( ${leagueId})`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res[0].length) {
      console.log("found League: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found League with the id
    result({ kind: "not_found" }, null);
  });
};

League.getAll = result => {
  sql.query("CALL get_all_league_stats()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Leagues: ", res[0]);
    result(null, res[0]);
  });
};


League.updateById = (league_id, League, result) => {
  sql.query(
    "UPDATE league SET league_name = ?, country_name = ? WHERE league_id = ?",
    [League.league_name, League.country_name, League.league_id],
    (err, res) => {
      if (err) {
        console.log("HI")
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

      console.log("updated League: ", { league_id: league_id, ...League });
      result(null, {  league_id: league_id, ...League });
    }
  );
};

League.remove = (league_id, result) => {
  console.log(league_id)
  sql.query("DELETE FROM league WHERE league_id = ?", league_id, (err, res) => {
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

    console.log("deleted League with league_id: ", league_id);
    result(null, res);
  });
};

League.removeAll = result => {
  sql.query("DELETE FROM league", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} Leagues`);
    result(null, res);
  });
};

module.exports = League;
