import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "../../features/ui/modal/modal";
import { NotificationManager } from "react-notifications";
import CreateEditGroup from "./create";
import groupService from "../../services/groupService";
import ContactGroupList from "./contactGroupList";

const GroupList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [modalTitle, setModalTitle] = useState([]);
  const [groupData, setGroupData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [groupTitle, setGroupTitle] = useState();
  const [flag, setFlag] = useState(false);
  const [showList, setShowList] = useState(false);
  const [obj, setObj] = useState({});

  async function fetchGroupData() {
    groupService
      .getGroup()
      .then(async (response) => {
        console.log(response.data.data, "data");
        await setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error whiel fetching Groups!");
      });
  }

  useEffect(() => {
    fetchGroupData();
  }, []);

  const hideModal = () => {
    setShow(false);
    fetchGroupData()
  };

  const userModal = async (user, editMode) => {
    setFlag(false);
    console.log(user);
    if (user && user.groupName) {
      console.log("user", user);
      await setGroupData(user);
      console.log("groupData", groupData);
      await setModalIsOpen(true);
      console.log(groupData, "+");
      await setIsEditMode(editMode);
    }
  };

  const reloadCallback = () => {
    console.log("reloadCallback");
    fetchGroupData();
  };

  const handleDelete = (id, name) => {
    const choice = window.confirm("Do you want to delete '" + name + "' ?");
    if (choice) {
      deleteAction(id);
    }
  };

  const deleteAction = async (id) => {
    console.log("Inside deleteAction");
    groupService
      .deleteGroup(id)
      .then(async (response) => {
        console.dir(response);
        fetchGroupData();
        NotificationManager.success(response.data.message);
      })
      .catch((error) => {
        console.log(error);
        // NotificationManager.error("Error while deleting Group");
        NotificationManager.error(error.message);
      });
  };

  // const handleContacts = (groupData) => {
  //   console.log("GroupData:", groupData);
  //   setFlag(true);
  //   setContacts(groupData.contactEmails);
  //   setGroupTitle(groupData.groupName);
  //   setObj(groupData)
  // };
  const handleContacts = async (id) => {
    console.log("groupId:", id);

    await groupService.getContactsfromGroups(id)?.then(async (response) => {
      setFlag(true);
      console.log(response?.data?.data);
      setObj(response?.data?.data);
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
              <th>Group Name</th>
              <th>Description</th>
              <th>Contacts Count</th>
              <th>View Contacts</th>
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
                  <td>{item.groupName}</td>
                  <td>{item.description}</td>
                  <td>{item.contactCount}</td>
                  <td>
                    <span
                      onClick={() => {
                        handleContacts(item.id);
                        // <ContactGroupList emails={item.contactEmails} />
                      }}
                      data-bs-toggle="modal"
                      data-bs-target="#exLargeModal"
                    >
                      <i class="menu-icon tf-icons bx bx-show"></i>
                      {/* {flag ? 
                      <Modal
                        show={show}
                        isOpen={modalIsOpen && contacts}
                        handleClose={hideModal}
                        id="exLargeModal"
                        data={{ title:groupTitle}}
                      >{item.contactEmails}</Modal>
                      : ""} */}
                    </span>
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
                    <span
                      onClick={() => {
                        handleDelete(item.id, item.groupName);
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
      {!flag ? (
        <Modal
          show={show}
          isOpen={modalIsOpen && groupData}
          handleClose={hideModal}
          id="exLargeModal"
          data={{ title: modalTitle }}
        >
          <CreateEditGroup
            isEdit={true}
            user={groupData}
            reloadCallback={reloadCallback}
            showUpdateButton={isEditMode}
          />
        </Modal>
      ) : (
        <Modal
          show={show}
          isOpen={modalIsOpen && contacts}
          handleClose={hideModal}
          id="exLargeModal"
          data={{ title: groupTitle }}
        >
          <ContactGroupList contacts={obj}/>
        </Modal>
      )}
    </>
  );
};

export default GroupList;
