import React, { useState, useEffect } from "react";

const DeleteUser = props => {
  const [user, setUser] = useState(props.currentUser);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        props.deleteUser(user.player_id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {user.player_name}?
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

export default DeleteUser;
