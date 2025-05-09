import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "../ui/modal/modal";
import CreateEditEmployee from "../employee/create";

const CategoryList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState(null);
  const [modalIsOpen,setModalIsOpen] = useState(false);

  async function fetchCategories() {
    // Fetch users
    await axios.get("http://localhost:4000/api/v1/categories").then(async (response) => {
      console.dir(response);
      await setData(response.data.data);
      //await setUser(response.data[0]); 
    });
  }
  useEffect(() => {
    fetchCategories();
  }, []);

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

//   const reloadCallback = () => {
//     console.log('reloadCallback');
//     fetchUsersData();
//   }

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
              <th>Category Name</th>
              <th>Parent Category</th>
              <th>Status</th>
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
                  <td>{item.title}</td>
                  <td>{item.parentId === "1" ? 'Dairy & Eggs' : (item.parentId === "4" ? 'Vegetables & Fruits': '-')}</td>
                  <td>
                    <span className="badge bg-label-primary me-1">{item.is_active ? "Active" : "Active"}</span>
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
        <CreateEditEmployee isEdit="true" user={userData} />
      </Modal>
    </>
  );
};

export default CategoryList;
