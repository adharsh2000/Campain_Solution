import React, { useState, useEffect } from "react";
import Modal from "../../features/ui/modal/modal";
import { NotificationManager } from "react-notifications";
import CreateEditAdmin from "./create";
import adminService from "../../services/adminUserService";
import adminUserService from "../../services/adminUserService";


const 
AdminList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  async function fetchUsersData() {
    adminUserService
      .getAdminUser()
      .then(async (response) => {
        console.log(response);
        await setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while fetching Admin!", "Error!");
      });
  }

  useEffect(() => {
    fetchUsersData();
  }, []);

  const hideModal = () => {
    setShow(false);
  };

  const userModal = async (user, editMode) => {
    console.log("userModel user:",user);
    await setUserData(user);
    if (user && user.name) {
      await setModalIsOpen(true);
     
      await setIsEditMode(editMode);
    }
  };

  const reloadCallback = () => {
    console.log("reloadCallback");
    fetchUsersData();
  };

//   const handleDelete = (id, name) => {
//     const choice = window.confirm("Do you want to delete '" + name + "' ?");
//     if (choice) {
//       deleteAction(id);
//     }
//   };

//   const deleteAction = async (id) => {
//     console.log("Inside deleteAction");
//     adminUserService
//       .deleteAdminUser(id)
//       .then(async (response) => {
//         console.dir(response);
//         fetchUsersData();
//         NotificationManager.success("Deleted successfully!", "Success!");
//       })
//       .catch((error) => {
//         console.log(error);
//         NotificationManager.error("Error while deleting Admin!", "Error!");
//       });
//   };

  return (
    <>
      <div className="row">
        <div className="col">
          <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
            <span className="text-muted fw-light"></span>
            {name}
          </h4>
        </div>
      </div>
      <div className="text-nowrap">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
           
             
              <th>Email</th>
              <th>Status</th>
              
              <th></th>
              <th></th>
            
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data.map((user, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => setSelectedRow(index)}
                  className={"clickable-row ".concat(
                    selectedRow === index ? "selected" : ""
                  )}
                >
                
                  <td>
                    
                    {user.name}
                  </td>
                
                  <td>{user.email}</td>
                 
                  <td>
                      <span className="badge bg-label-primary me-1">
                        {user.status=== true ? "Active" : "Inactive"}
                      </span>
                    </td>
                
                  <td>
                    <span
                      onClick={() => {
                        userModal(user, true);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exLargeModal"
                    >
                      <i className="menu-icon tf-icons bx bx-edit"></i>
                    </span>
                  </td>
                  {/* <td>
                    <span
                      onClick={() => {
                        handleDelete(user.id, user.name);
                      }}
                    >
                      <i className="menu-icon tf-icons bx bx-trash"></i>
                    </span>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        show={show}
        isOpen={modalIsOpen && userData}
        handleClose={hideModal}
        id="exLargeModal"
        data={{ title: modalTitle }}
      >
        <CreateEditAdmin
          isEdit={true}
          user={userData}
          reloadCallback={reloadCallback}
          showUpdateButton={isEditMode}
        />
      </Modal>
    </>
  );
};

export default AdminList;
