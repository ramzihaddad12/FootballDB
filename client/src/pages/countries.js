import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCountries, getCreatedCountry, getUpdatedCountry, getDeletedCountry
} from "../app/api";

// Styles
import "../app.scss";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import CountryTable from "../components/CountryTable";
import CreateCountry from "../components/CreateCountry";
import UpdateCountry from "../components/UpdateCountry";
import DeleteCountry from "../components/DeleteCountry";
import Modal from "../components/Modal";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import MySwal from "../index";

function Countries() {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const [loading, setLoading] = useState(false);

  const [currentCountry, setCurrentCountry] = useState({
    // id: null,
    // avatar: null,
    // league_id : null,
    // league_name : "",
    country_name : "",
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
  const [savedCountries, setSavedCountries] = useState(countries);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const countriesLastIndex = currentPage * pageSize;
  const countriesFirstIndex = countriesLastIndex - pageSize;

  console.log(countries)
  const currentCountries = countries.slice(countriesFirstIndex, countriesLastIndex);

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

      const results = savedCountries.filter(country =>
        Object.keys(country).some(key =>
            country[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_COUNTRIES", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_COUNTRIES", data: savedCountries });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
    //   case "league_name":
    //     const league_nameSort = [...savedCountries].sort((a, b) => {
    //       return sorted
    //         ? a.league_name.localeCompare(b.league_name, "tr")
    //         : b.league_name.localeCompare(a.league_name, "tr");
    //     });
    //     dispatch({ type: "SET_COUNTRIES", data: league_nameSort });
    //     return;
      case "country_name":
        const country_nameSort = [...savedCountries].sort((a, b) => {
          return sorted
            ? a.country_name.localeCompare(b.country_name, "tr")
            : b.country_name.localeCompare(a.country_name, "tr");
        });
        dispatch({ type: "SET_COUNTRIES", data: country_nameSort });
        return;

        case "num_of_players":
        const num_of_playersSort = [...savedCountries].sort((a, b) => {
          return sorted
            ? a.num_of_players - b.num_of_players
            : b.num_of_players - a.num_of_players;
        });
        dispatch({ type: "SET_COUNTRIES", data: num_of_playersSort });
        return;
      default:
        break;
    }
  };

  // Create League
  const createCountry= async country => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedCountry(country).then(res => {
        console.log("FFF")
        const result = res.data;
        console.log(res)
        console.log(res.data)
        console.log("GGG")

        MySwal.fire({
          icon: "success",
          title: "Country created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_COUNTRY", data: result });
          setSavedCountries([...countries, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create country."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update League
  const updateRow = country => {
    setModal("Update Country");

    setCurrentCountry({
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email

    //   league_id : league.league_id,
    //   league_name : league.league_name,
      country_name : country.country_name
    });
  };

  const updateCountry = async (country_name, updatedCountry) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedCountry(country_name, updatedCountry).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Country updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_COUNTRIES",
            data: countries.map(country =>
                country.country_name === country_name ? Object.assign(country, result) : country
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update country."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete country
  const deleteRow = country => {
    setModal("Delete Country");

    setCurrentCountry({
      country_name : country.country_name
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email
    });
  };

  const deleteCountry = async country_name => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedCountry(country_name).then(() => {
        MySwal.fire({
          icon: "success",
          title: "country deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_COUNTRIES",
            data: countries.filter(country => country.country_name !== country_name)
          });
          setSavedCountries(savedCountries.filter(country => country.country_name !== country_name));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete country."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchCountries = async () => {
    setLoading(true);

    try {
      await getCountries().then(({ data }) => {
        console.log("HI")
        console.log(data)
        console.log("HH")
        setSavedCountries(data);
        dispatch({ type: "SET_COUNTRIES", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch countries."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchCountries();
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
                  onClick={() => setModal("Create Country")}
                >
                  Create New Countries
                </button>
              </div>
              <CountryTable
                countries={currentCountries}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={countries.length}
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
          {activeModal.name === "Create Country" && (
            <CreateCountry
              createCountry={createCountry}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update Country" && (
            <UpdateCountry
              currentCountry={currentCountry}
              updateCountry={updateCountry}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete Country" && (
            <DeleteCountry
            currentCountry={currentCountry}
            deleteCountry={deleteCountry}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default Countries;
