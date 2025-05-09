import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "../../../features/ui/modal/modal";
import TemplateEditor from "./editor";
// import CreateEditEmployee from "../employee/create";
import { NotificationManager } from "react-notifications";
import templateService from "../../../services/templateService";
import { templateMockData } from "../../client/MockData";

const TemplateLoader = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [userData, setUserData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  async function fetchTemplates() {
    templateService
      .getTemplate()
      .then(async (response) => {
        console.dir(response);
        await setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while fetching Templates!", "Error");
      });
    // setData(templateMockData);
  }

  useEffect(() => {
    fetchTemplates();
  }, []);

  const hideModal = () => {
    setShow(false);
  };

  const userModal = async (user, editMode) => {
    console.log("user:", user);
    if (user && user.name) {
      await setUserData(user);
      console.log("userData:", userData);
      await setModalIsOpen(true);
      await setIsEditMode(editMode);
    }
  };

  const reloadCallback = () => {
    console.log("reloadCallback");
    fetchTemplates();
  };

  const handleDelete = (id, name) => {
    const choice = window.confirm("Do you want to delete '" + name + "' ?");
    if (choice) {
      deleteAction(id);
    }
  };

  const deleteAction = async (id) => {
    console.log("Inside deleteAction");
    templateService
      .deleteTemplate(id)
      .then(async (response) => {
        console.dir(response);
        fetchTemplates();
        NotificationManager.success(
          "Template Deleted Successfully!",
          "Success!"
        );
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while deleting Template");
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
              <th>Template Name</th>
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
                  <td>{item.name}</td>
                  {/* <td>
                    <span
                      onClick={() => {
                        userModal(item, false);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exLargeModal"
                    >
                      <i class="menu-icon tf-icons bx bx-show"></i>
                    </span>
                  </td> */}
                  <td>
                    <span
                      onClick={() => {
                        userModal(item, true);
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exLargeModal"
                    >
                      <i className="menu-icon tf-icons bx bx-edit"></i>
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => {
                        handleDelete(item.id, item.name);
                      }}
                    >
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
        <TemplateEditor
          isEdit={true}
          user={userData}
          reloadCallback={reloadCallback}
          showUpdateButton={isEditMode}
        />
      </Modal>
    </>
  );
};

export default TemplateLoader;
