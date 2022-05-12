import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getManagers, getCreatedManager, getUpdatedManager, getDeletedManager
} from "../app/api";

// Styles
import "../app.scss";

// Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import ManagerTable from "../components/ManagerTable";
import CreateManager from "../components/CreateManager";
import UpdateManager from "../components/UpdateManager";
import DeleteManager from "../components/DeleteManager";
import Modal from "../components/Modal";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";
import MySwal from "../index";

function Managers() {
  const dispatch = useDispatch();
  const managers = useSelector(state => state.managers);
  const [loading, setLoading] = useState(false);

  const [currentManager, setCurrentManager] = useState({
    // id: null,
    // avatar: null,
    manager_id : null,
    manager_name : "",
    manager_nationality : "",
    club_name : ""
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
  const [savedManagers, setSavedManagers] = useState(managers);
  const [pageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const managersLastIndex = currentPage * pageSize;
  const managersFirstIndex = managersLastIndex - pageSize;

  console.log(managers)
  const currentManagers = managers.slice(managersFirstIndex, managersLastIndex);

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

      const results = savedManagers.filter(manager =>
        Object.keys(manager).some(key =>
          manager[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_MANAGERS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_MANAGERS", data: savedManagers });
    }
  };

  // Sorting
  const sorting = key => {
    setSorted(!sorted);
    switch (key) {
      case "manager_name":
        const manager_nameSort = [...savedManagers].sort((a, b) => {
          return sorted
            ? a.manager_name.localeCompare(b.manager_name, "tr")
            : b.manager_name.localeCompare(a.manager_name, "tr");
        });
        dispatch({ type: "SET_MANAGERS", data: manager_nameSort });
        return;
      case "manager_nationality":
        const country_nameSort = [...savedManagers].sort((a, b) => {
          return sorted
            ? a.manager_nationality.localeCompare(b.manager_nationality, "tr")
            : b.manager_nationality.localeCompare(a.manager_nationality, "tr");
        });
        dispatch({ type: "SET_MANAGERS", data: country_nameSort });
        return;

      case "club_name":
          const club_nameSort = [...savedManagers].sort((a, b) => {
            return sorted
              ? a.club_name.localeCompare(b.club_name, "tr")
              : b.club_name.localeCompare(a.club_name, "tr");
          });
          dispatch({ type: "SET_MANAGERS", data: club_nameSort });
          return;
      default:
        break;
    }
  };

  // Create Manager
  const createManager = async manager => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedManager(manager).then(res => {
        console.log("FFF")
        const result = res.data;
        console.log(res)
        console.log(res.data)
        console.log("GGG")

        MySwal.fire({
          icon: "success",
          title: "Manager created successfully."
        }).then(() => {
          dispatch({ type: "CREATE_MANAGER", data: result });
          setSavedManagers([...managers, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to create manager."
      });
    } finally {
      setLoading(false);
    }
  };

  // Update Manager
  const updateRow = manager => {
    setModal("Update Manager");

    setCurrentManager({
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email

      manager_id : manager.manager_id,
      manager_name : manager.manager_name,
      manager_nationality : manager.manager_nationality
    });
  };

  const updateManager = async (manager_id, updatedManager) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedManager(manager_id, updatedManager).then(res => {
        const result = res.data;
        MySwal.fire({
          icon: "success",
          title: "Manager updated successfully."
        }).then(() => {
          dispatch({
            type: "SET_MANAGERS",
            data: managers.map(manager =>
                manager.manager_id === manager_id ? Object.assign(manager, result) : manager
            )
          });
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to update manager."
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete manager
  const deleteRow = manager => {
    setModal("Delete Manager");

    setCurrentManager({
        manager_id : manager.manager_id,
        manager_name : manager.manager_name,
        manager_nationality : manager.manager_nationality
      // id: user.id,
      // avatar: user.avatar,
      // first_name: user.first_name,
      // last_name: user.last_name,
      // email: user.email
    });
  };

  const deleteManager = async manager_id => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedManager(manager_id).then(() => {
        MySwal.fire({
          icon: "success",
          title: "manager deleted successfully."
        }).then(() => {
          dispatch({
            type: "SET_MANAGERS",
            data: managers.filter(manager => manager.manager_id !== manager_id)
          });
          setSavedManagers(savedManagers.filter(manager => manager.manager_id !== manager_id));
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to delete manager."
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Users
  const fetchManagers = async () => {
    setLoading(true);

    try {
      await getManagers().then(({ data }) => {
        console.log("HI")
        console.log(data)
        console.log("HH")
        setSavedManagers(data);
        dispatch({ type: "SET_MANAGERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch managers."
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchManagers();
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
                  onClick={() => setModal("Create Manager")}
                >
                  Create New Managers
                </button>
              </div>
              <ManagerTable
                managers={currentManagers}
                updateRow={updateRow}
                deleteRow={deleteRow}
                onSortChange={sorting}
              />
              <Pagination
                totalResults={managers.length}
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
          {activeModal.name === "Create Manager" && (
            <CreateManager
              createManager={createManager}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Update Manager" && (
            <UpdateManager
              currentManager={currentManager}
              updateManager={updateManager}
              setActiveModal={setActiveModal}
            />
          )}
          {activeModal.name === "Delete Manager" && (
            <DeleteManager
            currentManager={currentManager}
            deleteManager={deleteManager}
              setActiveModal={setActiveModal}
            />
          )}
        </Modal>
      )}
      <Footer />
    </div>
  );
}

export default Managers;
