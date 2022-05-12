import React, { useState, useEffect } from "react";

const UpdateStadium = props => {
  const [stadium, setStadium] = useState(props.currentStadium);

  const onInputChange = event => {
    const { name, value } = event.target;

    setStadium({ ...stadium, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setStadium(props.currentStadium);
  }, [props]);

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        props.updateStadium(stadium.id, stadium);
      }}
    >
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
        <button className="primary-btn">Update</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateStadium;
