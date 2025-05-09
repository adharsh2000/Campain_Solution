import React, { useState, useEffect } from "react";
import Modal from "../../features/ui/modal/modal";
import { NotificationManager } from "react-notifications";
import invoiceService from "../../services/invoiceService";
import InvoiceView from "./InvoiceView";
import { invoiceMockData } from "../client/MockData";

const Invoice = () => {
  const [show, setShow] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const [userData, setUserData] = useState(null);
  const [modalTitle, setModalTitle] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  async function fetchInvoice() {
    // invoiceService
    //   .getInvoice()
    //   .then(async (response) => {
    //     console.dir(response);
    //     await setInvoices(response.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     NotificationManager.error(
    //       "Error while fetching Invoices!",
    //       "Error!"
    //     );
    //   });
    setInvoices(invoiceMockData);
  }

  useEffect(() => {
    fetchInvoice();
  }, []);

  const hideModal = () => {
    setModalIsOpen(false);
    // setShow(false);
  };

  const userModal = async (user) => {
    console.dir(user);
    await setUserData(user);
    if (user && user.number) {
      setModalTitle(`Invoice - ${user.number}`); 
      await setModalIsOpen(true);
      // setShow(true);
    }
  };

  // const viewInvoice = (invoice) => {
  //   console.log("viewInvoice called")
  //   setUserData(invoice);
  //   setShow(true);
  // };

  return (
    <>
  
      <div className="text-nowrap">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Invoice Number</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {invoices.map((user, index) => {
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
                  
                  <td>{user.number}</td>
                  <td>{user.date}</td>
                  <td>
                    <span
                      onClick={() => {
                        userModal(user);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exLargeModal"
                    >
                      <i className="menu-icon tf-icons bx bx-show"></i>
                    </span>
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
        <InvoiceView
          
          user={userData}
          
         
        />
      </Modal>
    </>
  );
};
export default Invoice;
