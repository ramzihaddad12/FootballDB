import React from "react";

// Styles
import "./style.scss";

// Images
import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const CountryTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th
              onClick={() => {
                props.onSortChange("country_name");
              }}
            >
                <span className="column-sort">
                  Country Name
                  <img src={SortIcon} alt="country_name" />
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
                props.onSortChange("num_of_players");
              }}
            >
              <span className="column-sort">
                Number of Players
                <img src={SortIcon} alt="num_of_players" />
              </span>
            </th>

            {/* <th
              onClick={() => {
                props.onSortChange("num_of_players");
              }}
            >
              <span className="column-sort">
                Number of Players
                <img src={SortIcon} alt="num_of_players" />
              </span>
            </th> */}
            

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.countries.length ? (
            props.countries.map(country => (
              <tr key={country.id}>
                <td className="field-avatar">
                  <img
                    src={country.avatar ? country.avatar : PlaceholderImg}
                    alt={country.country_name}
                  />
                </td>
                <a  href={`/c/${country.country_name}/players`} >
                  <td>{country.country_name}</td>

                </a>
                <td>{country.num_of_players}</td>
                {/* <td>{league.league_name}</td> */}
                {/* <td>{league.country_name}</td>                
                <td>{league.num_of_clubs}</td>
                <td>{league.num_of_players}</td>   */}
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(country);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(country)}
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

export default CountryTable;
