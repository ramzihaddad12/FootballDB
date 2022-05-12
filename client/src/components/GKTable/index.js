import React from "react";

// Styles
import "./style.scss";

// Images
import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const GKTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th
              onClick={() => {
                props.onSortChange("goalkeeper_name");
              }}
            >
              <span className="column-sort">
                Goalkeeper Name
                <img src={SortIcon} alt="goalkeeper_name" />
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
{/* 
            <th
              onClick={() => {
                props.onSortChange("position");
              }}
            >
              <span className="column-sort">
                Position
                <img src={SortIcon} alt="position" />
              </span>
            </th> */}

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
                props.onSortChange("goals_against");
              }}
            >
              <span className="column-sort">
                Goals Against
                <img src={SortIcon} alt="goals_against" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("shots_on_target_against");
              }}
            >
              <span className="column-sort">
                Shots On Target Against
                <img src={SortIcon} alt="shots_on_target_against" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("saves");
              }}
            >
              <span className="column-sort">
                Saves
                <img src={SortIcon} alt="saves" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("clean_sheets");
              }}
            >
              <span className="column-sort">
                Clean Sheets
                <img src={SortIcon} alt="clean_sheets" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("pks_saved");
              }}
            >
              <span className="column-sort">
                PKs Saved
                <img src={SortIcon} alt="pks_saved" />
              </span>
            </th>


            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.goalkeepers.length ? (
            props.goalkeepers.map(goalkeeper => (
              <tr key={goalkeeper.id}>
                <td className="field-avatar">
                  <img
                    src={goalkeeper.avatar ? goalkeeper.avatar : PlaceholderImg}
                    alt={goalkeeper.goalkeeper_name}
                  />
                </td>
                <td>{goalkeeper.goalkeeper_name}</td>
                <td>{goalkeeper.club_name}</td>
                <td>{goalkeeper.player_nationality}</td>
                {/* <td>{goalkeeper.position}</td> */}
                <td>{goalkeeper.matches_played}</td>
                <td>{goalkeeper.age}</td>
                <td>{goalkeeper.minutes_played}</td>
                <td>{goalkeeper.goals_against}</td>
                <td>{goalkeeper.shots_on_target_against}</td>
                <td>{goalkeeper.saves}</td>
                <td>{goalkeeper.clean_sheets}</td>
                <td>{goalkeeper.pks_saved}</td>

                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(goalkeeper);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(goalkeeper)}
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

export default GKTable;
