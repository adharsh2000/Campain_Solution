import React, { useEffect, useState } from "react";
import Modal from "../../../features/ui/modal/modal";
import { NotificationManager } from "react-notifications";
import contactService from "../../../services/contactService";
import ActionButtonGroup from "../../Employee/components/ActionButtonGroup";
import { contactMockData } from "../../client/MockData";
import CreateEditContact from "./CreateEditContact";
import groupService from "../../../services/groupService";


const ContactList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [contactData, setContactData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [csvfile, setCsvfile] = useState();
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    groupService.getGroupsName().then((response) => {
      console.log("Groups API REsponse: ", response.data.data);
      setGroups(response.data.data || []);
      // console.log(groups)
    });

    fetchContactData();
  }, []);

  async function fetchContactData() {
    contactService
      .getContact()
      .then(async (response) => {
        console.log(response, "data");
        await setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while fetching Contacts!", "Error!");
      });

    // setData(contactMockData);
  }

  // const handleContactSelection = (index) => {
  //   const selectedContactsCopy = [...selectedContacts];
  //   if (selectedContactsCopy.includes(index)) {
  //     // Deselect
  //     const indexToRemove = selectedContactsCopy.indexOf(index);
  //     selectedContactsCopy.splice(indexToRemove, 1);
  //   } else {
  //     // Select
  //     selectedContactsCopy.push(index);
  //   }
  //   setSelectedContacts(selectedContactsCopy);
  // };

  const handleContactSelection = (id) => {
    const selectedContactsCopy = [...selectedContacts];
    if (selectedContactsCopy.includes(id)) {
      // Deselect
      const indexToRemove = selectedContactsCopy.indexOf(id);
      selectedContactsCopy.splice(indexToRemove, 1);
    } else {
      // Select
      selectedContactsCopy.push(id);
    }
    console.log("SelectedContactsCopy: ", selectedContactsCopy);
    setSelectedContacts(selectedContactsCopy);
  };

  const addToGroup = () => {
    // if (selectedContacts.length === 0 || !selectedGroup) {
    // return;
    console.log("Selected Contacts", selectedContacts);
    console.log("Selected Group: ", selectedGroup);
    if (selectedGroup) {
      groupService
        .addToGroup(selectedGroup, selectedContacts)
        .then((response) => {
          console.log("response: ", response);
          fetchContactData();
          NotificationManager.success(
            "Contacts added to group successfully!",
            "Success!"
          );
        })
        .catch((error) => {
          console.log(error);
          NotificationManager.error(
            "Error while adding contacts to group",
            "Error!"
          );
        });
    } else {
      alert("Please select a Group");
    }

    // }
  };

  // useEffect(() => {
  //   fetchContactData();
  // }, []);

  const hideModal = () => {
    setShow(false);
  };

  const userModal = async (user, editMode) => {
    console.log(user);
    if (user && user.firstName) {
      console.log("user - edit", user);
      await setContactData(user);
      await setModalIsOpen(true);

      // console.log(contactData, "+");
      await setIsEditMode(editMode);
    }
  };

  const reloadCallback = () => {
    console.log("reloadCallback");
    fetchContactData();
  };

  const handleDelete = (id, name) => {
    const choice = window.confirm("Do you want to delete '" + name + "' ?");
    if (choice) {
      deleteAction(id);
    }
  };

  const deleteAction = async (id) => {
    console.log("Inside deleteAction");
    contactService
      .deleteContact(id)
      .then(async (response) => {
        console.dir(response);
        fetchContactData();
        NotificationManager.success(
          "Contact Deleted Successfully!",
          "Success!"
        );
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while deleting Contact");
      });
  };

  const handleChange = (event) => {
    console.log("inside csv upload");
    setCsvfile(event.target.files[0]);
  };

  const importCSV = async () => {
    console.log("Inside import Csv");
    
    let data = new FormData();
    data.append("file", csvfile);
   
    contactService.csvUpload(data).then(async (response) => {
      console.log(response);
      setCsvfile("")
      fetchContactData();
      NotificationManager.success(response.data.message);
      setKey(Date.now());
    })
    .catch((error) => {
      console.log(error);
      NotificationManager.error(error.response.data.error);
      setKey(Date.now());
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

      <div className="row" id="content_area">
        <div className="col-md-4">
          <select
            className="form-select"
            name="group"
            onChange={(e) => setSelectedGroup(e.target.value)}
            value={selectedGroup}
          >
            <option value="">Select Group</option>
            {/* {groups.map((group) => ( */}
            {Array.isArray(groups) &&
              groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.groupName}
                </option>
              ))}
          </select>
        </div>
        <div className="col-md-4">
         
          <button className="btn btn-primary" onClick={addToGroup}>
            Add to Group
          </button>
        </div>
      </div>
      <div className="row" id="content_area">
        <div className="col-md-4"></div>
      </div>
      <br></br>

      <div className="row" id="content_area">
        <div className="col-md-4">
          <input
            className="csv-input"
            type="file"
            name="file"
            key={key}
            onChange={handleChange}
          ></input>
          </div>
          <div className="col-md-4">
          <button className="btn btn-primary" onClick={importCSV}>
            Bulk Upload
          </button>
          {/* </div> */}
        </div>
      </div>

       <div className="row" id="content_area">
        <div className="col-md-4"></div>
      </div> 
      <br></br>
      <br></br>

      <table className="table table-hover">
        <thead>
          <tr>
            {/* <th>Name</th> */}
            {/* <th>Address</th> */}
            {/* <th>Status</th> */}
            <th></th>
            <th>Contact Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-border-bottom-0">
          {data.map((item, index) => {
            return (
              <tr
                key={item.id}
                onClick={() => setSelectedRow(item.id)}
                className={"clickable-row".concat(
                  selectedRow === item.id ? "selected" : ""
                )}
              >
                <td>
                  <input
                    type="checkbox"
                    // onChange={() => handleContactSelection(index)}
                    // checked={selectedContacts.includes(index)}
                    onChange={() => handleContactSelection(item.id)}
                    checked={selectedContacts.includes(item.id)}
                  />
                </td>
                <td>{item.firstName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>

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
                      handleDelete(item.id, item.firstName);
                    }}
                  >
                    <i className="menu-icon tf-icons bx bx-trash"></i>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* </div> */}
      {/* </div> */}

      <Modal
        show={show}
        isOpen={modalIsOpen && contactData}
        handleClose={hideModal}
        id="exLargeModal"
        data={{ title: modalTitle }}
      >
        <CreateEditContact
          isEdit="true"
          user={contactData}
          reloadCallback={reloadCallback}
          showUpdateButton={isEditMode}
        />
      </Modal>
    </>
  );
};

export default ContactList;
