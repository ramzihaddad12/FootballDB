import React, { useState } from "react";

const CreateCountry = props => {
  const initialData = { 
  country_name :  "" };
      
  const [country, setCountry] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setCountry({ ...country, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        if (!country.country_name) return;
        props.createCountry(country);
      }}
    >
      {/* <div className="form-group">
        <label>League Name</label>
        <input
          type="text"
          name="league_name"
          value={league.league_name}
          onChange={onInputChange}
        />
      </div> */}
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
        <button className="primary-btn">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateCountry;
