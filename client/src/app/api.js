import axios from "axios";

const apiURL = process.env.REACT_APP_REQRES_API;

function getUsers() {
  const response = axios.get(`${apiURL}/players`);
  console.log(response)
  return response;
}

function getCreatedUser({ player_name,
  club_name,
  player_nationality,
  position,
  matches_played,
  age,
  minutes_played,
  goals,
  assists,
  xG,
  xA}) {
  const response = axios.post(`${apiURL}/players`, {
    player_name,
    club_name,
    player_nationality,
    position,
    matches_played,
    age,
    minutes_played,
    goals,
    assists,
    xG,
    xA
  });

  return response;
}

function getUpdatedUser(id, user) {
  const response = axios.put(`${apiURL}/players/${id}`, {
    // avatar: user.avatar,
    // id: id,
    // email: user.email,
    // first_name: user.first_name,
    // last_name: user.last_name
    player_id : user.player_id,
    player_name : user.player_name,
    club_name : user.club_name,
    player_nationality : user.player_nationality,
    position : user.position,
    matches_played : user.matches_played,
    age : user.age,
    minutes_played : user.minutes_played,
    goals : user.goals,
    assists : user.assists,
    xG : user.xG,
    xA : user.xA
  });

  return response;
}

function getDeletedUser(player_id) {
  const response = axios.delete(`${apiURL}/players/${player_id}`);
  console.log(response)
  return response;
}

//////////////////////////////////
//leagues
//////////////////////////////////
function getLeagues() {
  const response = axios.get(`${apiURL}/leagues`);
  console.log(response)
  return response;
}

function getCreatedLeague({ league_name,
  country_name}) {
  const response = axios.post(`${apiURL}/leagues`, {
    league_name,
    country_name
  });

  return response;
}

function getUpdatedLeague(id, league) {
  const response = axios.put(`${apiURL}/leagues/${id}`, {
    // avatar: user.avatar,
    // id: id,
    // email: user.email,
    // first_name: user.first_name,
    // last_name: user.last_name
    league_id : league.league_id,
    league_name : league.league_name,
    country_name : league.country_name
  });

  return response;
}

function getDeletedLeague(league_id) {
  const response = axios.delete(`${apiURL}/leagues/${league_id}`);
  console.log(response)
  return response;
}


//////////////////////////////////
//manager
//////////////////////////////////
function getManagers() {
  const response = axios.get(`${apiURL}/managers`);
  console.log(response)
  return response;
}

function getCreatedManager({ manager_name,
  manager_nationality}) {
  const response = axios.post(`${apiURL}/managers`, {
    manager_name,
    manager_nationality
  });

  return response;
}

function getUpdatedManager(id, manager) {
  const response = axios.put(`${apiURL}/managers/${id}`, {
    // avatar: user.avatar,
    // id: id,
    // email: user.email,
    // first_name: user.first_name,
    // last_name: user.last_name
    manager_id : manager.manager_id,
    manager_name : manager.manager_name,
    manager_nationality : manager.manager_nationality
  });

  return response;
}

function getDeletedManager(manager_id) {
  const response = axios.delete(`${apiURL}/managers/${manager_id}`);
  console.log(response)
  return response;
}

//////////////////////////////////
//club
//////////////////////////////////
function getClubs() {
  const response = axios.get(`${apiURL}/clubs`);
  console.log(response)
  return response;
}

function getCreatedClub({ club_name,
  league_id,
  manager_id,
  matches_played,
  wins,
  draws,
  losses,
  goals_for,
  goals_against,
  points,
  xG,
  xGA,
  xGD,
  xGD_per_90,
  capacity}) {
  const response = axios.post(`${apiURL}/clubs`, {
  club_name,
  league_id,
  manager_id,
  matches_played,
  wins,
  draws,
  losses,
  goals_for,
  goals_against,
  points,
  xG,
  xGA,
  xGD,
  xGD_per_90,
  capacity
  });

  return response;
}

function getUpdatedClub(club_name, club) {
  console.log('gi')
  console.log(club_name)
  console.log(club)
  const response = axios.put(`${apiURL}/clubs/${club_name}`, {
        club_name :  club.club_name,
        league_id :  club.league_id,
        manager_id :  club.manager_id,
        matches_played : club.matches_played,
        wins :  club.wins,
        draws: club.draws,
        losses: club.losses,
        goals_for : club.goals_for,
        goals_against : club.goals_against,
        points : club.points, 
        xG : club.xG,
        xGA : club.xGA,
        xGD : club.xGD,
        xGD_per_90: club.xGD_per_90,
        // capacity : club.capacity
  });

  return response;
}

function getDeletedClub(club_name) {
  const response = axios.delete(`${apiURL}/clubs/${club_name}`);
  console.log(response)
  return response;
}

