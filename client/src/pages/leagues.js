import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getLeagues, getCreatedLeague, getUpdatedLeague, getDeletedLeague
} from "../app/api";

// Styles
import "../app.scss";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import LeagueTable from "../components/LeagueTable";
import CreateLeague from "../components/CreateLeague";
import UpdateLeague from "../components/UpdateLeague";
import DeleteLeague from "../components/DeleteLeague";
import Modal from "../components/Modal";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import MySwal from "../index";

function Leagues() {
  const dispatch = useDispatch();
  const leagues = useSelector(state => state.leagues);
  const [loading, setLoading] = useState(false);

  const [currentLeague, setCurrentLeague] = useState({
    // id: null,
    // avatar: null,
    league_id : null,
    league_name : "",
    country_name : "",
    num_of_clubs : null,
    num_of_players: null
    // player_nationality : "",
    // position : "",
    // matches_played : null,
    // age : null,
    // minutes_played : null,
    // goals : null,
    // assists : null,
    // xG : null,
    // xA : null
    // first_name: "",
    // last_name: "",
    // email: ""

  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedLeagues, setSavedLeagues] = useState(leagues);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const leaguesLastIndex = currentPage * pageSize;
  const leaguesFirstIndex = leaguesLastIndex - pageSize;

  console.log(leagues)
  const currentLeagues = leagues.slice(leaguesFirstIndex, leaguesLastIndex);

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

      const results = savedLeagues.filter(league =>
        Object.keys(league).some(key =>
          league[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_LEAGUES", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_LEAGUES", data: savedLeagues });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "league_name":
        const league_nameSort = [...savedLeagues].sort((a, b) => {
          return sorted
            ? a.league_name.localeCompare(b.league_name, "tr")
            : b.league_name.localeCompare(a.league_name, "tr");
        });
        dispatch({ type: "SET_LEAGUES", data: league_nameSort });
        return;
      case "country_name":
        const country_nameSort = [...savedLeagues].sort((a, b) => {
          return sorted
            ? a.country_name.localeCompare(b.country_name, "tr")
            : b.country_name.localeCompare(a.country_name, "tr");
        });
        dispatch({ type: "SET_LEAGUES", data: country_nameSort });
        return;
      case "num_of_clubs":
          const num_of_clubsSort = [...savedLeagues].sort((a, b) => {
            return sorted
              ? a.num_of_clubs - b.num_of_clubs
              : b.num_of_clubs - a.num_of_clubs;
          });
          dispatch({ type: "SET_LEAGUES", data: num_of_clubsSort });
          return;

        case "num_of_players":
            const num_of_playersSort = [...savedLeagues].sort((a, b) => {
              return sorted
                ? a.num_of_players - b.num_of_players
                : b.num_of_players - a.num_of_players;
            });
            dispatch({ type: "SET_LEAGUES", data: num_of_playersSort });
            return;
      default:
        break;
    }
  };

  // Create League
  const createLeague = async league => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedLeague(league).then(res => {
        console.log(league)
        console.log("FFF")
        const result = res.data;
        console.log(res)
        console.log(res.data)
        console.log("GGG")

        MySwal.fire({
          icon: "success",
          title: "League created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_LEAGUE", data: result });
          setSavedLeagues([...leagues, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create league."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update League
  const updateRow = league => {
    setModal("Update League");

    setCurrentLeague({
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email

      league_id : league.league_id,
      league_name : league.league_name,
      country_name : league.country_name
    });
  };

  const updateLeague = async (league_id, updatedLeague) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedLeague(league_id, updatedLeague).then(res => {
        const result = res.data;
        console.log(res)
        console.log(updatedLeague)
        // console.log(err)
        MySwal.fire({
          icon: "success",
          title: "League updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_LEAGUES",
            data: leagues.map(league =>
                league.league_id === league_id ? Object.assign(league, result) : league
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update league."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete league
  const deleteRow = league => {
    setModal("Delete League");

    setCurrentLeague({
        league_id : league.league_id,
        league_name : league.league_name,
      country_name : league.country_name
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email
    });
  };

  const deleteLeague = async league_id => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedLeague(league_id).then(() => {
        MySwal.fire({
          icon: "success",
          title: "league deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_LEAGUES",
            data: leagues.filter(league => league.league_id !== league_id)
          });
          setSavedLeagues(savedLeagues.filter(league => league.league_id !== league_id));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete league."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchLeagues = async () => {
    setLoading(true);

    try {
      await getLeagues().then(({ data }) => {
        console.log("HI")
        console.log(data)
        console.log("HH")
        setSavedLeagues(data);
        dispatch({ type: "SET_LEAGUES", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch leagues."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchLeagues();
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
                  onClick={() => setModal("Create League")}
                >
                  Create New Leagues
                </button>
              </div>
              <LeagueTable
                leagues={currentLeagues}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={leagues.length}
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
          {activeModal.name === "Create League" && (
            <CreateLeague
              createLeague={createLeague}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update League" && (
            <UpdateLeague
              currentLeague={currentLeague}
              updateLeague={updateLeague}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete League" && (
            <DeleteLeague
            currentLeague={currentLeague}
            deleteLeague={deleteLeague}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default Leagues;
