import React, { useState } from "react";

const CreateManager = props => {
  const initialData = { manager_name : "",
  manager_nationality :  ""
};
      
  const [manager, setManager] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setManager({ ...manager, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        if (!manager.manager_name || !manager.manager_nationality) return;
        props.createManager(manager);
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
        <button className="primary-btn">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateManager;
