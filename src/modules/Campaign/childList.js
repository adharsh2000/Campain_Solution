import React, { useEffect } from "react";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import Modal from "../../features/ui/modal/modal";
import Campaign from "./components/create";
import campaignService from "../../services/campaignService";
import { blue } from "@mui/material/colors";
import { format } from 'date-fns';
import RecurringModel from "./recurringModel";

const ChildCampaignsList = ({ user }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [recurringFlag, setRecurringFlag] = useState(false);
  const [viewChild, setViewChild] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [currentDate,setCurrentDate] = useState("")

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

  

  useEffect(() => {
    console.log("user: ", user);
    setData(user.campaign_recurring_mappings);
    // setFrequency(user.frequency);
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    console.log(currentDate)
    setCurrentDate(currentDate);
  }, [user]);

  const hideModal = () => {
    setShow(false);
    // setIsEditMode(false);
    // setRecurringFlag(false);
    // setViewChild(false);
    // setUserData(null);
  };

  
  const userModal = async (user) => {
    console.log("User send to userModel: ", user);
    setUserData(user);
    if (user) {
      setModalIsOpen(true);
    }
  };

  const reloadCallback = () => {
    console.log("reloadCallback");
  
  };

  const handleCampaignStop = async (user) => {
    console.log("user: ", user);
    const choice = window.confirm("Do you want to Stop the Campaign ?");
    if (choice) {
      deleteAction(user.id);
   
    }
  };

  const deleteAction = async (id) => {
    console.log("Inside StopAction");
    campaignService
      .campaignStop(id)
      .then(async (response) => {
        console.dir(response);
        NotificationManager.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(error.message);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
            <span className="text-muted fw-light"></span>
           Recurring Campaigns
          </h4>
        </div>
      </div>
      <div className="text-nowrap">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
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
                  <td>{user.start_date}   </td>
                  <td>{user.end_date}</td>
                  {/* <td>
                    <span data-bs-toggle="modal" data-bs-target="#exLargeModal">
                      <i
                        class="menu-icon tf-icons bx bx-repeat"
                        onClick={() => {
                            setIsEditMode(false);
                            setRecurringFlag(true);
                          userModal(user);
                        }}
                      ></i>
                    </span>
                  </td> */}

                  {/* <td>
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
                  </td> */}

                  {/* <td>
                    <span data-bs-toggle="modal" data-bs-target="#exLargeModal">
                      <i
                        class="menu-icon tf-icons bx bx-edit"
                        onClick={() => {
                          setRecurringFlag(false);
                          // setViewChild(false);
                          setIsEditMode(true);
                          userModal(user);
                        }}
                      ></i>
                    </span>
                  </td> */}
                 
                  <td>
                    {user.status == true && user.start_date < currentDate && user.end_date > currentDate ? (
                      <span
                        data-bs-toggle="modal"
                        data-bs-target="#exLargeModal"
                      >
                        <button
                          className="btn btn-danger  float-end"
                          onClick={() => {
                            handleCampaignStop(user);
                          }}
                        >
                          STOP
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
        <RecurringModel
          isEdit={true}
          user={userData}
          reloadCallback={reloadCallback}
          showUpdateButton={isEditMode}
        />
      </Modal>
    </>
  );
};

export default ChildCampaignsList;
