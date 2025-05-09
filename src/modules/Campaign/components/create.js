// import React, { useState, useEffect, useRef } from "react";
// import { useForm } from "react-hook-form";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { Modal } from "@mui/material";
// import ActionButtonGroup from "../../Employee/components/ActionButtonGroup";
// import campaignService from "../../../services/campaignService";
// import templateService from "../../../services/templateService";
// import groupService from "../../../services/groupService";
// import { NotificationManager } from "react-notifications";

// const Campaign = ({ user, isEdit, reloadCallback, showUpdateButton }) => {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     setValue,
//   } = useForm();
//   const editorRef = useRef(null);
//   useEffect(() => {
//     if (isEdit && user) {
//       console.log("USER MESSAGE: ", user.message);
//       setValue("from", user.from);
//       setValue("to", user.to);
//       setValue("startDate", user.startDate);
//       setValue("endDate", user.endDate);
//       setValue("campaignName", user.campaignName);
//       setValue("frequency", user.frequency);
//       setValue("template", user.template);
//       setValue("message", user.message);
//       // setEditorContent(selectedTemplate.message);
//     }
//   }, [isEdit, user, setValue]);

//   const [submitting, setSubmitting] = useState(false);
//   const [groups, setGroups] = useState([]);
//   const [templates, setTemplates] = useState([]);
//   // const [selectedTemplateId, setSelectedTemplateId] = useState("");
//   const [editorContent, setEditorContent] = useState("");
//   const [selectedTemplate, setSelectedTemplate] = useState("");

//   const toolbarOptions = [
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [{ header: 1 }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ size: ["small", false, "large", "huge"] }],
//     [{ color: [] }, { background: [] }],
//     [{ font: [] }],
//     [{ align: [] }],
//     ["link", "image"],
//   ];

//   useEffect(() => {
//     async function fetchTemplate() {
//       try {
//         const result = await templateService.getTemplate();
//         console.log(result.data.data);
//         setTemplates(result.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     async function fetchContact() {
//       try {
//         const result = await groupService.getGroup();
//         console.log(result.data.data);
//         setGroups(result.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     fetchTemplate();
//     fetchContact();
//   }, []);

//   async function fetchTemplateById(selectedTemplateId) {
//     try {
//       console.log(selectedTemplateId);
//       const result = await templateService.getTemplateId(selectedTemplateId);
//       console.log(result.data.data.content);
//       return result.data.data.content;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   const handleTemplateChange = async (templateId) => {
//     try {
//       const templateContent = await fetchTemplateById(templateId);
//       console.log(templateId);
//       console.log("template content: ", templateContent);
//       // await setSelectedTemplateId(templateId);
//       setEditorContent(templateContent);
//       setSelectedTemplate(templateContent);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleMessageEdit = (content) => {
//     console.log("Content: ", content);
//     setEditorContent(content);
//   };

//   const onSubmitHandler = async (data) => {
//     console.log("***********");
//     console.log("Onsubmit:", data);
//     try {
//       if (isEdit && user && user.id) await updateFormData(user.id, data);
//       else await saveFormData(data);
//     } catch (error) {
//       alert(`Registration failed! ${error.message}`);
//     }
//   };

//   const saveFormData = async (data) => {
//     console.log("Form:", data);
//     campaignService
//       .createCampaign(data)
//       .then(async (response) => {
//         console.log(response);
//         setSubmitting(false);
//         reset();

//         NotificationManager.success("Added a new campaign!", "Success!", 2000);
//       })
//       .catch((error) => {
//         console.log(error);
//         NotificationManager.error(
//           "Error while creating new campaign!",
//           "Error!"
//         );
//       });
//   };

