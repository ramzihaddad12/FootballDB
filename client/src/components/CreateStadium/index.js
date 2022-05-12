import React, { useState } from "react";

const CreateStadium = props => {
  const initialData = { 
  stadium_name :  "",
  club_name: "",
  capacity : 0};
      
  const [stadium, setStadium] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setStadium({ ...stadium, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        if (!stadium.stadium_name) return;
        props.createStadium(stadium);
      }}
    >
      {/* <div className="form-group">
        <label>League Name</label>
        <input
          type="text"
          name="league_name"
          value={league.league_name}
          onChange={onInputChange}
        />
      </div> */}
      {/* <div className="form-group">
        <label>Country Name</label>
        <input
          type="text"
          name="country_name"
          value={country.country_name}
          onChange={onInputChange}
        />
      </div> */}

      <div className="form-group">
        <label>Stadium Name</label>
        <input
          type="text"
          name="stadium_name"
          value={stadium.stadium_name}
          onChange={onInputChange}
        />
      </div>

      <div className="form-group">
        <label>Club Name</label>
        <input
          type="text"
          name="club_name"
          value={stadium.club_name}
          onChange={onInputChange}
        />
      </div>

      <div className="form-group">
        <label>Capacity</label>
        <input
          type="number"
          name="capacity"
          value={stadium.capacity}
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

export default CreateStadium;
