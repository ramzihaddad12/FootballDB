import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsers,
  getCreatedUser,
  getUpdatedUser,
  getDeletedUser,
  getPlayersInClub,
  getGoalkeepers, getCreatedGoalkeeper, getUpdatedGoalkeeper, getDeletedGoalkeeper
} from "../app/api";

// Styles
import "../app.scss";
import { useParams } from 'react-router-dom';

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import GKTable from "../components/GKTable";
import CreateGoalkeeper from "../components/CreateGoalkeeper";
import UpdateGoalkeeper  from "../components/UpdateGoalkeeper";
import DeleteGoalkeeper  from "../components/DeleteGoalkeeper";
import Modal from "../components/Modal";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import MySwal from "../index";

function Goalkeepers() {
  const dispatch = useDispatch();
  const goalkeepers = useSelector(state => state.goalkeepers);
  const [loading, setLoading] = useState(false);
  // const { clubName } = useParams();
  // const club_name = clubName;
  // console.log(clubName);
  // console.log(club_name);

  const [currentGoalkeeper, setCurrentGoalkeeper] = useState({
    // id: null,
    // avatar: null,
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
    pks_saved : null
    // first_name: "",
    // last_name: "",
    // email: ""

  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedGoalkeepers, setSavedGoalkeepers] = useState(goalkeepers);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const goalkeepersLastIndex = currentPage * pageSize;
  const goalkeepersFirstIndex = goalkeepersLastIndex - pageSize;

  console.log(goalkeepers)
  const currentGoalkeepers = goalkeepers.slice(goalkeepersFirstIndex, goalkeepersLastIndex);

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

      const results = savedGoalkeepers.filter(goalkeeper =>
        Object.keys(goalkeeper).some(key =>
          goalkeeper[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_GOALKEEPERS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_GOALKEEPERS", data: savedGoalkeepers });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "goalkeeper_name":
        const goalkeeper_nameSort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
            ? a.goalkeeper_name.localeCompare(b.goalkeeper_name, "tr")
            : b.goalkeeper_name.localeCompare(a.goalkeeper_name, "tr");
        });
        dispatch({ type: "SET_GOALKEEPERS", data: goalkeeper_nameSort });
        return;
      case "club_name":
        const club_nameSort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
            ? a.club_name.localeCompare(b.club_name, "tr")
            : b.club_name.localeCompare(a.club_name, "tr");
        });
        dispatch({ type: "SET_GOALKEEPERS", data: club_nameSort });
        return;
      case "player_nationality":
        const player_nationalitySort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
            ? a.player_nationality.localeCompare(b.player_nationality, "tr")
            : b.player_nationality.localeCompare(a.player_nationality, "tr");
        });
        dispatch({ type: "SET_GOALKEEPERS", data: player_nationalitySort });
        return;

      case "position":
        const positionSort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
            ? a.position.localeCompare(b.position, "tr")
            : b.position.localeCompare(a.position, "tr");
        });
        dispatch({ type: "SET_GOALKEEPERS", data: positionSort });
        return;

      case "matches_played":
        const matches_playedSort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
            ? a.matches_played - b.matches_played
            : b.matches_played - a.matches_played;
        });
        dispatch({ type: "SET_GOALKEEPERS", data: matches_playedSort });
        return;

      case "age":
        const ageSort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
          ? a.age.localeCompare(b.age, "tr")
          : b.age.localeCompare(a.age, "tr");
        });
        dispatch({ type: "SET_GOALKEEPERS", data: ageSort });
        return;

      case "minutes_played":
        const minutes_playedSort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
            ? a.minutes_played - b.minutes_played
            : b.minutes_played - a.minutes_played;
        });
        dispatch({ type: "SET_GOALKEEPERS", data: minutes_playedSort });
        return;

      case "goals_against":
        const goals_againstSort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
            ? a.goals_against - b.goals_against
            : b.goals_against - a.goals_against;
        });
        dispatch({ type: "SET_GOALKEEPERS", data: goals_againstSort });
        return;

      case "shots_on_target_against":
        const shots_on_target_againstSort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
            ? a.shots_on_target_against - b.shots_on_target_against
            : b.shots_on_target_against - a.shots_on_target_against;
        });
        dispatch({ type: "SET_GOALKEEPERS", data: shots_on_target_againstSort });
        return;

      case "saves":
        const savesSort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
            ? a.saves - b.saves
            : b.savesxG - a.saves;
        });
        dispatch({ type: "SET_GOALKEEPERS", data: savesSort });
        return;

      case "clean_sheets":
        const clean_sheetsSort = [...savedGoalkeepers].sort((a, b) => {
          return sorted
            ? a.clean_sheets - b.clean_sheets
            : b.clean_sheets - a.clean_sheets;
        });
        dispatch({ type: "SET_GOALKEEPERS", data: clean_sheetsSort });
        return;

      case "pks_saved":
        const pks_savedSort = [...savedGoalkeepers].sort((a, b) => {
            return sorted
            ? a.pks_saved - b.pks_saved
            : b.pks_saved - a.pks_saved;
        });
        dispatch({ type: "SET_GOALKEEPERS", data: pks_savedSort });
        return;

      default:
        break;
    }
  };

  // Create goalkeeper
  const createGoalkeeper = async goalkeeper => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedGoalkeeper(goalkeeper).then(res => {
        console.log("FFF")
        const result = res.data;
        console.log(res)
        console.log(res.data)
        console.log("GGG")

        MySwal.fire({
          icon: "success",
          title: "Goalkeeper created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_GOALKEEPER", data: result });
          setSavedGoalkeepers([...goalkeepers, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create goalkeeper."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update goalkeeper
  const updateRow = goalkeeper => {
    setModal("Update Goalkeeper");

    setCurrentGoalkeeper({
      // id: user.id,
      // avatar: goalkeeper.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email

      goalkeeper_id : goalkeeper.goalkeeper_id,
      goalkeeper_name : goalkeeper.goalkeeper_name,
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
  };

  const updateGoalkeeper = async (goalkeeper_id, updatedGoalkeeper) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedGoalkeeper(goalkeeper_id, updatedGoalkeeper).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Goalkeeper updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_GOALKEEPERS",
            data: goalkeepers.map(goalkeeper =>
              goalkeeper.goalkeeper_id === goalkeeper_id ? Object.assign(goalkeeper, result) : goalkeeper
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update goalkeeper."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete goalkeeper
  const deleteRow = goalkeeper => {
    setModal("Delete Goalkeeper");

    setCurrentGoalkeeper({
        goalkeeper_id : goalkeeper.goalkeeper_id,
        goalkeeper_name : goalkeeper.goalkeeper_name,
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
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email
    });
  };

  const deleteGoalkeeper = async goalkeeper_id => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedGoalkeeper(goalkeeper_id).then(() => {
        MySwal.fire({
          icon: "success",
          title: "Goalkeeper deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_GOALKEEPERS",
            data: goalkeepers.filter(goalkeeper => goalkeeper.goalkeeper_id !== goalkeeper_id)
          });
          setSavedGoalkeepers(savedGoalkeepers.filter(goalkeeper => goalkeeper.goalkeeper_id !== goalkeeper_id));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete goalkeeper."
      });
    } finally {
      setLoading(false);
    }
  };
/////////////////////////////
//////////////////////////////
// const playersInClub = async () => {
//   setActiveModal(false);

//   setLoading(true);
//   if (clubName) {
//     try {
//       await getPlayersInClub(club_name).then(({ data }) => {
//         console.log("fetching players in club");
//         console.log("getting players in club")
//         console.log(data);
//         console.log("HH")
//         setSavedGoalkeepers(data);
//         dispatch({ type: "SET_GOALKEEPERS", data: data });
//       });
//     } catch (err) {
//       MySwal.fire({
//         icon: "error",
//         title: "Failed to fetch players."
//       });
//     } finally {
//       setTimeout(() => {
//         setLoading(false);
//       }, 500);
//     }
//   }
//   // } 
// };


//////////////////////////////////
  // Fetch goalkeepers
  const fetchGoalkeepers = async () => {
    // setLoading(true);
    // if (clubName === undefined) {

    
    try {

      await getGoalkeepers().then(({ data }) => {
        console.log("fetching all players");

        console.log("HI")
        console.log(data)
        console.log("HH")
        setSavedGoalkeepers(data);
        dispatch({ type: "SET_GOALKEEPERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch goalkeepers."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
   }
  // }
  };

  useEffect(() => {
    fetchGoalkeepers();
    // playersInClub();
    // Promise.all([playersInClub, fetchUsers]);;
  }, []);

  // useEffect(() => {
  //   // fetchUsers();
  //   playersInClub();
  //   // Promise.all([playersInClub, fetchUsers]);;
  // }, []);

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
                  onClick={() => setModal("Create Goalkeeper")}
                >
                  Create New Goalkeeper
                </button>
              </div>
              <GKTable
                goalkeepers={currentGoalkeepers}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={goalkeepers.length}
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
          {activeModal.name === "Create Goalkeeper" && (
            <CreateGoalkeeper
              createGoalkeeper={createGoalkeeper}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update Goalkeeper" && (
            <UpdateGoalkeeper
              currentGoalkeeper={currentGoalkeeper}
              updateGoalkeeper={updateGoalkeeper}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete Goalkeeper" && (
            <DeleteGoalkeeper
              currentGoalkeeper={currentGoalkeeper}
              deleteGoalkeeper={deleteGoalkeeper}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default Goalkeepers;
