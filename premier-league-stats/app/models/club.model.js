const sql = require("./db.js");

// constructor
const Club = function(Club) {
  this.club_name = Club.club_name;
  this.league_id = Club.league_id;
  this.manager_id = Club.manager_id;
  // this.manager_name = Club.manager_name;
  this.matches_played = Club.matches_played;
  this.wins = Club.wins;
  this.draws = Club.draws;
  this.losses = Club.losses;
  this.goals_for = Club.goals_for;
  this.goals_against = Club.goals_against;
  this.points = Club.points;
  this.xG = Club.xG;
  this.xGA = Club.xGA;
  this.xGD = Club.xGD;
  this.xGD_per_90 = Club.xGD_per_90;
  // this.capacity = Club.capacity;
};

Club.create = (newClub, result) => {
  // console.log(newClub)
  sql.query("INSERT INTO club SET ?", newClub, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created club: ", { id: res.insertId, ...newClub });
    result(null, { id: res.insertId, ...newClub });
  });
};

Club.findById = (clubName, result) => {
    console.log(`CALL get_club_stats()  = '${clubName}' `)
  sql.query(`CALL get_club_stats('${clubName}') `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found club: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found club with the id
    result({ kind: "not_found" }, null);
  });
};

Club.findByLeagueID = (league_id, result) => {
    console.log(`CALL get_clubs_in_league_stats( ${league_id} )`)
  sql.query(`CALL get_clubs_in_league_stats(${league_id} )`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found clubs: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found club with the id
    result({ kind: "not_found" }, null);
  });
};

Club.getAll = result => {
  sql.query("CALL get_all_club_stats()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("clubs: ", res[0]);
    result(null, res[0]);
  });
};


Club.updateById = (club_name, Club, result) => {
  sql.query(
    "UPDATE club SET league_id = ?,  manager_id = ?, matches_played = ?, wins = ?, draws = ?, losses = ?, goals_for = ?, goals_against = ?, points = ?, xG = ?, xGA = ?, xGD = ?, xGD_per_90 = ? WHERE club_name = ?",
    [Club.league_id,  Club.manager_id, Club.matches_played, Club.wins,  Club.draws, Club.losses, Club.goals_for,
        Club.goals_against,  Club.points, Club.xG, Club.xGA, Club.xGD, Club.xGD_per_90, Club.club_name],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result({ kind: "not_found" }, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found club with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated club: ", { club_name: club_name, ...Club });
      result(null, {  club_name: club_name, ...Club });
    }
  );
};

Club.remove = (club_name, result) => {
  console.log(club_name)
  sql.query("DELETE FROM club WHERE club_name = ?", club_name, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found club with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted club with club_name: ", club_name);
    result(null, res);
  });
};

Club.removeAll = result => {
  sql.query("DELETE FROM club", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} clubs`);
    result(null, res);
  });
};

module.exports = Club;
