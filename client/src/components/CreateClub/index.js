import React, { useState } from "react";

const CreateClub = props => {
  const initialData = {
  club_name :  "",
  league_id :  0,
  manager_id :  0,
  matches_played : 0,
  wins :  0,
  draws: 0,
  losses: 0,
  goals_for : 0,
  goals_against : 0,
  points : 0, 
  xG : 0,
  xGA : 0,
  xGD : 0,
  xGD_per_90: 0,
  capacity : 0
};
      
  const [club, setClub] = useState(initialData);

  const onInputChange = event => {
    const { name, value } = event.target;

    setClub({ ...club, [name]: value });
  };

  const cancel = event => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form className = "form-me"
      onSubmit={event => {
        event.preventDefault();
        if (!club.club_name) return;
        props.createClub(club);
      }}
    >
      <div className="form-group">
        <label>Club Name</label>
        <input
          type="text"
          name="club_name"
          value={club.club_name}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>League ID</label>
        <input
          type="number"
          name="league_id"
          value={club.league_id}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Manager ID</label>
        <input
          type="number"
          name="manager_id"
          value={club.manager_id}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Matches Played</label>
        <input
          type="number"
          name="matches_played"
          value={club.matches_played}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Wins</label>
        <input
          type="number"
          name="wins"
          value={club.wins}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Draws</label>
        <input
          type="number"
          name="draws"
          value={club.draws}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Losses</label>
        <input
          type="number"
          name="losses"
          value={club.losses}
          onChange={onInputChange}
        />
      </div>

 
      <div className="form-group">
        <label>Goals For</label>
        <input
          type="number"
          name="goals_for"
          value={club.goals_for}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Goals Against</label>
        <input
          type="number"
          name="goals_against"
          value={club.goals_against}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Points</label>
        <input
          type="number"
          name="points"
          value={club.points}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>xG</label>
        <input
          type="number"
          name="xG"
          value={club.xG}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>xGA</label>
        <input
          type="number"
          name="xGA"
          value={club.xGA}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>xGD</label>
        <input
          type="number"
          name="xGD"
          value={club.xGD}
          onChange={onInputChange}
        />
      </div>

      <div className="form-group">
        <label>xGD_per_90</label>
        <input
          type="number"
          name="xGD_per_90"
          value={club.xGD_per_90}
          onChange={onInputChange}
        />
      </div>

      {/* <div className="form-group">
        <label>capacity</label>
        <input
          type="number"
          name="capacity"
          value={club.capacity}
          onChange={onInputChange}
        />
      </div> */}
      <div className="form-group form-group--actions">
        <button className="primary-btn">Create</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateClub;
