import "./TemplateEditorIDE.css";
import { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { openDB } from "idb";
import prettier from "prettier/standalone";
import parserHtml from "prettier/plugins/html.mjs";

export default function TemplateEditorIDE() {
  const [srcDoc, setSrcDoc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [autoSave, setAutoSave] = useState(() => {
    return localStorage.getItem("autoSave") === "true";
  });

  const DEFAULT_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Template</title>
  </head>
  <body>
  </body>
</html>`;

  // Open IndexedDB and Load HTML
  useEffect(() => {
    const initDB = async () => {
      setIsLoading(true);
      const db = await openDB("EditorDB", 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains("htmlStore")) {
            db.createObjectStore("htmlStore");
          }
        },
      });

      const savedHtml = await db.get("htmlStore", "htmlContent");
      if (savedHtml) {
        setSrcDoc(savedHtml);
      }
      setIsLoading(false);
    };

    initDB();
  }, []);

  // Save to IndexedDB whenever srcDoc updates (only if Auto Save is ON)
  useEffect(() => {
    if (!isLoading && autoSave) {
      const saveToDB = async () => {
        const db = await openDB("EditorDB", 1);
        await db.put("htmlStore", srcDoc, "htmlContent");
      };
      saveToDB();
    }
  }, [srcDoc, isLoading, autoSave]);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSrcDoc(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  // Format HTML using Prettier
  const handleFormat = async () => {
    try {
      let formattedData = await prettier.format(srcDoc, {
        parser: "html",
        plugins: [parserHtml],
        tabWidth: 2,
        useTabs: false,
      });
      setSrcDoc(formattedData);
    } catch (error) {
      console.error("Prettier formatting error:", error);
    }
  };

  // Download edited HTML
  const handleDownload = () => {
    const blob = new Blob([srcDoc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edited_file.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Toggle Auto Save
  const handleToggleAutoSave = () => {
    const newAutoSave = !autoSave;
    setAutoSave(newAutoSave);
    localStorage.setItem("autoSave", newAutoSave);
  };

  return (
    <div className="container-ide">
      <div className="editor-container">
        <div className="editor-header">
          <input type="file" accept=".html" onChange={handleFileUpload} />
          <div className="buttons">
            <button
              onClick={handleToggleAutoSave}
              style={{
                background: autoSave ? "green" : "red",
                color: "white",
              }}
            >
              Auto Save {autoSave ? "On" : "Off"}
            </button>
            <button onClick={() => setSrcDoc(DEFAULT_HTML)}>
              Default Template
            </button>
            <button onClick={() => setSrcDoc("")}>Clear</button>
            <button onClick={handleFormat}>Format</button>
            <button onClick={handleDownload}>Download</button>
          </div>
        </div>

        <CodeMirror
          value={srcDoc}
          theme="dark"
          extensions={[html()]}
          onChange={(value) => setSrcDoc(value)}
          className="editor"
        />
      </div>

      {!isLoading && (
        <div className="preview-pane">
          <iframe
            srcDoc={srcDoc}
            title="preview"
            sandbox="allow-scripts"
            className="preview-iframe"
          />
        </div>
      )}

      {isLoading && <p>Loading preview...</p>}
    </div>
  );
}
