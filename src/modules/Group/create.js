import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useForm } from "react-hook-form";
import ActionButtonGroup from "../Employee/components/ActionButtonGroup";
import { NotificationManager } from "react-notifications";
import groupService from "../../services/groupService";
// import contactService from "../../services/contactService";

const CreateEditGroup = ({
  name,
  user,
  isEdit,
  reloadCallback,
  showUpdateButton,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  // const [contacts, setContacts] = useState([]);
  // const [selectedContacts, setSelectedContacts] = useState([]);

  useEffect(() => {
    console.log("isEdit", isEdit);
    if (isEdit && user && user.groupName) {
      console.log("groupName ", user.groupName);
      setValue("groupName", user.groupName);
      setValue("description", user.description);
    }
  }, [isEdit, user, setValue]);

  // useEffect(() => {
  //   async function fetchContacts() {
  //     try {
  //       const response = await contactService.getContact();
  //       console.log(response.data.data);
  //       setContacts(response.data.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchContacts();
  // }, []);

  // const handleContactSelection = (selectedContacts) => {
  //   console.log("selected contacts", selectedContacts);
  //   setSelectedContacts(selectedContacts);
  //   console.log("after setting", selectedContacts);
  // };

  const onSubmitHandler = async (data) => {
    console.log(data);
    try {
      if (data.status === "1") data.status = true;
      else data.status = false;

      if (isEdit && user && user.id) {
        await updateFormData(user.id, data);
      } else {
        await saveFormData(data);
      }
    } catch (error) {
      alert(`Registration failed! ${error.message}`);
      console.error("Form submission error:", error);
    }
  };
  const saveFormData = async (data) => {
    groupService
      .createGroup(data)
      .then(async (response) => {
        console.log(response);
       
        // NotificationManager.success("Added new Group!", "Success", 2000);
        if (response.data.status === 409){
          NotificationManager.error(response.data.message, "Error!", 2500)
        } else if (response.data.status === 500) {
          NotificationManager.error('Internal server error', "Error!", 2500);
        } else {
          NotificationManager.success(response.data.message, "Success!", 2500);
          reset();
        }
      
      })
      .catch((error) => {
        console.log(error);
        // NotificationManager.error("Error while creating new Group!", "Error");
        NotificationManager.error(`${error.response.data.error}`, "Error!", 2500);
      });
  };

  const updateFormData = async (userId, data) => {
    data.id = userId;
    groupService
      .updateGroup(data, userId)
      .then(() => {
        NotificationManager.success("Updated Group!", "Success", 2000);
        reloadCallbackFn();
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while updating Group!", "Error!");
      });
  };

  const resetCallback = () => {
    reset();
  };
  const reloadCallbackFn = () => {
    reloadCallback();
  };

  return (
    <div>
      <>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3 row">
                    <label
                      htmlFor="groupName"
                      className="col-md-4 col-form-label"
                    >
                      Group Name
                    </label>
                    <div className="col-md-8">
                      <input
                        className="form-control"
                        type="text"
                        id="groupName"
                        {...register("groupName", {
                          required: "true",
                        })}
                      />
                      {errors.groupName && (
                        <div
                          className="text-danger"
                          style={{ marginTop: "0.25rem", fontSize: "80%" }}
                        >
                          Group name is required
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3 row">
                    <label
                      htmlFor="description"
                      className="col-md-4 col-form-label"
                    >
                      Group Description
                    </label>
                    <div className="col-md-8">
                    <textarea
                      className="form-control"
                      rows="1"
                      id="description"
                      {...register("description", { required: true })}
                    />
                    {errors.description && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        Group description is required
                      </div>
                    )}
                  </div>
                  </div>
                </div>
              </div>

              {/* {showUpdateButton ? ( */}
              <ActionButtonGroup
                isEdit={isEdit}
                resetCallback={resetCallback}
                submitting={false}
              />
              {/* ) : null}  */}
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default CreateEditGroup;

///// ================================================================================

// import React, { useEffect, useState } from "react";
// import { MultiSelect } from "react-multi-select-component";
// import { NotificationManager } from "react-notifications";
// import groupService from "../../services/groupService";
// import contactService from "../../services/contactService";
// import ActionButtonGroup from "../Employee/components/ActionButtonGroup";

// const CreateEditGroup = ({
//   name,
//   user,
//   isEdit,
//   reloadCallback,
//   showUpdateButton,
// }) => {
//   const [groupName, setGroupName] = useState("");
//   // const [contacts, setContacts] = useState([]);
//   // const [selectedContacts, setSelectedContacts] = useState([]);
//   const []
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   useEffect(() => {
//     console.log("isEdit", isEdit);
//     if (isEdit && user && user.groupName) {
//       console.log("groupName ", user.groupName);
//       const groupName = user.groupName;
//       const selectedContacts = user.selectedContacts;
//       setGroupName(groupName);
//       console.log("*", groupName);
//       console.log("/", selectedContacts);
//       setSelectedContacts(selectedContacts);
//       console.log("selectedContacts", selectedContacts)
//     }
//   }, [isEdit, user]);

//   useEffect(() => {
//     async function fetchContacts() {
//       try {
//         const response = await contactService.getContact();
//         console.log(response.data.data);
//         setContacts(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     fetchContacts();
//   }, []);

//   const handleContactSelection = (selectedContacts) => {

//     console.log("selected contacts", selectedContacts);
//     setSelectedContacts(selectedContacts);
//     console.log("after setting", selectedContacts);
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     setFormSubmitted(true);
//     console.log(groupName, selectedContacts);
//     if (!groupName || selectedContacts.length === 0) {
//       return;
//     }

//     try {
//       const data = {
//         groupName,
//         selectedContacts: selectedContacts.map(contact => contact.value),
//         status: "1", // You might need to adjust this based on your logic
//       };

//       if (isEdit && user && user.id) {
//         await updateFormData(user.id, data);
//       } else {
//         await saveFormData(data);
//       }
//     } catch (error) {
//       alert(`Registration failed! ${error.message}`);
//       console.error("Form submission error:", error);
//     }
//   };

//   const saveFormData = async (data) => {
//     groupService
//       .createGroup(data)
//       .then(async (response) => {
//         console.log(response);
//         setGroupName("");
//         setSelectedContacts([]);
//         NotificationManager.success("Added new Group!", "Success", 2000);
//       })
//       .catch((error) => {
//         console.log(error);
//         NotificationManager.error("Error while creating new Group!", "Error");
//       });
//   };

//   const updateFormData = async (userId, data) => {
//     data.id = userId;
//     groupService
//       .updateGroup(data, userId)
//       .then(() => {
//         NotificationManager.success("Updated Group!", "Success", 2000);
//         reloadCallbackFn();
//       })
//       .catch((error) => {
//         console.log(error);
//         NotificationManager.error("Error while updating Group!", "Error!");
//       });
//   };

//   const resetCallback = () => {
//     setGroupName("");
//     setSelectedContacts([]);
//   };

//   const reloadCallbackFn = () => {
//     reloadCallback();
//   };

//   return (
//     <div>
//       <>
//         <form onSubmit={onSubmitHandler}>
//           <div className="card mb-4">
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-4">
//                   <div className="mb-3 row">
//                     <label
//                       htmlFor="groupName"
//                       className="col-md-4 col-form-label"
//                     >
//                       Group Name
//                     </label>
//                     <div className="col-md-8">
//                       <input
//                         className="form-control"
//                         type="text"
//                         id="groupName"
//                         value={groupName}
//                         onChange={(e) => setGroupName(e.target.value)}
//                         required
//                       />
//                       {formSubmitted && !groupName.length===0 && (
//                         <div
//                           className="text-danger"
//                           style={{ marginTop: "0.25rem", fontSize: "80%" }}
//                         >
//                           Group name is required
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <div className="mb-3 row">
//                     <label
//                       htmlFor="selectedContacts"
//                       className="col-md-4 col-form-label"
//                     >
//                       Select Contacts
//                     </label>
//                     <div className="col-md-8">
//                       {contacts.length > 0 && (
//                         <MultiSelect
//                           options={contacts.map((contact) => ({
//                             label: contact.firstName,
//                             value: contact.id,
//                           }))}
//                           value={selectedContacts}
//                           onChange={handleContactSelection}
//                           labelledBy="Select"
//                           hasSelectAll={true}
//                         />
//                       )}
//                       {formSubmitted && !selectedContacts.length === 0 && (
//                         <div
//                           className="text-danger"
//                           style={{ marginTop: "0.25rem", fontSize: "80%" }}
//                         >
//                           Please select contacts
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <ActionButtonGroup
//               isEdit={isEdit}
//               resetCallback={resetCallback}
//               submitting={false}
//             />
//           </div>
//         </form>
//       </>
//     </div>
//   );
// };

// export default CreateEditGroup;
