import React from "react";
import RowData from "./RowData";
import styles from "./AdminList.module.css";

const AdminList = ({
  admins,
  showEdit,
  selectedRows,
  setShowEdit,
  handleRowSelection,
  handleDelete,
  handleSelectAllRows,
  handleUpdateRow,
}) => {
  const currentAdmins = admins.slice(0, 10);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectedRows.length === currentAdmins.length}
              onChange={handleSelectAllRows}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {admins.map((admin) => (
          <RowData
            key={admin.id}
            admin={admin}
            selected={selectedRows.includes(admin.id)}
            showEdit={showEdit}
            setShowEdit={setShowEdit}
            handleRowSelection={handleRowSelection}
            handleDelete={handleDelete}
            handleUpdateRow={handleUpdateRow}
          />
        ))}
      </tbody>
    </table>
  );
};

export default AdminList;