const initialState = {
  users: [],
  leagues: [],
  managers: [],
  clubs: [],
  goalkeepers: [],
  countries: [],
  stadiums: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":
      console.log(action)
      console.log("SET_USERS")
      console.log(action.data)

      console.log(action.data)
      return { ...state, users: action.data };
    case "CREATE_USER":
      return { ...state, users: [...state.users, action.data] };

    case "SET_COUNTRIES":
      console.log(action)
      console.log("SET_USERS")
      console.log(action.data)

      console.log(action.data)
      return { ...state, countries: action.data };
    case "CREATE_COUNTRY":
      return { ...state, countries: [...state.countries, action.data] };

    case "SET_STADIUMS":
      console.log(action)
      console.log("SET_USERS")
      console.log(action.data)

      console.log(action.data)
      return { ...state, stadiums: action.data };
    case "CREATE_STADIUM":
      return { ...state, stadiums: [...state.stadiums, action.data] };

    case "SET_GOALKEEPERS":
      console.log(action)
      console.log("SET_GOALKEEPERS")
      console.log(action.data)

      console.log(action.data)
      return { ...state, goalkeepers: action.data };
    case "CREATE_GOALKEEPER":
      return { ...state, goalkeepers: [...state.goalkeepers, action.data] };
    case "SET_LEAGUES":
      console.log("SET_LEAGUES")
      console.log(action.data)
      return { ...state, leagues: action.data };
    case "CREATE_LEAGUE":
      console.log("CREATE_LEAGUE")
      return { ...state, leagues: [...state.leagues, action.data] };
    case "SET_MANAGERS":
      console.log("SET_MANAGERS")
      console.log(action.data)
      return { ...state, managers: action.data };
    case "CREATE_MANAGER":
      console.log("CREATE_MANAGER")
      return { ...state, managers: [...state.managers, action.data] };

    case "SET_CLUBS":
      console.log("SET_CLUBS")
      console.log(action)
      console.log(action.data)
      console.log(action.data)
      return { ...state, clubs: action.data };
    case "CREATE_CLUB":
      console.log("CREATE_CLUB")
      return { ...state, clubs: [...state.clubs, action.data] };
    default:
      console.log("default")
      console.log(state)
      return state;
  }
};

export default rootReducer;
