import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getClubs,
  getCreatedClub,
  getUpdatedClub,
  getDeletedClub,
  getClubsInLeague,
  getLeagues, getCreatedLeague, getUpdatedLeague, getDeletedLeague
} from "../app/api";

// Styles
import "../app.scss";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import ClubTable from "../components/ClubTable";
import CreateClub from "../components/CreateClub";
import UpdateClub from "../components/UpdateClub";
import DeleteClub from "../components/DeleteClub";
import Modal from "../components/Modal";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import MySwal from "../index";
import { useParams } from 'react-router-dom';


function Clubs() {
  const dispatch = useDispatch();
  const { inputLeagueId } = useParams();
  const league_id = parseInt(inputLeagueId);
  console.log(league_id);
  const clubs = useSelector(state => state.clubs);
  const [loading, setLoading] = useState(false);
  // const league_id = useRef(null);
  const [currentClub, setCurrentClub] = useState({
    // id: null,
    // avatar: null,
    club_name :  "",
    league_id :  0,
    manager_id :  0,
    manager_name :  "",

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
    capacity : 0,
    average_age : 0
    // first_name: "",
    // last_name: "",
    // email: ""

  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedClubs, setSavedClubs] = useState(clubs);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const clubsLastIndex = currentPage * pageSize;
  const clubsFirstIndex = clubsLastIndex - pageSize;

  console.log(clubs)
  const currentClubs = clubs.slice(clubsFirstIndex, clubsLastIndex);

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

      const results = savedClubs.filter(club =>
        Object.keys(club).some(key =>
          club[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_CLUBS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_CLUBS", data: savedClubs });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "club_name":
        const club_nameSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.club_name.localeCompare(b.club_name, "tr")
            : b.club_name.localeCompare(a.club_name, "tr");
        });
        dispatch({ type: "SET_CLUBS", data: club_nameSort });
        return;

        case "league_id":
            const league_idSort = [...savedClubs].sort((a, b) => {
                return sorted
                ? a.league_id - b.league_id
                : b.league_id - a.league_id;
            });
            dispatch({ type: "SET_CLUBS", data: league_idSort });
            return;
        // case "manager_id":
        //     const manager_idSort = [...savedClubs].sort((a, b) => {
        //         return sorted
        //         ? a.manager_id - b.manager_id
        //         : b.manager_id - a.manager_id;
        //     });
        //     dispatch({ type: "SET_CLUBS", data: manager_idSort });
        //     return;

        case "manager_name":
        const manager_nameSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.manager_name.localeCompare(b.manager_name, "tr")
            : b.manager_name.localeCompare(a.manager_name, "tr");
        });
        dispatch({ type: "SET_CLUBS", data: manager_nameSort });
        return;

        case "stadium_name":
        const stadium_nameSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.stadium_name.localeCompare(b.stadium_name, "tr")
            : b.stadium_name.localeCompare(a.stadium_name, "tr");
        });
        dispatch({ type: "SET_CLUBS", data: stadium_nameSort });
        return;
            
      case "matches_played":
        const matches_playedSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.matches_played - b.matches_played
            : b.matches_played - a.matches_played;
        });
        dispatch({ type: "SET_CLUBS", data: matches_playedSort });
        return;

      case "goals_for":
        const goals_forSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.goals_for - b.goals_for
            : b.goals_for - a.goals_for;
        });
        dispatch({ type: "SET_CLUBS", data: goals_forSort });
        return;

      case "goals_against":
        const goals_againstSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.goals_against - b.goals_against
            : b.goals_against - a.goals_against;
        });
        dispatch({ type: "SET_CLUBS", data: goals_againstSort });
        return;

        case "wins":
        const winsSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.wins - b.wins
            : b.wins - a.wins;
        });
        dispatch({ type: "SET_CLUBS", data: winsSort });
        return;

        case "draws":
        const drawsSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.draws - b.draws
            : b.draws - a.draws;
        });
        dispatch({ type: "SET_CLUBS", data: drawsSort });
        return;

        case "losses":
        const lossesSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.losses - b.losses
            : b.losses - a.losses;
        });
        dispatch({ type: "SET_CLUBS", data: lossesSort });
        return;

        case "points":
        const pointsSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.points - b.points
            : b.points - a.points;
        });
        dispatch({ type: "SET_CLUBS", data: pointsSort });
        return;

      case "xG":
        const xGSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.xG - b.xG
            : b.xG - a.xG;
        });
        dispatch({ type: "SET_CLUBS", data: xGSort });
        return;

      case "xGA":
        const xGASort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.xGA - b.xGA
            : b.xGA - a.xGA;
        });
        dispatch({ type: "SET_CLUBS", data: xGASort });
        return;

        case "xGD":
        const xGDSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.xGD - b.xGD
            : b.xGD - a.xGD;
        });
        dispatch({ type: "SET_CLUBS", data: xGDSort });
        return;

        case "xGD_per_90":
        const xGD_per_90Sort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.xGD_per_90 - b.xGD_per_90
            : b.xGD_per_90 - a.xGD_per_90;
        });
        dispatch({ type: "SET_CLUBS", data: xGD_per_90Sort });
        return;

        case "capacity":
        const capacitySort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.capacity - b.capacity
            : b.capacity - a.capacity;
        });
        dispatch({ type: "SET_CLUBS", data: capacitySort });
        return;

        

        case "average_age":
        const average_ageSort = [...savedClubs].sort((a, b) => {
          return sorted
            ? a.average_age - b.average_age
            : b.average_age - a.average_age;
        });
        dispatch({ type: "SET_CLUBS", data: average_ageSort });
        return;

      default:
        break;
    }
  };

  // Create club
  const createClub = async club => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedClub(club).then(res => {
        console.log("FFF")
        const result = res.data;
        console.log(res)
        console.log(res.data)
        console.log("GGG")

        MySwal.fire({
          icon: "success",
          title: "club created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_CLUB", data: result });
          setSavedClubs([...clubs, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create club."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update club
  const updateRow = club => {
    setModal("Update Club");

    setCurrentClub({
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
        capacity : club.capacity,
        stadium_name: club.stadium_name
    });
  };

  const updateClub = async (club_name, updateClub) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedClub(club_name, updateClub).then(res => {
        console.log("HI")
        console.log(club_name)
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Club updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_CLUBS",
            data: clubs.map(club =>
              club.club_name === club_name ? Object.assign(club, result) : club
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update club."
      });
    } finally {
      setLoading(false);
    }
  };

  
  // Delete club
  const deleteRow = club => {
    setModal("Delete Club");

    setCurrentClub({
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
        capacity : club.capacity,
        stadium_name: club.stadium_name
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email
    });
  };

  const deleteClub = async club_name => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedClub(club_name).then(() => {
        MySwal.fire({
          icon: "success",
          title: "Club deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_CLUBS",
            data: clubs.filter(club => club.club_name !== club_name)
          });
          setSavedClubs(savedClubs.filter(club => club.club_name !== club_name));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete club."
      });
    } finally {
      setLoading(false);
    }
  };

  //////////////////////////////
  const clubsInLeague = async () => {
    setActiveModal(false);
    // setLoading(true);
    // const id = get_id.current.value;
    // if (league_id) {
      setLoading(true);
  if (league_id) {
    try {
      await getClubsInLeague(league_id).then(({ data }) => {
        console.log("HI")
        console.log(data)
        console.log("HH")
        setSavedClubs(data);
        dispatch({ type: "SET_CLUBS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch Clubs."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    } 
  };
/////////////////////////

  // Fetch Clubs
  const fetchClubs = async () => {
    setLoading(true);

    try {
      await getClubs().then(({ data }) => {
        console.log("HI")
        console.log(data)
        console.log("HH")
        setSavedClubs(data);
        dispatch({ type: "SET_CLUBS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch Clubs."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchClubs();
    clubsInLeague();
    Promise.all([fetchClubs,clubsInLeague])

  }, []);

  
  // useEffect(() => {
  //   setLoading(true)
  //   const fetchMethod1 = () =>{setLoading(true);

  //     try {
  //        getClubs().then(({ data }) => {
  //         console.log("HI")
  //         console.log(data)
  //         console.log("HH")
  //         setSavedClubs(data);
  //         dispatch({ type: "SET_CLUBS", data: data });
  //       });
  //     } catch (err) {
  //       MySwal.fire({
  //         icon: "error",
  //         title: "Failed to fetch Clubs."
  //       });
  //     } finally {
  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 500);
  //     }}
  //   const fetchMethod2 = (league_id) =>{
  //     setLoading(true);

  //   try {
  //      getClubsInLeague(league_id).then(({ data }) => {
  //       console.log("HI")
  //       console.log(data)
  //       console.log("HH")
  //       setSavedClubs(data);
  //       dispatch({ type: "SET_CLUBS", data: data });
  //     });
  //   } catch (err) {
  //     MySwal.fire({
  //       icon: "error",
  //       title: "Failed to fetch Clubs."
  //     });
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 500);
  //   }
  //   }
  // Promise.all([fetchMethod1,fetchMethod2(league_id)])
    
  // }, [])


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
                  onClick={() => setModal("Create Club")}
                >
                  Create New Club
                </button>
              </div>
              <ClubTable
                clubs={currentClubs}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={clubs.length}
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
          {activeModal.name === "Create Club" && (
            <CreateClub
              createClub={createClub}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update Club" && (
            <UpdateClub
              currentClub={currentClub}
              updateClub={updateClub}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete Club" && (
            <DeleteClub
              currentClub={currentClub}
              deleteClub={deleteClub}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default Clubs;
