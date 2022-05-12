import React, { useState } from "react";

const CreateLeague = props => {
  const initialData = { league_name : "",
  country_name :  "" };
      
  const [league, setLeague] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setLeague({ ...league, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        if (!league.league_name || !league.country_name) return;
        props.createLeague(league);
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
        <button className="primary-btn">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateLeague;
