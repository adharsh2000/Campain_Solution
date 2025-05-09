import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Modal } from "@mui/material";
import ActionButtonGroup from "../Employee/components/ActionButtonGroup";
import campaignService from "../../services/campaignService";
import templateService from "../../services/templateService";
import groupService from "../../services/groupService";
import { NotificationManager } from "react-notifications";
import EmailEditor from "react-email-editor";

const EmailCampaign = ({ user, isEdit, reloadCallback, showUpdateButton }) => {
  const INITIAL_STATE = {
    from: "",
    to: "",
    startDate: "",
    endDate: "",
    campaignName: "",
    frequency: "",
    template: "",
    message: "",
  };

  const emailEditorRef = useRef();
  const [form, setForm] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);
  // const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [editorLoaded, setEditorLoaded] = useState(false);
 

  // const toolbarOptions = [
  //   ["bold", "italic", "underline", "strike", "blockquote"],
  //   [{ header: 1 }],
  //   [{ list: "ordered" }, { list: "bullet" }],
  //   [{ indent: "-1" }, { indent: "+1" }],
  //   [{ size: ["small", false, "large", "huge"] }],
  //   [{ color: [] }, { background: [] }],
  //   [{ font: [] }],
  //   [{ align: [] }],
  //   ["link", "image"],
  // ];
  const onEditorLoad = () => {
    setEditorLoaded(true);
  };

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const result = await templateService.getTemplate();
        console.log(result.data.data);
        setTemplates(result.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchContact() {
      try {
        const result = await groupService.getGroup();
        console.log(result.data.data);
        setGroups(result.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchTemplate();
    fetchContact();
  }, []);

  const handleTemplateChange = async (templateId) => {
    try {
      const templateContent = await fetchTemplateById(templateId);
      console.log(templateId);
      console.log("template content: ", templateContent);
      // await setSelectedTemplateId(templateId);
      await setEditorContent(templateContent);
      setSelectedTemplate(templateContent);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchTemplateById(selectedTemplateId) {
    try {
      console.log(selectedTemplateId);
      const result = await templateService.getTemplateId(selectedTemplateId);

      console.log(result.data.data.content);
      return result.data.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // const handleMessageEdit = (content) => {
  //   setEditorContent(content);
  //   setForm({
  //     ...form,
  //     message: content,
  //   });
  // };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // setSubmitting(true);

    if (!editorLoaded) {
      return;
    }

    const design = await emailEditorRef.current.editor.exportHtml();
    console.log(design)
    const formData = new FormData(event.target);
    formData.append('design', design);

    console.dir(formData);
    try {
      if (isEdit && user && user.id) await updateFormData(user.id, formData);
      else await saveFormData(formData);
    } catch (error) {
      alert(`Registration failed! ${error.message}`);
    }
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      // message: editorContent,
      [event.target.id]: event.target.value,
    });
  };

  const saveFormData = async (form) => {
    // console.dir(form);
    console.log("Form:", form);

    campaignService
      .createCampaign(form)
      .then(async (response) => {
        console.log(response);
        await setSubmitting(false);
        await setForm(INITIAL_STATE);
        NotificationManager.success("Added a new campaign!", "Success!", 2000);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          "Error while creating new campaign!",
          "Error!"
        );
      });
  };

  const updateFormData = async (userId) => {
    console.dir(form);
    form.id = userId;
    campaignService
      .updateCampaign(userId, form)
      .then(async (response) => {
        console.dir(response);
        await setSubmitting(false);
        NotificationManager.success(
          "Updated campaign successfully!",
          "Success!",
          2000
        );
        reloadCallbackFn();
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          "Error while creating updating campaign!",
          "Error!"
        );
      });
  };

  const resetCallback = () => {
    console.log("resetCallback");
    setForm(INITIAL_STATE);
  };

  useEffect(() => {
    console.log("isEdit " + isEdit);
    if (isEdit && user && user.id) {
      console.log("isEdit " + isEdit);
      console.log("USER: ", user);
      console.log("USER MEESAGE:", user.message);
      setForm({
        from: user.from,
        to: user.to,
        startDate: user.startDate,
        endDate: user.endDate,
        campaignName: user.campaignName,
        frequency: user.frequency,
        template: user.template,
        message: user.message,
      });
    }
  }, [isEdit, user]);

  const reloadCallbackFn = () => {
    reloadCallback();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            {/* First Row */}
            <div className="col">
              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">Sender</label>
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
                <label className="col-md-4 col-form-label">Recipient</label>
                <div className="col-md-8">
                  <select
                    className="form-select"
                    name="to"
                    id="to"
                    value={form.to}
                    onChange={handleChange}
                  >
                    <option value="">Select groups</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.groupName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">Start Date</label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">End Date</label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                  />
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
                    name="campaignName"
                    id="campaignName"
                    value={form.campaignName}
                    onChange={handleChange}
                  />
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
                    id="frequency"
                    value={form.frequency}
                    onChange={handleChange}
                  >
                    <option value="">Select campaign frequency</option>
                    <option value="1">Weekly</option>
                    <option value="2">Weekly twice</option>
                    <option value="3">Monthly</option>
                    <option value="4">Monthly twice</option>
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="template" className="col-md-4 col-form-label">
                  Template
                </label>
                <div className="col-md-8">
                  <select
                    className="form-select"
                    name="template"
                    id="template"
                    value={form.template}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target && e.target.value)
                        handleTemplateChange(e.target.value);
                    }}

                    // onChange={handleChange}
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

            <EmailEditor
              ref={emailEditorRef}
              onLoad={() => setEditorLoaded(true)}
            />
          </div>
        </div>
      </div>
      <br />

      <ActionButtonGroup
        isEdit={isEdit}
        resetCallback={resetCallback}
        isSubmit={submitting}
      />
    </form>
  );
};

export default EmailCampaign;
