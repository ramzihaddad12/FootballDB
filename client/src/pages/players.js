import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  getCreatedUser,
  getUpdatedUser,
  getDeletedUser,
  getPlayersInClub,
  getPlayersInCountry,
  getLeagues, getCreatedLeague, getUpdatedLeague, getDeletedLeague
} from "../app/api";

// Styles
import "../app.scss";
import { useParams } from 'react-router-dom';

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import DataTable from "../components/DataTable";
import CreateUser from "../components/CreateUser";
import UpdateUser from "../components/UpdateUser";
import DeleteUser from "../components/DeleteUser";
import Modal from "../components/Modal";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import MySwal from "../index";

function Players() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [loading, setLoading] = useState(false);
  const { clubName } = useParams();
  const { countryName } = useParams();

  const club_name = clubName;
  const country_name = countryName;

  console.log(clubName);
  console.log(club_name);

  const [currentUser, setCurrentUser] = useState({
    // id: null,
    // avatar: null,
    player_id : null,
    player_name : "",
    club_name : "",
    player_nationality : "",
    position : "",
    matches_played : null,
    age : null,
    minutes_played : null,
    goals : null,
    assists : null,
    xG : null,
    xA : null
    // first_name: "",
    // last_name: "",
    // email: ""

  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedUsers, setSavedUsers] = useState(users);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const usersLastIndex = currentPage * pageSize;
  const usersFirstIndex = usersLastIndex - pageSize;

  console.log(users)
  const currentUsers = users.slice(usersFirstIndex, usersLastIndex);

  // Setting up Modal
  const setModal = modal => {
    search("");
    setActiveModal({ name: modal, active: true });
  };

  // Pagination
  const paginate = page => {
    setCurrentPage(page);
  };

  // Search
  const search = term => {
    if (term.length > 2) {
      setCurrentPage(1);

      const results = savedUsers.filter(user =>
        Object.keys(user).some(key =>
          user[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_USERS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_USERS", data: savedUsers });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "player_name":
        const player_nameSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.player_name.localeCompare(b.player_name, "tr")
            : b.player_name.localeCompare(a.player_name, "tr");
        });
        dispatch({ type: "SET_USERS", data: player_nameSort });
        return;
      case "club_name":
        const club_nameSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.club_name.localeCompare(b.club_name, "tr")
            : b.club_name.localeCompare(a.club_name, "tr");
        });
        dispatch({ type: "SET_USERS", data: club_nameSort });
        return;
      case "player_nationality":
        const player_nationalitySort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.player_nationality.localeCompare(b.player_nationality, "tr")
            : b.player_nationality.localeCompare(a.player_nationality, "tr");
        });
        dispatch({ type: "SET_USERS", data: player_nationalitySort });
        return;

      case "position":
        const positionSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.position.localeCompare(b.position, "tr")
            : b.position.localeCompare(a.position, "tr");
        });
        dispatch({ type: "SET_USERS", data: positionSort });
        return;

      case "matches_played":
        const matches_playedSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.matches_played - b.matches_played
            : b.matches_played - a.matches_played;
        });
        dispatch({ type: "SET_USERS", data: matches_playedSort });
        return;

      case "age":
        const ageSort = [...savedUsers].sort((a, b) => {
          return sorted
          ? a.age.localeCompare(b.age, "tr")
          : b.age.localeCompare(a.age, "tr");
        });
        dispatch({ type: "SET_USERS", data: ageSort });
        return;

      case "minutes_played":
        const minutes_playedSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.minutes_played - b.minutes_played
            : b.minutes_played - a.minutes_played;
        });
        dispatch({ type: "SET_USERS", data: minutes_playedSort });
        return;

      case "goals":
        const goalsSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.goals - b.goals
            : b.goals - a.goals;
        });
        dispatch({ type: "SET_USERS", data: goalsSort });
        return;

      case "assists":
        const assistsSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.assists - b.assists
            : b.assists - a.assists;
        });
        dispatch({ type: "SET_USERS", data: assistsSort });
        return;

      case "xG":
        const xGSort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.xG - b.xG
            : b.xG - a.xG;
        });
        dispatch({ type: "SET_USERS", data: xGSort });
        return;

      case "xA":
        const xASort = [...savedUsers].sort((a, b) => {
          return sorted
            ? a.xA - b.xA
            : b.xA - a.xA;
        });
        dispatch({ type: "SET_USERS", data: xASort });
        return;

      default:
        break;
    }
  };

  // Create User
  const createUser = async user => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedUser(user).then(res => {
        console.log("FFF")
        const result = res.data;
        console.log(res)
        console.log(res.data)
        console.log("GGG")

        MySwal.fire({
          icon: "success",
          title: "User created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_USER", data: result });
          setSavedUsers([...users, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create user."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update User
  const updateRow = user => {
    setModal("Update User");

    setCurrentUser({
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email

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
  };

  const updateUser = async (player_id, updatedUser) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedUser(player_id, updatedUser).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "User updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.map(user =>
              user.player_id === player_id ? Object.assign(user, result) : user
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update user."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete User
  const deleteRow = user => {
    setModal("Delete User");

    setCurrentUser({
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
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email
    });
  };

  const deleteUser = async player_id => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedUser(player_id).then(() => {
        MySwal.fire({
          icon: "success",
          title: "User deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_USERS",
            data: users.filter(user => user.player_id !== player_id)
          });
          setSavedUsers(savedUsers.filter(user => user.player_id !== player_id));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete user."
      });
    } finally {
      setLoading(false);
    }
  };
/////////////////////////////
//////////////////////////////
const playersInClub = async () => {
  setActiveModal(false);

  setLoading(true);
  if (clubName) {
    try {
      await getPlayersInClub(club_name).then(({ data }) => {
        console.log("fetching players in club");
        console.log("getting players in club")
        console.log(data);
        console.log("HH")
        setSavedUsers(data);
        dispatch({ type: "SET_USERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch players."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }
  // } 
};

const playersInCountry = async () => {
  setActiveModal(false);

  setLoading(true);
  if (country_name) {
    try {
      await getPlayersInCountry(country_name).then(({ data }) => {

        console.log(data);
        console.log("HH")
        setSavedUsers(data);
        dispatch({ type: "SET_USERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch players."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }
  // } 
};


//////////////////////////////////
  // Fetch Users
  const fetchUsers = async () => {
    // setLoading(true);
    if (clubName === undefined) {

    
    try {

      await getUsers().then(({ data }) => {
        console.log("fetching all players");

        console.log("HI")
        console.log(data)
        console.log("HH")
        setSavedUsers(data);
        dispatch({ type: "SET_USERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch users."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
   }
  }
  };

  useEffect(() => {
    fetchUsers();
    // playersInClub();
    // Promise.all([playersInClub, fetchUsers]);;
  }, []);

  useEffect(() => {
    // fetchUsers();
    playersInClub();
    // Promise.all([playersInClub, fetchUsers]);;
  }, []);

  useEffect(() => {
    // fetchUsers();
    playersInCountry();
    // Promise.all([playersInClub, fetchUsers]);;
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="content">
        <div className="container">
          {loading ? (
            <Loader />
          ) : (
            <div className="content-wrapper">
              <div className="toolbar">
                <Search search={search} resetSearch={search} />
                <button
                  className="primary-btn"
                  onClick={() => setModal("Create User")}
                >
                  Create New Player
                </button>
              </div>
              <DataTable
                users={currentUsers}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={users.length}
                currentPage={currentPage}
                pageSize={pageSize}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </main>
      {activeModal.active && (
        <Modal activeModal={activeModal}>
          {activeModal.name === "Create User" && (
            <CreateUser
              createUser={createUser}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update User" && (
            <UpdateUser
              currentUser={currentUser}
              updateUser={updateUser}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete User" && (
            <DeleteUser
              currentUser={currentUser}
              deleteUser={deleteUser}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default Players;
