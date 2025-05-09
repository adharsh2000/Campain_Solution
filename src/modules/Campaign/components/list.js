import React, { useEffect } from "react";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import Modal from "../../../features/ui/modal/modal";
import Campaign from "./create";
import campaignService from "../../../services/campaignService";
import { blue } from "@mui/material/colors";
import RecurringModel from "../recurringModel";
import ChildCampaignsList from "../childList";
import { format } from 'date-fns';


const CampaignList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [recurringFlag, setRecurringFlag] = useState(false);
  const [viewChild, setViewChild] = useState(false);

  //   const reloadCallback = () => {
  //     console.log('reloadCallback');
  //     fetchUsersData();
  //   }
  // const handleEdit = (id) => {
  //   console.log(`Edit campaign with ID: ${id}`);
  // };

  // const handleView = (id) => {
  //   console.log(`View campaign with ID: ${id}`);
  // };

  // const handleDelete = (id) => {
  //   console.log(`Delete campaign with ID: ${id}`);
  // };

  function getFrequencyLabel(value) {
    switch (value) {
      case "1":
        return "Daily";
      case "2":
        return "Custom Dates";
      default:
        return "";
    }
  }

  async function fetchCampaignData() {
    campaignService
      .getCampaign()
      .then(async (response) => {
        console.log(response);
         setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while fetching Campaign!", "Error");
      });
    // setData(campaignMockData);
  }

  useEffect(() => {
    fetchCampaignData();
  }, []);

  const hideModal = () => {
    setShow(false);
  };

  async function sendMail(id) {
    campaignService
      .sendCampaign(id)
      .then(async (response) => {
        console.log(response);
        // NotificationManager.success("Campaign send Successfully", "Success!");
        NotificationManager.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        // NotificationManager.error("Error while sending Campaign!", "Error");
        NotificationManager.error(error.response.data.error);
      });
  }

  const userModal = async (user) => {
    console.log("User send to userModel: ", user);
     setUserData(user);
    if (user && user.name) {
       setModalIsOpen(true);
      // await setIsEditMode(editMode);
    }
  };

  const reloadCallback = () => {
    console.log("reloadCallback");
    fetchCampaignData();
  };

  const handleDelete = (id, campaignName) => {
    const choice = window.confirm(
      "Do you want to delete '" + campaignName + "' ?"
    );
    if (choice) {
      deleteAction(id);
    }
  };

  const deleteAction = async (id) => {
    console.log("Inside deleteAction");
    campaignService
      .deleteCampaign(id)
      .then(async (response) => {
        console.dir(response);
        fetchCampaignData();
        NotificationManager.success("Deleted successfully!", "Success!");
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while deleting Campaign!", "Error!");
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
              <th>Campaign Name</th>
              <th>Date</th>
              {/* <th>Group Name</th> */}
              <th>Campaign Frequency</th>
              {/* <th>Recurring</th> */}
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
                  <td>{user.campaignName}</td>
                  <td>{`${format(new Date(user.startDate),'dd-MM-yyyy')}  to  ${format(new Date(user.endDate),'dd-MM-yyyy')}`}</td>
                  {/* <td>{user.date}</td> */}
                  {/* <td>{user.to}</td> */}
                  {/* <td>{user.frequency}</td> */}
                  <td>{getFrequencyLabel(user.frequency)}</td>
              
                   <td>
                     <span data-bs-toggle="modal" data-bs-target="#exLargeModal">
                       <i
                         class="menu-icon tf-icons bx bx-repeat"
                         onClick={() => {
                           setRecurringFlag(true);
                           userModal(user);
                         }}
                       ></i>
                     </span>
                   </td>

                  <td>
                    <span data-bs-toggle="modal" data-bs-target="#exLargeModal">
                      <i
                        class="menu-icon tf-icons bx bx-show"
                        onClick={() => {
                          setRecurringFlag(false);
                          setViewChild(true);
                          userModal(user);
                        }}
                      ></i>
                    </span>
                  </td>

                  <td>
                    <span data-bs-toggle="modal" data-bs-target="#exLargeModal">
                      <i
                        class="menu-icon tf-icons bx bx-edit"
                        onClick={() => {
                          setRecurringFlag(false);
                          setViewChild(false);
                          setIsEditMode(true);
                          userModal(user);
                        }}
                      ></i>
                    </span>
                  </td>

                  {/* <td>
                    <span
                      onClick={() => {
                        handleDelete(user.id, user.campaignName);
                      }}
                    >
                      <i class="menu-icon tf-icons bx bx-trash"></i>
                    </span>
                  </td> */}

                  {/* <td>
                    <span
                      onClick={() => {
                        sendMail(user.id);
                      }}
                      // data-bs-toggle="modal"
                      // data-bs-target="#exLargeModal"
                    >
                      <button
                        style={{
                          backgroundColor: "#3b5998",
                          color: "white",
                          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                          border: "none",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        Send
                      </button>
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
        {recurringFlag ? (
          <RecurringModel
            isEdit={true}
            user={userData}
            reloadCallback={reloadCallback}
            showUpdateButton={isEditMode}
          />
        ) : viewChild ? (
          <ChildCampaignsList  user={userData} />
        ) : isEditMode ? (
          <Campaign
            isEdit={true}
            user={userData}
            reloadCallback={reloadCallback}
            showUpdateButton={isEditMode}
          />
        ) : null}
      </Modal>
    </>
  );
};

export default CampaignList;