//   const updateFormData = async (userId, data) => {
//     console.log(data);
//     data.id = userId;
//     campaignService
//       .updateCampaign(userId, data)
//       .then(async (response) => {
//         console.dir(response);
//         await setSubmitting(false);
//         NotificationManager.success(
//           "Updated campaign successfully!",
//           "Success!",
//           2000
//         );
//         reloadCallbackFn();
//       })
//       .catch((error) => {
//         console.log(error);
//         NotificationManager.error(
//           "Error while creating updating campaign!",
//           "Error!"
//         );
//       });
//   };

//   const resetCallback = () => {
//     console.log("resetCallback");
//     reset();
//   };

//   const reloadCallbackFn = () => {
//     reloadCallback();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmitHandler)}>
//       <div className="card mb-4">
//         <div className="card-body">
//           <div className="row">
//             {/* First Row */}
//             <div className="col">
//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">Sender</label>
//                 <div className="col-md-8">
//                   <input
//                     className="form-control"
//                     type="text"
//                     id="from"
//                     // value="Sender's Name"
//                     {...register("Sender", {})}
//                     disabled
//                   />
//                 </div>
//               </div>

//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">Recipient</label>
//                 <div className="col-md-8">
//                   <select
//                     className="form-select"
//                     name="to"
//                     id="to"
//                     {...register("to", {
//                       required: "true",
//                     })}
//                   >
//                     <option value="">Select groups</option>
//                     {groups.map((group) => (
//                       <option key={group.id} value={group.id}>
//                         {group.groupName}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.to && (
//                     <div
//                       className="text-danger"
//                       style={{ marginTop: "0.25rem", fontSize: "80%" }}
//                     >
//                       Recipient is required
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">Start Date</label>
//                 <div className="col-md-8">
//                   <input
//                     className="form-control"
//                     type="date"
//                     name="startDate"
//                     id="startDate"
//                     {...register("startDate", {
//                       required: "true",
//                     })}
//                   />
//                   {errors.startDate && (
//                     <div
//                       className="text-danger"
//                       style={{ marginTop: "0.25rem", fontSize: "80%" }}
//                     >
//                       Start Date is required
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">End Date</label>
//                 <div className="col-md-8">
//                   <input
//                     className="form-control"
//                     type="date"
//                     name="endDate"
//                     id="endDate"
//                     {...register("endDate", {
//                       required: "true",
//                     })}
//                   />
//                   {errors.endDate && (
//                     <div
//                       className="text-danger"
//                       style={{ marginTop: "0.25rem", fontSize: "80%" }}
//                     >
//                       End Date is required
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Second Row */}
//             <div className="col">
//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">Campaign Name</label>
//                 <div className="col-md-8">
//                   <input
//                     className="form-control"
//                     type="text"
//                     name="campaignName"
//                     id="campaignName"
//                     {...register("campaignName", {
//                       required: "true",
//                     })}
//                   />
//                   {errors.campaignName && (
//                     <div
//                       className="text-danger"
//                       style={{ marginTop: "0.25rem", fontSize: "80%" }}
//                     >
//                       Campaign Name is required
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">
//                   Campaign Frquency
//                 </label>
//                 <div className="col-md-8">
//                   <select
//                     className="form-select"
//                     name="frequency"
//                     id="frequency"
//                     {...register("frequency", {
//                       required: "true",
//                     })}
//                   >
//                     <option value="">Select campaign frequency</option>
//                     <option value="1">Weekly</option>
//                     <option value="2">Weekly twice</option>
//                     <option value="3">Monthly</option>
//                     <option value="4">Monthly twice</option>
//                   </select>
//                   {errors.frequency && (
//                     <div
//                       className="text-danger"
//                       style={{ marginTop: "0.25rem", fontSize: "80%" }}
//                     >
//                       Frequency is required
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-3 row">
//                 <label htmlFor="template" className="col-md-4 col-form-label">
//                   Template
//                 </label>
//                 <div className="col-md-8">
//                   <select
//                     className="form-select"
//                     name="template"
//                     id="template"
//                     // value={form.template}
//                     value={selectedTemplate.id}
//                     {...register("template")}
//                     // onChange={
//                     //   (e) => {
//                     //   handleChange(e);
//                     //   if (e.target && e.target.value)
//                     //     handleTemplateChange(e.target.value);
//                     // }}

