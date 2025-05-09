import { Height } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ initialValue, onEditorChange }) => {
  // const initialContent = `<p><span style="color: rgb(68, 68, 68);" class="ql-font-serif">Hello ${contacts.name},</span></p>`;
  // const [editorValue, setEditorValue] = useState(initialContent);
  //   const [editorValue, setEditorValue] = useState({
  //     "message": `<p>Hello, ${contacts.name}!</p>`,
  //     "template": template
  //   }

  //   );

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

  // const handleEditorChange = (content) => {
  //   setEditorValue(content);
  // };

  return (
    <div>
      <ReactQuill
        theme="snow"
        className="form-control"
        // value={editorValue}
        // onChange={handleEditorChange}
        value={initialValue}
        onChange={onEditorChange}
        modules={{ toolbar: toolbarOptions }}
        // style={{ minHeight: '100px' }}
      />
    </div>
  );
};

export default TextEditor;
