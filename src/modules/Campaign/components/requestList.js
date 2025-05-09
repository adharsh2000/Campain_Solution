import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "../../../features/ui/modal/modal";
import { NotificationManager } from "react-notifications";
import campaignService from "../../../services/campaignService";
import Campaign from "./create";

const CampaignRequestList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);


  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user **: ", user.role);

  async function fetchData() {
   campaignService
      .getCampaignRequests()
      .then(async (response) => {
        console.log(response);
        await setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while fetching Campaigns!", "Error!");
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const hideModal = () => {
    setShow(false);
  };


  const userModal = async (user, editMode) => {
    console.dir(user);
    await setUserData(user);
    if (user && user.campaignName) {
      await setModalIsOpen(true);
      await setIsEditMode(editMode);
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
    console.log("Action: ",actionType)
    let params = {
      action: actionType,
      id: id,
    };

    console.log(params);
   campaignService
      .campaignRequestAction(params)
      .then(async (response) => {
        console.dir(response);
        NotificationManager.success(
         response.data.message,
          2000
        );

        fetchData();
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(error.response.data.error);
      });
  };

  function getFrequencyLabel(value) {
    switch (value) {
      case "1":
        return "Weekly";
      case "2":
        return "Weekly twice";
      case "3":
        return "Monthly";
      case "4":
        return "Monthly twice";
      default:
        return "";
    }
  }

  const reloadCallback = () => {
    console.log("reloadCallback");
    // fetchCampaignData();
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
              <th>Campaign Frequency</th>
              {/* <th>View/Edit</th> */}
              {user.role == 4 ? 
              <th>Action Status</th> :""}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data.map((item, index) => {
              return (
                <tr>
                  <td>{item.campaignName}</td>
                  <td>{`${item.startDate}  to  ${item.endDate}`}</td>
                  <td>{getFrequencyLabel(item.frequency)}</td>
            
        {user.role == 3 && item.status == "2" && (
          <>
            <td>
              <button
                type="button"
                className="btn btn-success float-end"
                onClick={() => {
                  handleClick("1", item.id);
                }}
              >
                Approve
              </button>
            </td>
            <td>
              <button
                type="button"
                className="btn btn-danger float-end"
                onClick={() => {
                  handleClick("0", item.id);
                }}
              >
                Reject
              </button>
            </td>
          </>
        )}
        {user.role == 3 && item.status != "2" && (
          <td>{item.status === "1" ? "Approved" : "Rejected"}</td>
        )}
        {user.role == 4 && item.status != "2" && (
          <td>{item.status === "1" ? "Approved" : "Rejected"}</td>
                  )}
                  {user.role == 4 && item.status == "2" && (
          <td>{"Pending"}</td>
                  )}
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
         <Campaign
          isEdit={true}
          user={userData}
          reloadCallback={reloadCallback}
          showUpdateButton={isEditMode}
        />
      </Modal>
    </>
  );
};

export default CampaignRequestList;
