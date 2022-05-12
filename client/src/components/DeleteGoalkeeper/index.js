import React, { useState, useEffect } from "react";

const DeleteGoalkeeper = props => {
  const [goalkeeper, setUser] = useState(props.currentGoalkeeper);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setUser(props.currentGoalkeeper);
  }, [props]);

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        props.deleteGoalkeeper(goalkeeper.goalkeeper_id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete { goalkeeper.goalkeeper_name}?
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

export default DeleteGoalkeeper;
