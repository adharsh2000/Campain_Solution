import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "../../../features/ui/modal/modal";
import CreateEditClient from "../../client/components/create";
import clientService from "../../../services/clientService";
import { NotificationManager } from "react-notifications";

const ClientRequestList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user **: ", user.role);
  async function fetchData() {
    clientService
      .getClientRequests()
      .then(async (response) => {
        console.log(response);
        if (response.data.data) {
          setData(response.data.data);
        } else {
          NotificationManager.error("No Data Available !", "Error!");
        }
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          "Error while fetching Client Requests!",
          "Error!"
        );
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const hideModal = () => {
    setShow(false);
  };

  // const isActive = (id) => {
  //   console.log(id);
  //   console.log("user_action[0] : ", user_action[0]);
  //   if (user_action[0] && user_action[0].length > 0) {
  //     console.log("user_action");
  //     const obj = user_action[0].find((obj) => obj.id === id);
  //     console.log("obj: ", obj);

  //     if (obj) {
  //       return true;
  //     } else return false;
  //   }
  // };

  const userModal = async (user) => {
    console.log(user);
    await setUserData(user);
    if (user && user.first_name) {
      await setModalIsOpen(true);
      // let title = "Employee - " + user.first_name + " " + user.middle_name + " " + user.last_name
      // console.log(title);
      // setModalTitle(title);
    }
  };

  //   const reloadCallback = () => {
  //     console.log('reloadCallback');
  //     fetchUsersData();
  //   }

  const handleClick = async (actionType, id) => {
    let params = {
      action: actionType,
      id: id,
    };

    console.log(params);
    clientService
      .clientAction(params)
      .then(async (response) => {
        console.dir(response);
        NotificationManager.success(response.data.message);
        fetchData();
        // ++

        console.log("data fetched");
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while updating client!", "Error!");
      });
    console.log("params.id: ", params.id);
    // if (params.action == 2 ) {
    //   setShowButton(false);
    // }
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
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data.map((item, index) => {
              return (
                <tr>
                  <td>{item.clientName}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.isApproved === "1"
                      ? "Approved"
                      : item.isApproved === "0"
                      ? "Rejected"
                      : "Pending"}
                  </td>
                  {/* <td>
                    {item.isRequest === 1
                      ? "Approved"
                      : item.isRequest === 2
                      ? "Rejected"
                      : "Pending"}
                  </td> */}
                  <td>
                    {user.role != 2 && item.isApproved == "2" && (
                      <button
                        type="button"
                        className="btn btn-success  float-end"
                        // disabled={`${item.isApproved === 1 ? "true" : ""}`}
                        // disabled={`${item.isRequest === 1 ? "true" : ""}`}
                        onClick={() => {
                          handleClick(1, item.id);
                        }}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                  <td>
                    {user.role != 2 && item.isApproved == "2" && (
                      <button
                        type="button"
                        className="btn btn-danger  float-end"
                        disabled={`${item.isApproved === 2 ? "true" : ""}`}
                        // disabled={`${item.isRequest === 2 ? "true" : ""}`}
                        onClick={() => {
                          handleClick(2, item.id);
                        }}
                      >
                        Reject
                      </button>
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
        <CreateEditClient isEdit="true" user={userData} />
      </Modal>
    </>
  );
};

export default ClientRequestList;
