import React, { useState, useEffect } from "react";

const DeleteManager = props => {
  const [manager, setManager] = useState(props.currentManager);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setManager(props.currentManager);
  }, [props]);

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        props.deleteManager(manager.manager_id);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {manager.manager_name}?
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

export default DeleteManager;
