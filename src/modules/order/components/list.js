import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "../../../features/ui/modal/modal";
import LineItems from "./lineItems";

const OrderList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [itemData, setItemData] = useState([]);
  const [show, setShow] = useState(false);

  const userModal = async (items) => {
    console.dir(items);
    await setItemData(items);
    await setModalIsOpen(true);
  };

  const hideModal = () => {
    setShow(false);
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
              <th>OrderNo</th>
              <th>Status</th>
              <th>Discount</th>
              <th>SubTotal</th>
              <th>Total</th>
              <th>Tax</th>
              <th>GrandTotal</th>
              <th>Created Date</th>
              <th></th>
              <th></th>
              <th></th>
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
                  <td>{item.orderNo}</td>
                  <td>{item.status}</td>
                  <td>{item.discount}</td>
                  <td>{item.subTotal}</td>
                  <td>{item.total}</td>
                  <td>{item.tax}</td>
                  <td>{item.grandTotal}</td>
                  <td>{item.createdDate}</td>
                  <td>
                    <span
                    onClick={() => {
                      userModal(item.lineItems);
                    }}
                      data-bs-toggle="modal"
                      data-bs-target="#exLargeModal"
                      
                    >
                      <i class="menu-icon tf-icons bx bx-low-vision"></i>
                    </span>
                  </td>
                  <td>
                    <span>
                      <i class="menu-icon tf-icons bx bx-edit"></i>
                    </span>
                  </td>
                  <td>
                    <span>
                      <i class="menu-icon tf-icons bx bx-trash"></i>
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
        <LineItems items={itemData} />
      </Modal>
    </>
  );
};

export default OrderList;
