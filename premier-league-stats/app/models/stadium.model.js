const sql = require("./db.js");

// constructor
const Stadium = function(Stadium) {
  this.stadium_id = Stadium.stadium_id
  this.stadium_name = Stadium.stadium_name;
  this.club_name = Stadium.club_name;
  this.capacity = Stadium.capacity;

//   this.num_of_players = stadium.num_of_players;
};

Stadium.create = (newStadium, result) => {
  // console.log(newLeague)
  sql.query("INSERT INTO stadium SET ?", newStadium, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created stadium: ", { stadium_id: res.insertId, ...newStadium });
    result(null, { stadium_id: res.insertId, ...newStadium });
  });
};

Stadium.findById = (stadiumId, result) => {
  sql.query(`SELECT * FROM stadium WHERE stadium_id = ${stadiumId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found stadium: ", res);
      result(null, res);
      return;
    }

    // not found League with the id
    result({ kind: "not_found" }, null);
  });
};

Stadium.getAll = result => {
  sql.query("SELECT * FROM stadium", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Countries: ", res);
    result(null, res);
  });
};


Stadium.updateById = (stadium_id, Stadium, result) => {
  sql.query(
    "UPDATE stadium SET stadium_name = ?, club_name = ?, capacity = ? WHERE stadium_id = ?",
    [Stadium.stadium_name, Stadium.club_name, Stadium.capacity, stadium_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result({ kind: "not_found" }, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Stadium with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Stadium: ", { stadium_id: stadium_id, ...Stadium });
      result(null, {  stadium_id: stadium_id, ...Stadium });
    }
  );
};

Stadium.remove = (stadium_id, result) => {
  console.log(stadium_id)
  sql.query("DELETE FROM stadium WHERE stadium_id = ?", stadium_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found League with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted stadium with stadium_id: ", stadium_id);
    result(null, res);
  });
};

Stadium.removeAll = result => {
  sql.query("DELETE FROM stadium", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} Stadium`);
    result(null, res);
  });
};

module.exports = Stadium;
