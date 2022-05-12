import React from "react";

// Styles
import "./style.scss";

// Images
import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const DataTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th
              onClick={() => {
                props.onSortChange("player_name");
              }}
            >
              <span className="column-sort">
                Player Name
                <img src={SortIcon} alt="player_name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("club_name");
              }}
            >
              <span className="column-sort">
                Club Name
                <img src={SortIcon} alt="club_name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("player_nationality");
              }}
            >
              <span className="column-sort">
                Player Nationality
                <img src={SortIcon} alt="player_nationality" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("position");
              }}
            >
              <span className="column-sort">
                Position
                <img src={SortIcon} alt="position" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("matches_played");
              }}
            >
              <span className="column-sort">
                Matches played
                <img src={SortIcon} alt="matches_played" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("age");
              }}
            >
              <span className="column-sort">
                Age
                <img src={SortIcon} alt="age" />
              </span>
            </th>


            <th
              onClick={() => {
                props.onSortChange("minutes_played");
              }}
            >
              <span className="column-sort">
                Minutes played
                <img src={SortIcon} alt="minutes_played" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("goals");
              }}
            >
              <span className="column-sort">
                Goals
                <img src={SortIcon} alt="goals" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("assists");
              }}
            >
              <span className="column-sort">
                Assists
                <img src={SortIcon} alt="assists" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("xG");
              }}
            >
              <span className="column-sort">
                xG
                <img src={SortIcon} alt="xG" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("xA");
              }}
            >
              <span className="column-sort">
                xA
                <img src={SortIcon} alt="xA" />
              </span>
            </th>


            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length ? (
            props.users.map(user => (
              <tr key={user.id}>
                <td className="field-avatar">
                  <img
                    src={user.avatar ? user.avatar : PlaceholderImg}
                    alt={user.player_name}
                  />
                </td>
                <td>{user.player_name}</td>
                <td>{user.club_name}</td>
                <td>{user.player_nationality}</td>
                <td>{user.position}</td>
                <td>{user.matches_played}</td>
                <td>{user.age}</td>
                <td>{user.minutes_played}</td>
                <td>{user.goals}</td>
                <td>{user.assists}</td>
                <td>{user.xG}</td>
                <td>{user.xA}</td>

                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(user);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