//                     onChange={(e) => handleTemplateChange(e.target.value)}
//                   >
//                     <option value="">Select a template</option>
//                     {templates.map((template) => (
//                       <option key={template.id} value={template.id}>
//                         {template.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="col-md-4 col-form-label">Message</label>
//             {/* <ReactQuill
//               value={editorContent}
//               id="message"
//               theme="snow"
//               className="form-control"
//               modules={{ toolbar: toolbarOptions }}
//               style={{ color: "black" }}
//               ref={editorRef}
//               // onChange={handleEditorChange}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (e.target && e.target.value) {
//                   handleEditorChange(e.target.value);
//                 }
//               }}
//             /> */}

//             <ReactQuill
//               // value={isEdit == true ? form.message : editorContent}
//               id="message"
//               name="message"
//               value={editorContent}
//               theme="snow"
//               className="form-control"
//               modules={{ toolbar: toolbarOptions }}
//               style={{ color: "black" }}
//               {...register("message", {
//                 required: "true",
//               })}
//               onChange={handleMessageEdit}
//               ref={editorRef}
//             />
//           </div>
//         </div>
//       </div>
//       <br />

//       <ActionButtonGroup
//         isEdit={isEdit}
//         resetCallback={resetCallback}
//         isSubmit={submitting}
//       />
//     </form>
//   );
// };

// export default Campaign;

// ***************************************************************

// import React, { useState, useEffect, useRef } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { Modal } from "@mui/material";
// import ActionButtonGroup from "../../Employee/components/ActionButtonGroup";
// import campaignService from "../../../services/campaignService";
// import templateService from "../../../services/templateService";
// import clientService from "../../../services/clientService";
// import groupService from "../../../services/groupService";
// import { NotificationManager } from "react-notifications";
// // import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-multi-date-picker";
// import { format } from "date-fns";

// const Campaign = ({ user, isEdit, reloadCallback, showUpdateButton }) => {
//   const INITIAL_STATE = {
//     from: "",
//     to: "",
//     // startDate: "",
//     // endDate: "",
//     // dates: [],
//     campaignName: "",
//     frequency: "",
//     template: "",
//     // message: "",
//   };

//   const getEndOfMonth = () => {
//     let date = new Date();
//     let lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
//     return lastDay;
//   };

//   const [form, setForm] = useState(INITIAL_STATE);
//   const [submitting, setSubmitting] = useState(false);
//   const [groups, setGroups] = useState([]);
//   const [templates, setTemplates] = useState([]);
//   // const [selectedTemplateId, setSelectedTemplateId] = useState("");
//   const [editorContent, setEditorContent] = useState("");
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [clientEmail, setClientEmail] = useState("");
//   const [values, setValues] = useState([]);
//   // const [startDate, setStartDate] = useState(new Date());
//   // const [endDate, setEndDate] = useState(getEndOfMonth());
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   const toolbarOptions = [
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [{ header: 1 }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ size: ["small", false, "large", "huge"] }],
//     [{ color: [] }, { background: [] }],
//     [{ font: [] }],
//     [{ align: [] }],
//     ["link", "image"],
//   ];

//   async function fetchClientEmail() {
//     try {
//       const result = await clientService.getClientEmail();
//       setClientEmail(result.data.data.email);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     async function fetchTemplate() {
//       try {
//         const result = await templateService.getTemplate();
//         console.log(result.data.data);
//         setTemplates(result.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }

//     async function fetchContact() {
//       try {
//         const result = await groupService.getGroup();
//         console.log(result.data.data);
//         setGroups(result.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchClientEmail();
//     fetchTemplate();
//     fetchContact();
//   }, []);

//   useEffect(() => {
//     console.log("isEdit " + isEdit);

