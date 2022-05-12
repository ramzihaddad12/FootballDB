import React, { useState } from "react";

const CreateGoalkeeper = props => {
  const initialData = { 
    goalkeeper_id : null,
    goalkeeper_name : "",
    club_name : "",
    player_nationality : "",
    position : "",
    matches_played : null,
    age : null,
    minutes_played : null,
    goals_against : null,
    shots_on_target_against : null,
    saves : null,
    clean_sheets : null,
    pks_saved : null};
      
  const [goalkeeper, setGoalkeeper] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setGoalkeeper({ ...goalkeeper, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        if (!goalkeeper.goalkeeper_name || !goalkeeper.club_name) return;
        props.createGoalkeeper(goalkeeper);
      }}
    >
      <div className="form-group">
        <label>Goalkeeper Name</label>
        <input
          type="text"
          name="goalkeeper_name"
          value={goalkeeper.goalkeeper_name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Club Name</label>
        <input
          type="text"
          name="club_name"
          value={goalkeeper.club_name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Player Nationality</label>
        <input
          type="text"
          name="player_nationality"
          value={goalkeeper.player_nationality}
          onChange={onInputChange}
        />
      </div>
      {/* <div className="form-group">
        <label>Position</label>
        <input
          type="text"
          name="position"
          value={goalkeeper.position}
          onChange={onInputChange}
        />
      </div> */}
      <div className="form-group">
        <label>Matches Played</label>
        <input
          type="number"
          name="matches_played"
          value={goalkeeper.matches_played}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          type="text"
          name="age"
          value={goalkeeper.age}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Minutes Played</label>
        <input
          type="number"
          name="minutes_played"
          value={goalkeeper.minutes_played}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Goals Against</label>
        <input
          type="number"
          name="goals_against"
          value={goalkeeper.goals_against}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Shots on Target Against</label>
        <input
          type="number"
          name="shots_on_target_against"
          value={goalkeeper.shots_on_target_against}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Saves</label>
        <input
          type="number"
          name="saves"
          value={goalkeeper.saves}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Clean sheets</label>
        <input
          type="number"
          name="clean_sheets"
          value={goalkeeper.clean_sheets}
          onChange={onInputChange}
        />
      </div>

      <div className="form-group">
        <label>PKs Saved</label>
        <input
          type="number"
          name="pks_saved"
          value={goalkeeper.pks_saved}
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

export default CreateGoalkeeper;
