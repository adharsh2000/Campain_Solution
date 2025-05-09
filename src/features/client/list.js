import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "../ui/modal/modal";
import CreateEditEmployee from "../employee/create";

const ClientList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen,setModalIsOpen] = useState(false);

  const hideModal = () => {
    setShow(false);
  };

  const userModal = async (user) => {
    console.dir(user);
    await setUserData(user);
    if(user && user.first_name) {      
      await setModalIsOpen(true);
      // let title = "Employee - " + user.first_name + " " + user.middle_name + " " + user.last_name
      // console.log(title);
      // setModalTitle(title);
      
    }
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
              <th></th>
              <th>Id</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>1</td>
                  <td>Test</td>
                  <td>3345345</td>
                  <td>test@test.com</td>
                  <td>
                    <span className="badge bg-label-primary me-1">Active</span>
                  </td>
                  <td>
                    <span
                    onClick={() => {
                      userModal();
                    }}
                      data-bs-toggle="modal"
                      data-bs-target="#exLargeModal"
                      
                    >
                      <i class="menu-icon tf-icons bx bx-edit"></i>
                    </span>
                  </td>
                  <td>
                    <span>
                      <i class="menu-icon tf-icons bx bx-trash"></i>
                    </span>
                  </td>
                </tr>
             
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
        <CreateEditEmployee isEdit="true" user={userData} />
      </Modal>
    </>
  );
};

export default ClientList;
