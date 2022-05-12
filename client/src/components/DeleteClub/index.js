import React, { useState, useEffect } from "react";

const DeleteClub = props => {
  const [club, setClub] = useState(props.currentClub);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setClub(props.currentClub);
  }, [props]);

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        props.deleteClub(club.club_name);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {club.club_name}?
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

export default DeleteClub;
