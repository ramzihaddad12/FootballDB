const sql = require("./db.js");

// constructor
const Goalkeeper = function(Goalkeeper) {
  this.goalkeeper_id = Goalkeeper.goalkeeper_id;
  this.goalkeeper_name = Goalkeeper.goalkeeper_name;
  this.club_name = Goalkeeper.club_name;
  this.player_nationality = Goalkeeper.player_nationality;
//   this.position = Goalkeeper.position;
  this.matches_played = Goalkeeper.matches_played;
  this.age = Goalkeeper.age;
  this.minutes_played = Goalkeeper.minutes_played;
  this.goals_against = Goalkeeper.goals_against;
  this.shots_on_target_against = Goalkeeper.shots_on_target_against;
  this.saves = Goalkeeper.saves;
  this.clean_sheets = Goalkeeper.clean_sheets;
  this.pks_saved = Goalkeeper.pks_saved;
};

Goalkeeper.create = (newGoalkeeper, result) => {
  // console.log(newPlayer)
  sql.query("INSERT INTO goalkeeper SET ?", newGoalkeeper, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Goalkeeper: ", { id: res.insertId, ...newGoalkeeper });
    result(null, { id: res.insertId, ...newGoalkeeper });
  });
};

Goalkeeper.findById = (goalkeeperId, result) => {
  sql.query(`SELECT * FROM goalkeeper WHERE goalkeeper_id = ${goalkeeperId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Goalkeeper: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Goalkeeper with the id
    result({ kind: "not_found" }, null);
  });
};

Goalkeeper.getAll = result => {
  sql.query("CALL get_goalkeeper_stats()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Goalkeepers: ", res);
    result(null, res[0]);
  });
};


Goalkeeper.updateById = (goalkeeper_id, Goalkeeper, result) => {
  sql.query(
    "UPDATE goalkeeper SET goalkeeper_name = ?, club_name = ?, matches_played = ?, age = ?, minutes_played = ?, goals = ?, assists = ?, xG = ?, xA = ? WHERE goalkeeper_id = ?",
    [Goalkeeper.goalkeeper_name, Goalkeeper.club_name, Goalkeeper.position, Goalkeeper.matches_played,
        Goalkeeper.age, Goalkeeper.minutes_played, Goalkeeper.goals, Goalkeeper.assists, Goalkeeper.xG, Goalkeeper.xA, Goalkeeper.goalkeeper_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result({ kind: "not_found" }, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Goalkeeper with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Goalkeeper: ", { goalkeeper_id: goalkeeper_id, ...Goalkeeper });
      result(null, {  goalkeeper_id: goalkeeper_id, ...Goalkeeper });
    }
  );
};

Goalkeeper.findByClubName = (club_name, result) => {
  console.log(`SELECT * FROM goalkeeper WHERE club_name  = '${club_name}' `)
    sql.query(`SELECT * FROM goalkeeper WHERE club_name  = '${club_name}' `, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }

  if (res.length) {
    console.log("found goalkeepers: ", res);
    result(null, res);
    return;
  }

  // not found club with the id
  result({ kind: "not_found" }, null);
});
};

Goalkeeper.remove = (goalkeeper_id, result) => {
  console.log(goalkeeper_id)
  sql.query("DELETE FROM goalkeeper WHERE goalkeeper_id = ?", goalkeeper_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found goalkeeper with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Goalkeeper with goalkeeper_id: ", goalkeeper_id);
    result(null, res);
  });
};

Goalkeeper.removeAll = result => {
  sql.query("DELETE FROM goalkeeper", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} Goalkeepers`);
    result(null, res);
  });
};

module.exports = Goalkeeper;
