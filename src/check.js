import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { Modal } from "@mui/material";
import ActionButtonGroup from "../../Employee/components/ActionButtonGroup";
import campaignService from "../../../services/campaignService";
import templateService from "../../../services/templateService";
import contactService from "../../../services/contactService";
import TextEditor from "../../RichTextEditor/textEditor";
import { NotificationManager } from "react-notifications";

const Campaign = ({ user, isEdit, reloadCallback, showUpdateButton }) => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  // const editorRef = useRef();
  const [templates, setTemplates] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [selectedTemplateContent, setSelectedTemplateContent] = useState("");

  const [selectedContacts, setSelectedContacts] = useState([]);

  const messageValue = watch("message", "");
  const [message, setMessage] = useState("");

  const handleEditorChange = (content) => {
    setValue("message", content, {
      shouldValidate: true,
      shouldDirty: true,
    }); // Set form field value with validation and dirty state
  };

  // const handleContactChange = (contactId) => {
  //   const updatedContacts = selectedContacts.includes(contactId)
  //   ? selectedContacts.filter(id => id ! == contactId)

  // }
  async function fetchTemplate() {
    try {
      templateService.getTemplate().then(async (result) => {
        console.log(result.data.data);
        await setTemplates(result.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchContact() {
    try {
      contactService.getContact().then(async (result) => {
        console.log(result.data.data);
        await setContacts(result.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTemplateById(selectedTemplateId) {
    try {
      templateService.getTemplateId(id).then(async (result) => {
        console.log(result.data);
        await setMessage(result.data.content);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTemplate();
    fetchContact();
  }, []);

  // useEffect(() => {
  //   if (selectedTemplateId) {
  //     fetchTemplateById();
  //   }
  // }, [selectedTemplateId]);


  const handleTemplateChange = async(e) => {
    const templateId = e.target.value;
    setSelectedTemplateId(templateId);
    // fetchTemplateById();
    try {
      const templateContent = await fetchTemplateById(templateId);
      setSelectedTemplateContent(templateContent);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit && user) {
      setValue("from", user.from);
      setValue("to", user.to);
      setValue("campaignName", user.campaignName);
      setValue("frequency", user.frequency);
      setValue("startDate", user.startDate);
      setValue("endDate", user.endDate);
      setValue("selectedTemplate", user.template);
      setValue("content", user.message);
    }
  }, [isEdit, user, setValue]);

  const onSubmitHandler = async (data) => {
    try {
      if (data.status === "1") data.status = true;
      else data.status = false;

      if (isEdit && user && user.id) {
        await updateFormData(user.id, data);
      } else {
        await saveFormData(data);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const saveFormData = async (data) => {
    campaignService
      .createCampaign(data)
      .then(() => {
        reset();
        NotificationManager.success("Added new Campaign!", "Success!", 2000);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          "Error while creating new Campaign!",
          "Error"
        );
      });
  };

  const updateFormData = async (userId, data) => {
    // data.id = userId;
    campaignService
      .updateCampaign(userId,data)
      .then(() => {
        NotificationManager.success("Updated Campaign!", "Success!", 2000);
        reloadCallbackFn();
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while updating Campaign!", "Error!");
      });
  };

  const resetCallback = () => {
    reset(); // Reset the form fields
  };

  const reloadCallbackFn = () => {
    reloadCallback();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            {/* First Row */}
            <div className="col">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">From</label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    type="text"
                    id="from"
                    value="Sender's Name"
                    disabled
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">To</label>
                <div className="col-md-8">
                  <select
                    className="form-select"
                    name="to"
                    {...register("to")}
                  >
                    <option value="">Select contacts</option>
                    {contacts.map((contact) => (
                      <option key={contact.id} value={contact.id}>
                        {contact.firstName}
                      </option>
                    ))}
                  </select>
                  {/* {contacts.map((contact) => (
                    <div key={contact.id}>
            <input 
            type="checkbox"
            value={contact.id}
            checked={}
                  ))}
                  
                  {errors.toAddress && (
                    <div
                      className="text-danger"
                      style={{ marginTop: "0.25rem", fontSize: "80%" }}
                    >
                      {errors.toAddress.message}
                    </div>
                  )} */}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">Start Date</label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    type="date"
                    {...register("startDate", {
                      required: "StartDate is required",
                    })}
                  />
                  {errors.startDate && (
                    <div
                      className="text-danger"
                      style={{ marginTop: "0.25rem", fontSize: "80%" }}
                    >
                      {errors.startDate.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">End Date</label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    type="date"
                    {...register("endDate", {
                      required: "End Date is required",
                    })}
                  />
                  {errors.endDate && (
                    <div
                      className="text-danger"
                      style={{ marginTop: "0.25rem", fontSize: "80%" }}
                    >
                      {errors.endDate.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Second Row */}
            <div className="col">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">Campaign Name</label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    type="text"
                    {...register("campaignName", {
                      required: "Campaign Name is required",
                    })}
                  />
                  {errors.campaignName && (
                    <div
                      className="text-danger"
                      style={{ marginTop: "0.25rem", fontSize: "80%" }}
                    >
                      {errors.campaignName.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Campaign Frquency
                </label>
                <div className="col-md-8">
                  <select
                    className="form-select"
                    name="frequency"
                    {...register("frequency")}
                  >
                    <option value="">Select campaign frquency</option>
                    <option value="1">Weekly</option>
                    <option value="2">Weekly twice</option>
                    <option value="3">Monthly</option>
                    <option value="4">Monthly twice</option>
                  </select>
                  {errors.startDate && (
                    <div
                      className="text-danger"
                      style={{ marginTop: "0.25rem", fontSize: "80%" }}
                    >
                      {errors.startDate.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="template" className="col-md-4 col-form-label">Template</label>
                <div className="col-md-8">
                  <select
                    className="form-select"
                    name="template"
                    // value={selectedTemplateId}
                    // onChange={handleTemplateChange}
                    {...register("template")}
                  >
                    <option value="">Select a template</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="col-md-4 col-form-label">Message</label>
            {/* <ReactQuill
              // value={message}
              theme="snow"
              className="form-control"
              modules={{ toolbar: toolbarOptions }}
              placeholder='Compose here'
              style={{ color: "black" }}
              {...register("message", {
                required: "Campaign message required",
              })}
              onChange={handleEditorChange}
              onBlur={() => {}}
              ref={editorRef}
            />
            {errors.message && (
              <div
                className="text-danger"
                style={{ marginTop: "0.25rem", fontSize: "80%" }}
              >
                {errors.message.message}
              </div>
            )} */}

            <div >
              <TextEditor 
               initialValue={selectedTemplateContent} // Pass the selected template content
               onEditorChange={handleEditorChange} // Pass the change handler
              //  {...register("message", {
              //   required: "Campaign message required",
              // })}
              >

              </TextEditor>
            </div>
          </div>
        </div>
      </div>
      <br></br>

      {/* {showUpdateButton ? ( */}
      <ActionButtonGroup
        isEdit={isEdit}
        resetCallback={resetCallback}
        submitting={false}
      />
      {/* ) : null} */}
    </form>
  );
};

export default Campaign;
