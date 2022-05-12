import React, { useState, useEffect } from "react";

const UpdateGoalkeeper = props => {
  const [goalkeeper, setGoalkeeper] = useState(props.currentGoalkeeper);

  const onInputChange = event => {
    const { name, value } = event.target;

    setGoalkeeper({ ...goalkeeper, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setGoalkeeper(props.currentGoalkeeper);
  }, [props]);

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        props.updateGoalkeeper(goalkeeper.id, goalkeeper);
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
        <label> Saves</label>
        <input
          type="number"
          name="saves"
          value={goalkeeper.saves}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Clean Sheets</label>
        <input
          type="number"
          name="clean_sheets"
          value={goalkeeper.clean_sheets}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>PKs saved</label>
        <input
          type="number"
          name="pks_saved"
          value={goalkeeper.pks_saved}
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

export default UpdateGoalkeeper;
