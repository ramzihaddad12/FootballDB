const sql = require("./db.js");

// constructor
const Player = function(Player) {
  this.player_id = Player.player_id;
  this.player_name = Player.player_name;
  this.club_name = Player.club_name;
  this.player_nationality = Player.player_nationality;
  this.position = Player.position;
  this.matches_played = Player.matches_played;
  this.age = Player.age;
  this.minutes_played = Player.minutes_played;
  this.goals = Player.goals;
  this.assists = Player.assists;
  this.xG = Player.xG;
  this.xA = Player.xA;
};

Player.create = (newPlayer, result) => {
  // console.log(newPlayer)
  sql.query("INSERT INTO player SET ?", newPlayer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Player: ", { id: res.insertId, ...newPlayer });
    result(null, { id: res.insertId, ...newPlayer });
  });
};

Player.findById = (playerId, result) => {
  sql.query(`SELECT * FROM player WHERE player_id = ${playerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Player: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Player with the id
    result({ kind: "not_found" }, null);
  });
};

Player.getAll = result => {
  sql.query("SELECT * FROM player", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Players: ", res);
    result(null, res);
  });
};


Player.updateById = (player_id, Player, result) => {
  sql.query(
    "UPDATE player SET player_name = ?, club_name = ?, position = ?, matches_played = ?, age = ?, minutes_played = ?, goals = ?, assists = ?, xG = ?, xA = ? WHERE player_id = ?",
    [Player.player_name, Player.club_name, Player.position, Player.matches_played, Player.age, Player.minutes_played, Player.goals, Player.assists, Player.xG, Player.xA, Player.player_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result({ kind: "not_found" }, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Player with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Player: ", { player_id: player_id, ...Player });
      result(null, {  player_id: player_id, ...Player });
    }
  );
};

Player.findByClubName = (club_name, result) => {
  console.log(`SELECT * FROM player WHERE club_name  = '${club_name}' `)
sql.query(`SELECT * FROM player WHERE club_name  = '${club_name}' `, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }

  if (res.length) {
    console.log("found players: ", res);
    result(null, res);
    return;
  }

  // not found club with the id
  result({ kind: "not_found" }, null);
});
};

Player.findByCountryName = (country_name, result) => {
sql.query(`CALL get_players_from_nation('${country_name}') `, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }

  if (res.length) {
    console.log("found players: ", res);
    result(null, res[0]);
    return;
  }

  // not found club with the id
  result({ kind: "not_found" }, null);
});
};

Player.remove = (player_id, result) => {
  console.log(player_id)
  sql.query("DELETE FROM player WHERE player_id = ?", player_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Player with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Player with player_id: ", player_id);
    result(null, res);
  });
};

Player.removeAll = result => {
  sql.query("DELETE FROM player", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} Players`);
    result(null, res);
  });
};

module.exports = Player;
