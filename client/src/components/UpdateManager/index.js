import React, { useState, useEffect } from "react";

const UpdateManager = props => {
  const [manager, setManager] = useState(props.currentManager);

  const onInputChange = event => {
    const { name, value } = event.target;

    setManager({ ...manager, [name]: value });
  };

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
        props.updateManager(manager.id, manager);
      }}
    >
      <div className="form-group">
        <label>Manager Name</label>
        <input
          type="text"
          name="manager_name"
          value={manager.manager_name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Manager Nationality</label>
        <input
          type="text"
          name="manager_nationality"
          value={manager.manager_nationality}
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

export default UpdateManager;
