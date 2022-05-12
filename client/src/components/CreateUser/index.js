import React, { useState } from "react";


const CreateUser = props => {
  const initialData = { player_name : "",
  club_name :  "",
  player_nationality :  "",
  position :  "",
  matches_played : 0,
  age :  "",
  minutes_played : 0,
  goals : 0,
  assists : 0,
  xG : 0,
  xA : 0 };
      
  const [user, setUser] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (


    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        if (!user.player_name || !user.club_name) return;
        props.createUser(user);
      }}
    >

      <div className="form-group">
        <label>Player Name</label>
        <input
          type="text"
          name="player_name"
          value={user.player_name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Club Name</label>
        <input
          type="text"
          name="club_name"
          value={user.club_name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Player Nationality</label>
        <input
          type="text"
          name="player_nationality"
          value={user.player_nationality}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Position</label>
        <input
          type="text"
          name="position"
          value={user.position}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Matches Played</label>
        <input
          type="number"
          name="matches_played"
          value={user.matches_played}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          type="text"
          name="age"
          value={user.age}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Minutes Played</label>
        <input
          type="number"
          name="minutes_played"
          value={user.minutes_played}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Goals</label>
        <input
          type="number"
          name="goals"
          value={user.goals}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Assists</label>
        <input
          type="number"
          name="assists"
          value={user.assists}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>xG</label>
        <input
          type="number"
          name="xG"
          value={user.xG}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>xA</label>
        <input
          type="number"
          name="xA"
          value={user.xA}
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

export default CreateUser;
