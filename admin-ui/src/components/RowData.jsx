import React, {useState} from "react";
import styles from "./RowData.module.css";
import {AiOutlineDelete,AiOutlineEdit,AiOutlineSave} from "react-icons/ai";

const RowData = ({
  admin,
  selected,
  showEdit,
  setShowEdit,
  handleRowSelection,
  handleDelete,
  handleUpdateRow,
}) => {

  const { id, name, email, role } = admin;
  const [updatedAdmin, setUpdatedAdmin] = useState({
    id: id,
    name: name,
    email: email,
    role: role,
  });

  return (
    <tr className={selected ? styles.selected : ""}>
      <td>
        <input
          type="checkbox"
          checked={selected}
          onChange={(event) => handleRowSelection(event, admin.id)}
        />
      </td>
      {showEdit.isEditOpen &&
      showEdit.admin.id === id ? (
        <>
          <td>
            <input
              type="text"
              defaultValue={name}
              onChange={(e) =>
                setUpdatedAdmin({
                  ...updatedAdmin,
                  name: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={email}
              onChange={(e) =>
                setUpdatedAdmin({
                  ...updatedAdmin,
                  email: e.target.value,
                })
              }
            />
          </td>
          <td>
            <input
              type="text"
              defaultValue={role}
              onChange={(e) =>
                setUpdatedAdmin({
                  ...updatedAdmin,
                  role: e.target.value,
                })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{email}</td>
          <td>{role}</td>
        </>
      )}

      <td className={styles.btn_container}>
        <div>
          {showEdit.isEditOpen && showEdit.admin.id === id ? (
            <button onClick={() => handleUpdateRow(updatedAdmin)}>
              <AiOutlineSave />
            </button>
          ) : (
              <button onClick={() => setShowEdit({
                isEditOpen: true,
                admin: admin,
              })
              }>
              <AiOutlineEdit />
            </button>
            
          )}
          <button onClick={() => handleDelete(admin.id)}>
            <AiOutlineDelete />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default RowData;