//     if (isEdit && user && user.id) {
//       console.log("USER: ", user);
//       // setForm(user)
//       // async function fieldSetting() {
//       setForm({
//         from: user.from,
//         to: user.to,
//         // startDate: user.startDate,
//         // endDate: user.endDate,
//         campaignName: user.campaignName,
//         frequency: user.frequency,
//         template: user.template,
//         message: user.message,
//       });
//       setStartDate(user.startDate);
//       setEndDate(user.endDate);

//     }

//   }, [user, isEdit, setForm]);
//   // }, [user]);

//   const handleTemplateChange = async (templateId) => {
//     try {
//       const templateContent = await fetchTemplateById(templateId);
//       console.log(templateId);
//       console.log("template content: ", templateContent);
//       // await setSelectedTemplateId(templateId);
//       setEditorContent(templateContent);
//       setSelectedTemplate(templateContent);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   async function fetchTemplateById(selectedTemplateId) {
//     try {
//       console.log(selectedTemplateId);
//       const result = await templateService.getTemplateId(selectedTemplateId);

//       console.log(result.data.data.content);
//       return result.data.data.content;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   const handleMessageEdit = (content) => {
//     setEditorContent(content);
//     setForm({
//       ...form,
//       message: content,
//     });
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     // setSubmitting(true);

//     console.log(form);
//     try {
//       if (isEdit && user && user.id) await updateFormData(user.id);
//       else await saveFormData(form);
//     } catch (error) {
//       alert(`Registration failed! ${error.message}`);
//     }
//   };

//   const handleChange = (event) => {
//     console.log("event: ", event.target.value);
//     setForm({
//       ...form,
//       // message: editorContent,
//       [event.target.id]: event.target.value,
//       from: clientEmail,
//     });
//   };

//   const saveFormData = async (form) => {
//     console.log("Form:", form);
//     const response = await campaignService.createCampaign(form);
//     console.log(response);
//     setSubmitting(false);
//     if (response.data.status == 201) {
//       // setForm(INITIAL_STATE);
//       resetCallback();
//       NotificationManager.success(response.data.message);
//     } else {
//       console.log(response.data.error);
//       NotificationManager.error(response.data.message);
//     }
//   };

//   //   const updateFormData = async (userId) => {
//   //     console.log(form);
//   //     form.id = userId;
//   //     response = await campaignService
//   //       .updateCampaign(userId, form)

//   //         console.log(response);
//   //          setSubmitting(false);
//   //          if(response.status==200){
//   //           NotificationManager.success(
//   //             response.data.message
//   //           );
//   //           reloadCallbackFn();
//   //          }else{

//   //       }
//   //       // .catch((error) => {
//   //         console.log(error);
//   //         NotificationManager.error(error.response.data.message);
//   // }
//   //         // });
//   //   };
//   const updateFormData = async (userId) => {
//     try {
//       console.log(form);
//       form.id = userId;

//       const response = await campaignService.updateCampaign(userId, form);

//       console.log(response);

//       setSubmitting(false);

//       if (response.data.status === 200) {
//         NotificationManager.success(response.data.message);
//         resetCallback();
//       } else {
//         // Handle other status codes or unexpected responses
//         NotificationManager.error(response.data.error);
//       }
//     } catch (error) {
//       console.error("Error updating campaign:", error);
//       NotificationManager.error(
//         "Failed to update campaign. Please try again later."
//       );
//     }
//   };

//   const resetCallback = () => {
//     console.log("resetCallback");
//     setForm(INITIAL_STATE);
//     setStartDate(null);
//     setEndDate(null);
//     setEditorContent(null);


//   };

//   const reloadCallbackFn = () => {
//     reloadCallback();
//   };

//   return (
//     <form onSubmit={onSubmitHandler}>
//       <div className="card mb-4">
//         <div className="card-body">
//           <div className="row">
//             {/* First Row */}
//             <div className="col">
//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">Sender</label>
//                 <div className="col-md-8">
//                   <input
//                     className="form-control"
//                     type="text"
//                     id="from"
//                     name="from"
//                     value={clientEmail}
//                     onChange={handleChange}
//                     readOnly
//                   />
//                 </div>
//               </div>

