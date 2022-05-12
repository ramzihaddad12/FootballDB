import React from "react";

// Styles
import "./style.scss";

// Images
import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const ClubTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
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
                props.onSortChange("league_id");
              }}
            >
              <span className="column-sort">
                League ID
                <img src={SortIcon} alt="league_id" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("manager_name");
              }}
            >
              <span className="column-sort">
                Manager Name
                <img src={SortIcon} alt="manager_name" />
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
                props.onSortChange("wins");
              }}
            >
              <span className="column-sort">
                Wins
                <img src={SortIcon} alt="wins" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("draws");
              }}
            >
              <span className="column-sort">
              Draws
                <img src={SortIcon} alt="draws" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("losses");
              }}
            >
              <span className="column-sort">
              Losses
                <img src={SortIcon} alt="losses" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("goals_for");
              }}
            >
              <span className="column-sort">
                Goals For
                <img src={SortIcon} alt="goals_for" />
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
                props.onSortChange("points");
              }}
            >
              <span className="column-sort">
                Points
                <img src={SortIcon} alt="points" />
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
                props.onSortChange("xGA");
              }}
            >
              <span className="column-sort">
                xGA
                <img src={SortIcon} alt="xGA" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("xGD");
              }}
            >
              <span className="column-sort">
                xGD
                <img src={SortIcon} alt="xGD" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("xGD_per_90");
              }}
            >
              <span className="column-sort">
                xGD Per 90
                <img src={SortIcon} alt="xGD_per_90" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("capacity");
              }}
            >
              <span className="column-sort">
                Capacity
                <img src={SortIcon} alt="capacity" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("stadium_name");
              }}
            >
              <span className="column-sort">
                Stadium Name
                <img src={SortIcon} alt="stadium_name" />
              </span>
            </th>

            <th
              onClick={() => {
                props.onSortChange("average_age");
              }}
            >
              <span className="column-sort">
                Average Age
                <img src={SortIcon} alt="average_age" />
              </span>
            </th>


            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.clubs.length ? (
            props.clubs.map(club => (
              <tr key={club.id}>
                <td className="field-avatar">
                  <img
                    src={club.avatar ? club.avatar : PlaceholderImg}
                    alt={club.club_name}
                  />
                
                </td>
                <a  href={`${club.club_name}/players`} >
                  <td>{club.club_name}</td>

                </a>
                {/* <td>{club.club_name}</td> */}
                <td>{club.league_id}</td>
                <td>{club.manager_name}</td>
                {/* <td>{club.manager_id}</td> */}
                <td>{club.matches_played}</td>
                <td>{club.wins}</td>
                <td>{club.draws}</td>
                <td>{club.losses}</td>
                <td>{club.goals_for}</td>
                <td>{club.goals_against}</td>
                <td>{club.points}</td>
                <td>{club.xG}</td>
                <td>{club.xGA}</td>
                <td>{club.xGD}</td>
                <td>{club.xGD_per_90}</td>
                <td>{club.capacity}</td>
                <td>{club.stadium_name}</td>
                <td>{club.average_age}</td>

                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(club);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(club)}
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

export default ClubTable;
