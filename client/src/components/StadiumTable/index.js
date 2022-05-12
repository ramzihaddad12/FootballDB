import React from "react";

// Styles
import "./style.scss";

// Images
import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const StadiumTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
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
            {/* <th
              onClick={() => {
                props.onSortChange("country_name");
              }}
            >
              <span className="column-sort">
                Country Name
                <img src={SortIcon} alt="country_name" />
              </span>
            </th> */}

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
                props.onSortChange("capacity");
              }}
            >
              <span className="column-sort">
                Capacity
                <img src={SortIcon} alt="capacity" />
              </span>
            </th>
            

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.stadiums.length ? (
            props.stadiums.map(stadium => (
              <tr key={stadium.id}>
                <td className="field-avatar">
                  <img
                    src={stadium.avatar ? stadium.avatar : PlaceholderImg}
                    alt={stadium.stadium_name}
                  />
                </td>
                {/* <a  href={`/c/${stadium.stadium_name}/players`} > */}
                <td>{stadium.stadium_name}</td>

                {/* </a> */}
                <td>{stadium.club_name}</td>
                <td>{stadium.capacity}</td>

                {/* <td>{league.league_name}</td> */}
                {/* <td>{league.country_name}</td>                
                <td>{league.num_of_clubs}</td>
                <td>{league.num_of_players}</td>   */}
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(stadium);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(stadium)}
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

export default StadiumTable;
