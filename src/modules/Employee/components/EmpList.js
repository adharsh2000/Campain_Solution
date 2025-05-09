import React, { useState, useEffect } from "react";
import Modal from "../../../features/ui/modal/modal";
import { NotificationManager } from "react-notifications";
import CreateEditEmployee from "./CreateEditEmployee";
import employeeService from "../../../services/employeeService";
import { EmployeeMockData } from "../../client/MockData";

const EmpList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  async function fetchUsersData() {
    employeeService
      .getEmployee()
      .then(async (response) => {
        console.dir(response);
        await setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while fetching Employees!", "Error!");
      });
  }

  useEffect(() => {
    fetchUsersData();
  }, []);

  const hideModal = () => {
    setShow(false);
  };

  const userModal = async (user, editMode) => {
    console.dir(user);
    await setUserData(user);
    if (user && user.firstName) {
      await setModalIsOpen(true);
      // let title = "Employee - " + user.first_name + " " + user.middle_name + " " + user.last_name
      // console.log(title);
      // setModalTitle(title);
      await setIsEditMode(editMode);
    }
  };

  const reloadCallback = () => {
    console.log("reloadCallback");
    fetchUsersData();
  };

  const handleDelete = (id, name) => {
    const choice = window.confirm("Do you want to delete '" + name + "' ?");
    if (choice) {
      deleteAction(id);
    }
  };
  const handleResent = async (id) => {
    console.log("resend Id: ", id);
    const resent = await employeeService.verificationResent(id);
    console.log(resent);
    if (resent.data.status == 200) {
      console.log(resent.data)
      NotificationManager.success(resent.data.message);
    } else {
      NotificationManager.error(resent.data.error);
    }
  };

  const deleteAction = async (id) => {
    console.log("Inside deleteAction");
    employeeService
      .deleteEmployee(id)
      .then(async (response) => {
        console.dir(response);
        fetchUsersData();
        NotificationManager.success("Deleted successfully!", "Success!");
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while deleting Employee!", "Error!");
      });
  };

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
              <th>Role</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Verified</th>
              {/* <th></th> */}
              <th></th>
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
                  {/* <td>
                    <input type="checkbox" />
                  </td> */}
                  {/* <td>{user.id}</td> */}
                  <td>
                    {user.firstName}&nbsp;{user.middleName}&nbsp;
                    {user.lastName}
                  </td>
                  <td>{user.roleId == 4 ? "Manager" : "Admin"}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>

                  <td>
                    <span className="badge bg-label-primary me-1">
                      {user.status === "1" ? "Active" : "InActive"}
                    </span>
                  </td>
                  {/* <td>
                    <span
                      onClick={() => {
                        userModal(user, false);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exLargeModal"
                    >
                      <i class="menu-icon tf-icons bx bx-show"></i>
                    </span>
                  </td> */}
                  <td>{user.isVerified ? "Yes" : "No"}</td>
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
                  <td>
                    <span
                      onClick={() => {
                        handleDelete(user.id, user.firstName);
                      }}
                    >
                      <i className="menu-icon tf-icons bx bx-trash"></i>
                    </span>
                  </td>
                  <td>
                    {!user.isVerified ? (
                      <span>
                        <button
                          class="btn btn-primary"
                          onClick={() => {
                            handleResent(user.id);
                          }}
                        >
                          Resent
                        </button>
                      </span>
                    ) : (
                      ""
                    )}
                  </td>
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
        <CreateEditEmployee
          isEdit={true}
          user={userData}
          reloadCallback={reloadCallback}
          showUpdateButton={isEditMode}
        />
      </Modal>
    </>
  );
};

export default EmpList;
