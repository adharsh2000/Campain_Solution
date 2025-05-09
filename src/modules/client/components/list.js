import React, { useEffect, useState } from "react";
import Modal from "../../../features/ui/modal/modal";
import { NotificationManager } from "react-notifications";
import clientService from "../../../services/clientService";
import { clientMockData } from "../MockData";
import CreateEditClient from "./create";

const ClientList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [clientData, setClientData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  async function fetchClientData() {
    clientService.getClient()
    .then(async (response) =>{
      console.dir(response);
      await setData(response.data.data ? response.data.data : "");
    })
    .catch((error) => {
      console.log(error);
      NotificationManager.error("Error while fetching Clients!", "Error!");
    });

    // setData(clientMockData);
  }

  useEffect(() => {
    fetchClientData();
  }, []);

  const hideModal = () => {
    setShow(false);
  };

  const userModal = async (user, editMode) => {
    console.dir(user);
    await setClientData(user);
    if (user && user.clientName) {
      await setModalIsOpen(true);
      await setIsEditMode(editMode);
    }
  };

  const reloadCallback = () => {
    console.log("reloadCallback");
    fetchClientData();
  };

  const handleDelete = (id, clientName) => {
    const choice = window.confirm(
      "Do you want to delete '" + clientName + "' ?"
    );
    if (choice) {
      deleteAction(id);
    }
  };

  const deleteAction = async (id) => {
    console.log("Inside deleteAction");
    clientService
      .deleteClient(id)
      .then(async (response) => {
        console.dir(response);
        fetchClientData();
        NotificationManager.success("Client Deleted Successfully!", "Success!");
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while deleting Client");
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
      <div className="row" id="content_area">
        <div className="text-nowrap">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Client Name</th>
                {/* <th>Address</th> */}
                <th>Status</th>
                <th>Plan</th>
                <th>Contact Name</th>
                <th>Phone</th>
                <th>Email</th>
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
                    className={"clickable-row".concat(
                      selectedRow === index ? "selected" : ""
                    )}
                  >
                    <td>{user.clientName}</td>
                    {/* <td>{user.address}</td> */}
                    <td>
                      <span className="badge bg-label-primary me-1">
                        {user.status==="1" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{user.plan.planName}</td>
                    <td>{user.firstName}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>

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
                          handleDelete(user.id, user.clientName);
                        }}
                      >
                        <i className="menu-icon tf-icons bx bx-trash"></i>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={show}
        isOpen={modalIsOpen && clientData}
        handleClose={hideModal}
        id="exLargeModal"
        data={{ title: modalTitle }}
      >
        <CreateEditClient
          isEdit={true}
          user={clientData}
          reloadCallback={reloadCallback}
          showUpdateButton={isEditMode}
        />
      </Modal>
    </>
  );
};

export default ClientList;
