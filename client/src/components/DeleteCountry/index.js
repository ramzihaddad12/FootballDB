import React, { useState, useEffect } from "react";

const DeleteCountry = props => {
  const [country, setCountry] = useState(props.currentCountry);

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setCountry(props.currentCountry);
  }, [props]);

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        props.deleteCountry(country.country_name);
      }}
    >
      <div className="form-group">
        Are you sure you want to delete {country.country_name}?
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

export default DeleteCountry;
