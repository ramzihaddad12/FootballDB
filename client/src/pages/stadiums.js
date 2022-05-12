import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStadiums, getCreatedStadium, getUpdatedStadium, getDeletedStadium
} from "../app/api";

// Styles
import "../app.scss";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import StadiumTable from "../components/StadiumTable";
import CreateStadium from "../components/CreateStadium";
import UpdateStadium from "../components/UpdateStadium";
import DeleteStadium from "../components/DeleteStadium";
import Modal from "../components/Modal";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import MySwal from "../index";

function Stadiums() {
  const dispatch = useDispatch();
  const stadiums = useSelector(state => state.stadiums);
  const [loading, setLoading] = useState(false);

  const [currentStadium, setCurrentStadium] = useState({
    // id: null,
    // avatar: null,
    // league_id : null,
    // league_name : "",
    stadium_id:  null,
    stadium_name : "",
    club_name: "",
    capacity: null
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
  const [savedStadiums, setSavedStadiums] = useState(stadiums);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const stadiumsLastIndex = currentPage * pageSize;
  const stadiumsFirstIndex = stadiumsLastIndex - pageSize;

  console.log(stadiums)
  const currentStadiums = stadiums.slice(stadiumsFirstIndex, stadiumsLastIndex);

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

      const results = savedStadiums.filter(stadium =>
        Object.keys(stadium).some(key =>
            stadium[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_STADIUMS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_STADIUMS", data: savedStadiums });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
    //   case "league_name":
    //     const league_nameSort = [...savedStadiums].sort((a, b) => {
    //       return sorted
    //         ? a.league_name.localeCompare(b.league_name, "tr")
    //         : b.league_name.localeCompare(a.league_name, "tr");
    //     });
    //     dispatch({ type: "SET_STADIUMS", data: league_nameSort });
    //     return;
      case "stadium_name":
        const stadium_nameSort = [...savedStadiums].sort((a, b) => {
          return sorted
            ? a.stadium_name.localeCompare(b.stadium_name, "tr")
            : b.stadium_name.localeCompare(a.stadium_name, "tr");
        });
        dispatch({ type: "SET_STADIUMS", data: stadium_nameSort });
        return;

        case "club_name":
        const club_nameSort = [...savedStadiums].sort((a, b) => {
          return sorted
            ? a.club_name.localeCompare(b.club_name, "tr")
            : b.club_name.localeCompare(a.club_name, "tr");
        });
        dispatch({ type: "SET_STADIUMS", data: club_nameSort });
        return;

        case "capacity":
        const capacitySort = [...savedStadiums].sort((a, b) => {
          return sorted
            ? a.capacity - b.capacity
            : b.capacity - a.capacity;
        });
        dispatch({ type: "SET_STADIUMS", data: capacitySort });
        return;
      default:
        break;
    }
  };

  // Create League
  const createStadium= async stadium => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedStadium(stadium).then(res => {
        console.log("FFF")
        const result = res.data;
        console.log(res)
        console.log(res.data)
        console.log("GGG")

        MySwal.fire({
          icon: "success",
          title: "Stadium created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_STADIUM", data: result });
          setSavedStadiums([...stadiums, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create stadium."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update League
  const updateRow = stadium => {
    setModal("Update Stadium");

    setCurrentStadium({
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email

    //   league_id : league.league_id,
    //   league_name : league.league_name,
        stadium_id: stadium.stadium_id,
      stadium_name : stadium.stadium_name,
      club_name : stadium.club_name,
      capacity : stadium.capacity
    });
  };

  const updateStadium = async (stadium_id, updatedStadium) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedStadium(stadium_id, updatedStadium).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Stadium updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_STADIUMS",
            data: stadiums.map(stadium =>
                stadium.stadium_id === stadium_id ? Object.assign(stadium, result) : stadium
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update stadium."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete stadium
  const deleteRow = stadium => {
    setModal("Delete Stadium");

    setCurrentStadium({
        stadium_id: stadium.stadium_id,
        stadium_name : stadium.stadium_name,
        club_name : stadium.club_name,
        capacity : stadium.capacity
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email
    });
  };

  const deleteStadium = async stadium_id => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedStadium(stadium_id).then(() => {
        MySwal.fire({
          icon: "success",
          title: "stadium deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_STADIUMS",
            data: stadiums.filter(stadium => stadium.stadium_id !== stadium_id)
          });
          setSavedStadiums(savedStadiums.filter(stadium => stadium.stadium_id !== stadium_id));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete stadium."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchStadiums = async () => {
    setLoading(true);

    try {
      await getStadiums().then(({ data }) => {
        console.log("HI")
        console.log(data)
        console.log("HH")
        setSavedStadiums(data);
        dispatch({ type: "SET_STADIUMS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch Stadiums."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchStadiums();
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
                  onClick={() => setModal("Create Stadium")}
                >
                  Create New Stadiums
                </button>
              </div>
              <StadiumTable
                stadiums={currentStadiums}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={stadiums.length}
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
          {activeModal.name === "Create Stadium" && (
            <CreateStadium
              createStadium={createStadium}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update Stadium" && (
            <UpdateStadium
              currentStadium={currentStadium}
              updateStadium={updateStadium}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete Stadium" && (
            <DeleteStadium
            currentStadium={currentStadium}
            deleteStadium={deleteStadium}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default Stadiums;