///////////////////////////////////////////////
function getClubsInLeague(league_id) {
  const response = axios.get(`${apiURL}/${league_id}/clubs`);
  console.log("clubs in league")
  console.log(response)
  console.log("clubs in league end")
  return response;
}

function getPlayersInClub(clubName) {
  const response = axios.get(`${apiURL}/${clubName}/players`);
  console.log("players in club")
  console.log(response)
  console.log("players in club end")
  return response;
}


function getPlayersInCountry(countryName) {
  const response = axios.get(`${apiURL}/c/${countryName}/players`);
  console.log("players in countryName")
  console.log(response)
  console.log("players in countryName end")
  return response;
}


////
////goalkeeper


function getGoalkeepers() {
  const response = axios.get(`${apiURL}/goalkeepers`);
  console.log(response)
  return response;
}

function getCreatedGoalkeeper({ 
  player_name,
  club_name,
  player_nationality,
  matches_played,
  age,
  minutes_played,
  goals_against,
  shots_on_target_against,
  saves,
  clean_sheets,
  pks_saved
}) {
  const response = axios.post(`${apiURL}/goalkeepers`, {
    player_name,
    club_name,
    player_nationality,
    matches_played,
    age,
    minutes_played,
    goals_against,
    shots_on_target_against,
    saves,
    clean_sheets,
    pks_saved
  });

  return response;
}

function getUpdatedGoalkeeper(id, goalkeeper) {
  const response = axios.put(`${apiURL}/goalkeepers/${id}`, {
    // avatar: user.avatar,
    // id: id,
    // email: user.email,
    // first_name: user.first_name,
    // last_name: user.last_name
    player_name : goalkeeper.player_name,
    club_name : goalkeeper.club_name,
    player_nationality : goalkeeper.player_nationality,
    matches_played : goalkeeper.matches_played,
    age : goalkeeper.age,
    minutes_played : goalkeeper.minutes_played,
    goals_against : goalkeeper.goals_against,
    shots_on_target_against : goalkeeper.shots_on_target_against,
    saves : goalkeeper.saves,
    clean_sheets : goalkeeper.clean_sheets,
    pks_saved : goalkeeper.pks_saved
  });

  return response;
}

function getDeletedGoalkeeper(goalkeeper_id) {
  const response = axios.delete(`${apiURL}/goalkeepers/${goalkeeper_id}`);
  console.log(response)
  return response;
}

////
////countries


function getCountries() {
  const response = axios.get(`${apiURL}/countries`);
  console.log(response)
  return response;
}

function getCreatedCountry({ 
  country_name
}) {
  const response = axios.post(`${apiURL}/countries`, {
    country_name
  });

  return response;
}

function getUpdatedCountry(id, country) {
  const response = axios.put(`${apiURL}/countries/${id}`, {
    // avatar: user.avatar,
    // id: id,
    // email: user.email,
    // first_name: user.first_name,
    // last_name: user.last_name
    country_name : country.country_name
  });

  return response;
}

function getDeletedCountry(country_name) {
  const response = axios.delete(`${apiURL}/countries/${country_name}`);
  console.log(response)
  return response;
}

////
////stadiums


function getStadiums() {
  const response = axios.get(`${apiURL}/stadiums`);
  console.log(response)
  return response;
}

function getCreatedStadium({ 
  stadium_name, club_name, capacity
}) {
  const response = axios.post(`${apiURL}/stadiums`, {
    stadium_name, club_name, capacity
  });

  return response;
}

function getUpdatedStadium(stadium_id, stadium) {
  const response = axios.put(`${apiURL}/stadiums/${stadium_id}`, {
    // avatar: user.avatar,
    // id: id,
    // email: user.email,
    // first_name: user.first_name,
    // last_name: user.last_name
    stadium_id: stadium.stadium_id,
    stadium_name : stadium.stadium_name,
    club_name : stadium.club_name,
    capacity : stadium.capacity

  });

  return response;
}

function getDeletedStadium(stadium_id) {
  const response = axios.delete(`${apiURL}/stadiums/${stadium_id}`);
  console.log(response)
  return response;
}
export { getUsers, getCreatedUser, getUpdatedUser, getDeletedUser,
  getLeagues, getCreatedLeague, getUpdatedLeague, getDeletedLeague ,
  getManagers, getCreatedManager, getUpdatedManager, getDeletedManager, 
  getClubs, getCreatedClub, getUpdatedClub, getDeletedClub,
  getClubsInLeague, getPlayersInClub,getPlayersInCountry,
  getGoalkeepers, getCreatedGoalkeeper, getUpdatedGoalkeeper, getDeletedGoalkeeper,
  getCountries, getCreatedCountry, getUpdatedCountry, getDeletedCountry,
  getStadiums, getCreatedStadium, getUpdatedStadium, getDeletedStadium};