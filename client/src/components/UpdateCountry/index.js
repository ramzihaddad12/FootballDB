import React, { useState, useEffect } from "react";

const UpdateCountry = props => {
  const [country, setCountry] = useState(props.currentCountry);

  const onInputChange = event => {
    const { name, value } = event.target;

    setCountry({ ...country, [name]: value });
  };

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
        props.updateCountry(country.id, country);
      }}
    >
      <div className="form-group">
        <label>Country Name</label>
        <input
          type="text"
          name="country_name"
          value={country.country_name}
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

export default UpdateCountry;
