
// import React, { useEffect, useRef, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { NotificationManager } from "react-notifications";
// import ActionButtonGroup from "../../Employee/components/ActionButtonGroup";
// import templateService from "../../../services/templateService";


// const TemplateEditor = ({
//   name: initialName,
//   user,
//   isEdit,
//   reloadCallback,
//   showUpdateButton,
// }) => {
//   const [name, setName] = useState(initialName || "");
//   const [content, setContent] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [contentError, setContentError] = useState("");
//   const editorRef = useRef();

//   useEffect(() => {
//     if (isEdit && user && user.name) {
//       setName(user.name);
//       setContent(user.content);
//     }
//   }, [isEdit, user]);

//   const saveFormData = async (data) => {
//     try {
//        templateService.createTemplate(data).then(async(response) => {

//         // NotificationManager.success("Added new Template!", "Success!", 2000);
//         if (response.data.status === 409){
//           NotificationManager.error(response.data.message, "Error!", 2500)
//         } else if (response.data.status === 500) {
//           NotificationManager.error('Internal server error', "Error!", 2500);
//         } else {
//           NotificationManager.success(response.data.message, "Success!", 2500);
//           resetForm();
//         }
//       })

//     } catch (error) {
//       console.error("Form submission error:", error);
//       // NotificationManager.error("Error while creating new Template");
//       NotificationManager.error(`${error.response.data.error}`, "Error!", 2500);
//     }
//   };

//   const updateFormData = async (userId, data) => {
//     data.id = userId;
//     try {
//       await templateService.updateTemplate(data.id, data);
//       NotificationManager.success("Updated Template!", "Success!", 2000);
//       reloadCallbackFn();
//     } catch (error) {
//       console.log(error);
//       NotificationManager.error("Error while updating Template!", "Error!");
//     }
//   };

//   const resetCallback = () => {
//     resetForm();
//   };

//   const reloadCallbackFn = () => {
//     reloadCallback();
//   };

//   const toolbarOptions = [
//     ["bold", "italic", "underline", "strike"],
//     [{ header: 1 }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ indent: "-1" }, { indent: "+1" }],
//     [{ size: ["small", false, "large", "huge"] }],
//     [{ color: [] }, { background: [] }],
//     [{ font: [] }],
//     [{ align: [] }],
//     ["link", "image"],
//   ];

//   const handleEditorChange = (content) => {
//     setContent(content);
//   };

//   const resetForm = () => {
//     setName("");
//     setContent("");
//   };

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     const data = { name, content };

//     let isFormValid = true;

//     if (!name) {
//       setNameError("Template Name required");
//       isFormValid = false;
//     } else {
//       setNameError("");
//     }

//     if (!content) {
//       setContentError("Content required");
//       isFormValid = false;
//     } else {
//       setContentError("");
//     }

//     if (isFormValid) {
//       try {
//         if (isEdit && user && user.id) {
//           await updateFormData(user.id, data);
//         } else {
//           await saveFormData(data);
//         }
//       } catch (error) {
//         console.error("Form submission error:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmitHandler}>
//         <div className="card mb-4">
//           <div className="card-body">
//             <div className="row">
//               <div className="col">
//                 <div className="mb-3 row">
//                   <label htmlFor="name" className="col-md-4 col-form-label">
//                     Template Name
//                   </label>
//                   <div className="col-md-8">
//                     <input
//                       className="form-control"
//                       type="text"
//                       id="name"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                     />
//                     {nameError && (
//                       <div
//                         className="text-danger"
//                         style={{ marginTop: "0.25rem", fontSize: "80%" }}
//                       >
//                         {nameError}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <label className="col-md-4 col-form-label">Content</label>

//                   <ReactQuill
//                     className="form-control"
//                     style={{ minHeight: '150px'}} 
//                     theme="snow"
//                     modules={{ toolbar: toolbarOptions }}
//                     value={content}
//                     onChange={handleEditorChange}
//                     // style={{ color: "black" }}
//                     required
//                     ref={editorRef}
//                   />
//                   {contentError && (
//                     <div
//                       className="text-danger"
//                       style={{ marginTop: "0.25rem", fontSize: "80%" }}
//                     >
//                       {contentError}
//                     </div>
//                   )}

//                 <br />
//               </div>
//             </div>
//           </div>
//         </div>
//         <ActionButtonGroup
//           isEdit={isEdit}
//           resetCallback={resetCallback}
//           submitting={false}

