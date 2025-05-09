import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "../../../features/ui/modal/modal";
import { NotificationManager } from "react-notifications";
import CreateEditContacts from "./create";

const ContactList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([{
    name: "Person 2",
    address: "Address line",
    firstname: "P 2",
    phone: "+9197886542338",
    email: "person2@abc.org"
  }]);
  const [modalTitle, setModalTitle] = useState([]);
  const [clientData, setClientData] = useState(null);
  const [modalIsOpen,setModalIsOpen] = useState(false);

  const hideModal = () => {
    setShow(false);
  };

  const userModal = async (user) => {
    console.dir("user12121");
    console.dir(user);
    await setClientData(user);
    if(user && user.name) {      
      await setModalIsOpen(true);
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
              <th>Name</th>
              <th>Address</th>
              <th>Contact Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
          {data.map((item, index) => {
              return (
                <tr>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.firstname} {item.middlename} {item.lastname}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.status === 1 ?
                    <span className="badge bg-label-primary me-1">Active</span> : 
                    <span className="badge bg-label-primary me-1">InActive</span>
                  }
                  </td>
                  <td>
                    <span
                    onClick={() => {
                      userModal(item);
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
              )})}
          </tbody>
        </table>
      </div>

      <Modal
        show={show}
        isOpen={modalIsOpen && clientData}
        handleClose={hideModal}
        id="exLargeModal"
        data={{ title: modalTitle }}
      >
        <CreateEditContacts isEdit="true" user={clientData} />
      </Modal>
    </>
  );
};

export default ContactList;