//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">Recipient</label>
//                 <div className="col-md-8">
//                   <select
//                     className="form-select"
//                     name="to"
//                     id="to"
//                     // value={form.to}
//                     value={form.to}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select groups</option>
//                     {groups.map((group) => (
//                       <option key={group.id} value={group.id}>
//                         {group.groupName}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">Start Date</label>
//                 <div className="col-md-8">
//                   <div className="form-select">
//                     {/* <input
//                     className="form-control"
//                     type="date"
//                     name="startDate"
//                     id="startDate"
//                     value={form.startDate}
//                     onChange={handleChange}
//                   /> */}
//                     <DatePicker
//                       className="form-control"
//                       // selected={startDate}
//                       // selected={startDate}
//                       value={startDate}
//                       // onChange={(date) => setStartDate(date)}
//                       onChange={(date) => {
//                         setStartDate(date);
//                         setForm((prevState) => ({
//                           ...prevState,
//                           startDate: date ? date.format("YYYY-MM-DD") : "",
//                         }));
//                       }}
//                       dateFormat="yyyy-MM-dd"
//                       minDate={new Date()}
//                       maxDate={getEndOfMonth()}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">End Date</label>
//                 <div className="col-md-8">
//                   <div className="form-select">
//                     {/* <input
//                     className="form-control"
//                     type="date"
//                     name="endDate"
//                     id="endDate"
//                     value={form.endDate}
//                     onChange={handleChange}
//                   /> */}
//                     <DatePicker
//                       className="form-control"
//                       // selected={endDate}
//                       value={endDate}
//                       // onChange={(date) => setEndDate(date)}
//                       onChange={(date) => {
//                         setEndDate(date);
//                         setForm((prevState) => ({
//                           ...prevState,
//                           endDate: date.format("YYYY-MM-DD"),
//                         }));
//                       }}
//                       dateFormat="yyyy-MM-dd"
//                       minDate={startDate}
//                       maxDate={getEndOfMonth()}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Second Row */}
//             <div className="col">
//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">Campaign Name</label>
//                 <div className="col-md-8">
//                   <input
//                     className="form-control"
//                     type="text"
//                     name="campaignName"
//                     id="campaignName"
//                     value={form.campaignName}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="mb-3 row">
//                 <label htmlFor="template" className="col-md-4 col-form-label">
//                   Template
//                 </label>
//                 <div className="col-md-8">
//                   <select
//                     className="form-select"
//                     name="template"
//                     id="template"
//                     value={form.template}
//                     onChange={(e) => {
//                       // handleChange(e);
//                       if (e.target && e.target.value)
//                         handleTemplateChange(e.target.value);
//                     }}

//                     // onChange={handleChange}
//                   >
//                     <option value="">Select a template</option>
//                     {templates.map((template) => (
//                       <option key={template.id} value={template.id}>
//                         {template.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="mb-3 row">
//                 <label className="col-md-4 col-form-label">
//                   Campaign Frquency
//                 </label>
//                 <div className="col-md-8">
//                   <select
//                     className="form-select"
//                     name="frequency"
//                     id="frequency"
//                     value={form.frequency}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select campaign frequency</option>
//                     <option value="1">Daily</option>
//                     <option value="2">Custom Dates</option>
//                   </select>
//                 </div>
//               </div>
//               {form.frequency === "2" && (
//                 <div className="mb-3 row">
//                   <label className="col-md-4 col-form-label">
//                     Custom Dates
//                   </label>
//                   <div className="col-md-8">
//                     <div className="form-select">
//                       <DatePicker
//                         className="form-control"
//                         value={values}
//                         onChange={(dates) => {
//                           setForm((prevState) => ({
//                             ...prevState,
//                             scheduledDate: dates.map((date) =>
//                               date.format("YYYY-MM-DD")
//                             ),
//                           }));
//                           console.log(
//                             dates.map((date) => date.format("YYYY-MM-DD"))
//                           );
//                         }}
//                         multiple
//                         minDate={startDate}
//                         maxDate={endDate}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div>
//             <label className="col-md-4 col-form-label">Message</label>
//             {/* <ReactQuill
//               value={editorContent}
//               id="message"
//               theme="snow"
//               className="form-control"
//               modules={{ toolbar: toolbarOptions }}
//               style={{ color: "black" }}
//               ref={editorRef}
//               // onChange={handleEditorChange}
//               onChange={(e) => {
//                 handleChange(e);
//                 if (e.target && e.target.value) {
//                   handleEditorChange(e.target.value);
//                 }
//               }}
//             /> */}