//         />
//       </form>
//     </div>
//   );
// };

// export default TemplateEditor;
import React, { useEffect, useRef, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NotificationManager } from "react-notifications";
import ActionButtonGroup from "../../Employee/components/ActionButtonGroup";
import templateService from "../../../services/templateService";

const TemplateEditor = ({
  name: initialName,
  user,
  isEdit,
  reloadCallback,
  showUpdateButton,
}) => {
  const [name, setName] = useState(initialName || "");
  const [content, setContent] = useState("");
  const [nameError, setNameError] = useState("");
  const [contentError, setContentError] = useState("");
  const [htmlFile, setHtmlFile] = useState(null);
  const editorRef = useRef();
  const fileInputRef = useRef();
  const iframeRef = useRef(null);

  useEffect(() => {
    if (isEdit && user && user.name) {
      setName(user.name);
      setContent(user.content);
    }
  }, [isEdit, user]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(content);
      doc.close();
    }
  }, [content]);

  const saveFormData = async (data) => {
    try {
      templateService.createTemplate(data).then(async (response) => {
        if (response.data.status === 409) {
          NotificationManager.error(response.data.message, "Error!", 2500)
        } else if (response.data.status === 500) {
          NotificationManager.error('Internal server error', "Error!", 2500);
        } else {
          NotificationManager.success(response.data.message, "Success!", 2500);
          resetForm();
        }
      })
    } catch (error) {
      NotificationManager.error(`${error.response.data.error}`, "Error!", 2500);
    }
  };

  const updateFormData = async (userId, data) => {
    data.id = userId;
    try {
      await templateService.updateTemplate(data.id, data);
      NotificationManager.success("Updated Template!", "Success!", 2000);
      reloadCallbackFn();
    } catch (error) {
      NotificationManager.error("Error while updating Template!", "Error!");
    }
  };

  const resetCallback = () => {
    resetForm();
  };

  const reloadCallbackFn = () => {
    reloadCallback();
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ header: 1 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image"],
  ];

  const handleEditorChange = (content) => {
    setContent(content);
    setHtmlFile(null); // Clear file input when editor is used
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/html") {
      setHtmlFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setContent(e.target.result);
        console.log('content', e.target.result);
      };
      reader.readAsText(file);
    } else {
      NotificationManager.error("Please select an HTML file", "Error!", 2500);
      setHtmlFile(null);
      event.target.value = null;
    }
  };

  const resetForm = () => {
    setName("");
    setContent("");
    setHtmlFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const data = { name, content };
    // const data = {
    //   name,
    //   content: cleanEscapedHTML(content)
    // }

    console.log('data', data);

    let isFormValid = true;

    if (!name) {
      setNameError("Template Name required");
      isFormValid = false;
    } else {
      setNameError("");
    }

    if (!content) {
      setContentError("Content required");
      isFormValid = false;
    } else {
      setContentError("");
    }

    if (isFormValid) {
      try {
        if (isEdit && user && user.id) {
          await updateFormData(user.id, data);
        } else {
          await saveFormData(data);
        }
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="mb-3 row">
                  <label htmlFor="name" className="col-md-4 col-form-label">
                    Template Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    {nameError && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {nameError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="col-md-4 col-form-label">Content</label>
                <div className="mb-3">
                  <div className="form-text mb-2">
                    Enter content using editor OR upload HTML file:
                  </div>
                  <div className="mb-3">
                    <input
                      type="file"
                      className="form-control"
                      accept=".html"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    {htmlFile && (
                      <div className="mt-2">
                        Selected file: {htmlFile.name}
                      </div>
                    )}
                  </div>
                  {/* <div className="mb-3 text-center">OR</div> 
                  <ReactQuill
                    className="form-control"
                    style={{ minHeight: '150px' }}
                    theme="snow"
                    modules={{ toolbar: toolbarOptions }}
                    value={content}
                    onChange={handleEditorChange}
                    required
                    ref={editorRef}
                  /> */}

                  <label className="col-md-4 col-form-label">Live Preview</label>
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

                  {contentError && (
                    <div
                      className="text-danger"
                      style={{ marginTop: "0.25rem", fontSize: "80%" }}
                    >
                      {contentError}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ActionButtonGroup
          isEdit={isEdit}
          resetCallback={resetCallback}
          submitting={false}
        />
      </form>
    </div>
  );
};

export default TemplateEditor;