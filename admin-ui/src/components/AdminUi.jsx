import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./AdminUi.module.css";
import List from "./AdminList";
import Pagination from "./Pagination";

const AdminUi = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showEdit, setShowEdit] = useState({
    isEditOpen: false,
    admin: {},
  });
  const rowsPerPage = 10;
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentAdmins = filteredAdmins.slice(startIndex, endIndex);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      setAdmins(res.data);
      setFilteredAdmins(res.data);
    } catch (err) {
      console.log("Error fetching data - ", err);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

  const filtered = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(query) ||
      admin.email.toLowerCase().includes(query) ||
      admin.role.toLowerCase().includes(query)
    );
    setFilteredAdmins(filtered);
    setPage(1);
  };

  const handleDelete = (id) => {
    setFilteredAdmins((prevFilteredAdmins) =>
    prevFilteredAdmins.filter((admin) => admin.id !== id)
    );
  };

  const handlePagination = (newPage) => {
    setPage(newPage);
  };

  const handleSelectAllRows = (event) => {
    const { checked } = event.target;
    const allRowIds = currentAdmins.map((admin) => admin.id);

    if (checked && selectedRows.length !== allRowIds.length) {
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelection = (event, id) => {
    const { checked } = event.target;
    if (checked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((rowId) => rowId !== id)
      );
    }
  };

  const handleUpdateRow = (row) => {
    setShowEdit({ isEditOpen: false, admin: {} });
    setAdmins(admins.map((admin) => (admin.id === row.id ? row : admin)));
  };

  const handleDeleteSelected = () => {
    const updatedAdmins = admins.filter(
      (admin) => !selectedRows.includes(admin.id)
    );
    setAdmins(updatedAdmins);
    setFilteredAdmins(updatedAdmins);
    setSelectedRows([]);
  };

  return (
    <div className={styles.container}>
        <div>
            <input 
              type="text" 
              placeholder="Search by name, email or roles" 
              value={searchQuery} 
              onChange={handleSearch} 
              className={styles.search_input} 
            />
        </div>
      <List
        admins={currentAdmins}
        showEdit={showEdit}
        selectedRows={selectedRows}
        setShowEdit={setShowEdit}
        handleRowSelection={handleRowSelection}
        handleDelete={handleDelete}
        handleSelectAllRows={handleSelectAllRows}
        handleUpdateRow={handleUpdateRow}
      />
      
      <div className={styles.delete_selected_action_container}>
        <button className={styles.btn_delete_selected} onClick={handleDeleteSelected} disabled={selectedRows.length === 0}>
          Delete selected
        </button>
        <Pagination
          currentPage={page}
          rowsPerPage={rowsPerPage}
          totalRows={filteredAdmins.length}
          handlePagination={handlePagination}
        />
      </div>
    </div>
  );
};

export default AdminUi;