//             <ReactQuill
//               value={isEdit == true ? form.message : editorContent}
//               id="message"
//               name="message"
//               theme="snow"
//               className="form-control"
//               modules={{ toolbar: toolbarOptions }}
//               style={{ color: "black" }}
//               // onChange={handleEditorChange}
//               onChange={handleMessageEdit}
//             />
//           </div>
//         </div>
//       </div>
//       <br />
//       {/* {isEdit ? (
//         ""
//       ) : ( */}
//       <ActionButtonGroup
//         isEdit={isEdit}
//         resetCallback={resetCallback}
//         isSubmit={submitting}
//       />
//       {/* )} */}
//     </form>
//   );
// };

// export default Campaign;

/////////////////////////////////////
import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Modal } from "@mui/material";
import ActionButtonGroup from "../../Employee/components/ActionButtonGroup";
import campaignService from "../../../services/campaignService";
import templateService from "../../../services/templateService";
import clientService from "../../../services/clientService";
import groupService from "../../../services/groupService";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-multi-date-picker";
import { format } from "date-fns";

const Campaign = ({ user, isEdit, reloadCallback, showUpdateButton }) => {
  const INITIAL_STATE = {
    from: "",
    to: "",
    campaignName: "",
    frequency: "",
    template: "",
  };

  const getEndOfMonth = () => {
    let date = new Date();
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
    return lastDay;
  };

  const [form, setForm] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [editorContent, setEditorContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [values, setValues] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const fileInputRef = useRef(null);
  const iframeRef = useRef(null);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ header: 1 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image"],
  ];

  async function fetchClientEmail() {
    try {
      const result = await clientService.getClientEmail();
      setClientEmail(result.data.data.email);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const result = await templateService.getTemplate();
        setTemplates(result.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchContact() {
      try {
        const result = await groupService.getGroup();
        setGroups(result.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchClientEmail();
    fetchTemplate();
    fetchContact();
  }, []);

  useEffect(() => {
    if (isEdit && user && user.id) {
      setForm({
        from: user.from,
        to: user.to,
        campaignName: user.campaignName,
        frequency: user.frequency,
        template: user.template,
        message: user.message,
      });
      setStartDate(user.startDate);
      setEndDate(user.endDate);
    }
  }, [user, isEdit]);

  const handleTemplateChange = async (templateId) => {
    try {
      const templateContent = await fetchTemplateById(templateId);
      console.log("templateContent", templateContent);
      setEditorContent(templateContent);
      setSelectedTemplate(templateContent);
      setForm((prevState) => ({
        ...prevState,
        message: templateContent,

      }))
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchTemplateById(selectedTemplateId) {
    try {
      const result = await templateService.getTemplateId(selectedTemplateId);
      return result.data.data.content;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const handleMessageEdit = (content) => {
    setEditorContent(content);
    setForm({
      ...form,
      message: content,
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const htmlContent = e.target.result;
        setEditorContent(htmlContent);
        setForm({
          ...form,
          message: htmlContent,
        });
      };
      reader.readAsText(file);
    } else {
      NotificationManager.error("Please upload a valid HTML file");
      // Reset file input
      event.target.value = null;
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      console.log("DATA:", form);
      if (isEdit && user && user.id) await updateFormData(user.id);
      else await saveFormData(form);
    } catch (error) {
      alert(`Registration failed! ${error.message}`);
    }
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
      from: clientEmail,
    });
  };

  const saveFormData = async (form) => {
    const response = await campaignService.createCampaign(form);
    setSubmitting(false);
    if (response.data.status === 201) {
      resetCallback();
      NotificationManager.success(response.data.message);
    } else {
      NotificationManager.error(response.data.message);
    }
  };

  const updateFormData = async (userId) => {
    try {
      form.id = userId;
      const response = await campaignService.updateCampaign(userId, form);
      setSubmitting(false);
      if (response.data.status === 200) {
        NotificationManager.success(response.data.message);
        resetCallback();
      } else {
        NotificationManager.error(response.data.error);
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
      NotificationManager.error(
        "Failed to update campaign. Please try again later."
      );
    }
  };

  const resetCallback = () => {
    setForm(INITIAL_STATE);
    setStartDate(null);
    setEndDate(null);
    setEditorContent(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const reloadCallbackFn = () => {
    reloadCallback();
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(isEdit ? form.message : editorContent);
      doc.close();
    }
  }, [isEdit, editorContent, form.message]);

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
                    name="from"
                    value={clientEmail}
                    onChange={handleChange}
                    readOnly
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
                  <div className="form-select">
                    <DatePicker
                      className="form-control"
                      value={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setForm((prevState) => ({
                          ...prevState,
                          startDate: date ? date.format("YYYY-MM-DD") : "",
                        }));
                      }}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      maxDate={getEndOfMonth()}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">End Date</label>
                <div className="col-md-8">
                  <div className="form-select">
                    <DatePicker
                      className="form-control"
                      value={endDate}
                      onChange={(date) => {
                        setEndDate(date);
                        setForm((prevState) => ({
                          ...prevState,
                          endDate: date.format("YYYY-MM-DD"),
                        }));
                      }}
                      dateFormat="yyyy-MM-dd"
                      minDate={startDate}
                      maxDate={getEndOfMonth()}
                    />
                  </div>
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
                      if (e.target && e.target.value)
                        handleTemplateChange(e.target.value);
                        handleChange(e);
                    }}
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

              <div className="mb-3 row">
                <label className="col-md-4 col-form-label">
                  Campaign Frequency
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
                    <option value="1">Daily</option>
                    <option value="2">Custom Dates</option>
                  </select>
                </div>
              </div>
              {form.frequency === "2" && (
                <div className="mb-3 row">
                  <label className="col-md-4 col-form-label">
                    Custom Dates
                  </label>
                  <div className="col-md-8">
                    <div className="form-select">
                      <DatePicker
                        className="form-control"
                        value={values}
                        onChange={(dates) => {
                          setForm((prevState) => ({
                            ...prevState,
                            scheduledDate: dates.map((date) =>
                              date.format("YYYY-MM-DD")
                            ),
                          }));
                        }}
                        multiple
                        minDate={startDate}
                        maxDate={endDate}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label">Message</label>
              <div className="col-md-12">
                <div className="mb-2">
                  <input
                    type="file"
                    accept=".html"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="form-control"
                  />
                </div>
                {/* <ReactQuill
                  value={isEdit ? form.message : editorContent}
                  id="message"
                  name="message"
                  theme="snow"
                  className="form-control"
                  modules={{ toolbar: toolbarOptions }}
                  style={{ color: "black" }}
                  onChange={handleMessageEdit}
                /> */}
                <iframe
                    ref={iframeRef}
                    title="HTML Preview"
                    style={{
                      width: '100%',
                      height: '500px',
                      border: '1px solid #ccc',
                      marginTop: '1rem',
                    }}
                  />
              </div>
            </div>
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

export default Campaign;