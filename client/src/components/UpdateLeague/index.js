import React, { useState, useEffect } from "react";

const UpdateLeague = props => {
  const [league, setLeague] = useState(props.currentLeague);

  const onInputChange = event => {
    const { name, value } = event.target;

    setLeague({ ...league, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setLeague(props.currentLeague);
  }, [props]);

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        props.updateLeague(league.id, league);
      }}
    >
      <div className="form-group">
        <label>League Name</label>
        <input
          type="text"
          name="league_name"
          value={league.league_name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Country Name</label>
        <input
          type="text"
          name="country_name"
          value={league.country_name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Update</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateLeague;
