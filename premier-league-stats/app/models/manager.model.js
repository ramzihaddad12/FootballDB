const sql = require("./db.js");

// constructor
const Manager = function(Manager) {
  this.manager_id = Manager.manager_id;
  this.manager_name = Manager.manager_name;
  this.manager_nationality = Manager.manager_nationality;
};

Manager.create = (newManager, result) => {
  // console.log(newmanager)
  sql.query("INSERT INTO manager SET ?", newManager, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created manager: ", { id: res.insertId, ...newManager });
    result(null, { id: res.insertId, ...newManager });
  });
};

Manager.findById = (managerId, result) => {
  sql.query(`SELECT * FROM manager WHERE manager_id = ${managerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found manager: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found manager with the id
    result({ kind: "not_found" }, null);
  });
};

Manager.getAll = result => {
  sql.query("CALL get_all_manager_info()", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("managers: ", res[0]);
    result(null, res[0]);
  });
};


Manager.updateById = (manager_id, Manager, result) => {
  sql.query(
    "UPDATE manager SET manager_name = ?, manager_nationality = ? WHERE manager_id = ?",
    [Manager.manager_name, Manager.manager_nationality, Manager.manager_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result({ kind: "not_found" }, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found manager with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated manager: ", { manager_id: manager_id, ...Manager });
      result(null, {  manager_id: manager_id, ...Manager });
    }
  );
};

Manager.remove = (manager_id, result) => {
  console.log(manager_id)
  sql.query("DELETE FROM manager WHERE manager_id = ?", manager_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found manager with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted manager with manager_id: ", manager_id);
    result(null, res);
  });
};

Manager.removeAll = result => {
  sql.query("DELETE FROM manager", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result({ kind: "not_found" }, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} managers`);
    result(null, res);
  });
};

module.exports = Manager;
