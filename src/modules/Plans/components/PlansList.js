import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "../../../features/ui/modal/modal";
import { NotificationManager } from "react-notifications";
// import CreateEditEmployee from "../employee/create";
import CreateEditPlans from "./CreateEditPlans";
import { plansMockData } from "../../client/MockData";
import planService from "../../../services/planService";

const PlansList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // async function fetchProducts() {
  //   // Fetch users
  //   await axios
  //     .get("http://localhost:3000/api/v1/products")
  //     .then(async (response) => {
  //       let resp = response.data.data;
  //       console.dir(resp);
  //       console.dir(resp.categories);
  //       await setData(resp);
  //       //await setUser(response.data[0]);
  //     });
  // }
  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  async function fetchPlans() {
    planService
      .getPlan()
      .then(async (response) => {
        console.dir(response);
        await setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while fetching Plans!", "Error!");
      });
    // setData(plansMockData);
  }
  useEffect(() => {
    fetchPlans();
  }, []);

  const hideModal = () => {
    setShow(false);
  };

  const userModal = async (user) => {
    console.dir(user);
    await setUserData(user);
    if (user && user.planName) {
      await setModalIsOpen(true);
      
    }
  };

  const reloadCallback = () => {
    console.log("reloadCallback");
    fetchPlans();
  };

  const handleDelete = (id, name) => {
    const choice = window.confirm("Do you want to delete '" + name + "' ?");
    if (choice) {
      deleteAction(id);
    }
  };

  const deleteAction = async (id) => {
    console.log("Inside deleteAction");
    planService
      .deletePlan(id)
      .then(async (response) => {
        console.dir(response);
        fetchPlans();
        NotificationManager.success("Plan deleted Successfully!", "Success!");
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while deleting Plan!");
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
              <th>Plan Name</th>
              <th>Price</th>
              <th>Email Limit</th>
              <th>Status</th>
              <th>Description</th>
              {/* <th></th>
              <th></th> */}
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {data.map((item, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => setSelectedRow(index)}
                  className={"clickable-row ".concat(
                    selectedRow === index ? "selected" : ""
                  )}
                >
                  <td>{item.planName}</td>

                  <td>
                    {item.price} {item.price.currency}
                  </td>
                  <td>
                    {item.emailLimit}
                  </td>

                  <td>
                      {item.status === "1" ? (
                        <span className="badge bg-label-primary me-1">
                          Active
                        </span>
                      ) : (
                        <span className="badge bg-label-primary me-1">
                          InActive
                        </span>
                      )}
                    </td>
                  <td>{item.description}</td>
                  {/* <td>
                    <span
                      onClick={() => {
                        userModal(item);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exLargeModal"
                    >
                      <i class="menu-icon tf-icons bx bx-edit"></i>
                    </span>
                  </td> */}
                  {/* <td>
                    <span
                      onClick={() => {
                        handleDelete(item.id,item.planName);
                      }}
                    >
                      <i class="menu-icon tf-icons bx bx-trash"></i>
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
        <CreateEditPlans isEdit="true" user={userData} reloadCallback={reloadCallback}/>
      </Modal>
    </>
  );
};

export default PlansList;
