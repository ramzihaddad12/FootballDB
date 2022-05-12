import React from "react";

// Styles
import "./style.scss";

// Images
import PlaceholderImg from "../../img/placeholder-user.jpg";
import SortIcon from "../../img/sort-icon.png";

const ManagerTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
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
                props.onSortChange("manager_nationality");
              }}
            >
              <span className="column-sort">
                Manager Nationality
                <img src={SortIcon} alt="manager_nationality" />
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
            

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.managers.length ? (
            props.managers.map(manager => (
              <tr key={manager.id}>
                <td className="field-avatar">
                  <img
                    src={manager.avatar ? manager.avatar : PlaceholderImg}
                    alt={manager.manager_name}
                  />
                </td>
                <td>{manager.manager_name}</td>
                <td>{manager.manager_nationality}</td>                
                <td>{manager.club_name}</td>                

                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(manager);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(manager)}
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

export default ManagerTable;
