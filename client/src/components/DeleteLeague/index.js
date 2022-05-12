import React, { useState, useEffect } from "react";

const DeleteLeague = props => {
  const [league, setLeague] = useState(props.currentLeague);

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
        props.deleteLeague(league.league_id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {league.league_name}?
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

export default DeleteLeague;
