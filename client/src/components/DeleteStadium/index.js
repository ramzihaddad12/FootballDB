import React, { useState, useEffect } from "react";

const DeleteStadium = props => {
  const [stadium, setStadium] = useState(props.currentStadium);

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
        console.log("FFFF")
        console.log(stadium)
        props.deleteStadium(stadium.stadium_id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {stadium.stadium_name}?
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Delete</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DeleteStadium;
