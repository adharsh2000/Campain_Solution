// import React, { useState, useEffect } from "react";

// import menuItems from "../api/menuData";
// import MenubarItem from "./menuItem";
// import axios from "axios";

// function Menubar() {
//   const [isExpanded, setIsExpanded] = useState(true);

//   const handleToggler = (event) => {
//     event.preventDefault();
//     console.log(isExpanded);
//     if (isExpanded) {
//       setIsExpanded(false);
//     } else setIsExpanded(true);
//   };

//   return (
//     <>
//       <aside
//         id="layout-menu"
//         className={`layout-menu menu-vertical menu bg-menu-theme ${
//           isExpanded ? "" : "Sidebar collapsed"
//         }`}
//       >
//         <div className="app-brand">
//           <a href="/dashboard" className="app-brand-link">
//             <span className="app-brand-logo"></span>
//             <span className="app-brand-text menu-text fw-bolder ms-2">
//               <img
//                 src="https://smartsolutionsme.com/wp-content/uploads/2022/04/sas3.png"
//                 alt="logo"
//               />

//               <br></br>
//               <h4 className="sub-title">CRM</h4>
//             </span>
//           </a>
//           <a
//             href="/"
//             onClick={handleToggler}
//             className="layout-menu-toggle menu-link text-large ms-auto d-block"
//           >
//             <i
//               className={`bx ${
//                 isExpanded ? "bx-chevron-left" : "bx-chevron-right"
//               } bx-sm align-middle`}
//             ></i>
//           </a>
//         </div>
//         <div className="menu-inner-shadow"></div>

//         <ul className="menu-inner py-1">
//           {menuItems &&
//             menuItems.length > 0 &&
//             menuItems.map((item, index) => {
//               //if (item.access.length > 0 && item.access.includes(user.role)) {
//                 return <MenubarItem key={index} item={item} />;
//               //}
//               // else
//               // return null
//             })}
//         </ul>
//       </aside>
//     </>
//   );
// }

// export default Menubar;

/////-------------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";

import menuItems from "../api/menuData";
import MenubarItem from "./menuItem";
import axios from "axios";
import { colors } from "@mui/material";
import authService from "../../../services/authService";
import { NotificationManager } from "react-notifications";

function Menubar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [menuItems, setMenuItems] = useState([]);

  console.log('menusss,', menuItems);


  const user = JSON.parse(localStorage.getItem("user"));
  console.log("USER: ", user);

  async function fetchResources() {
    // Fetch resources
    console.log("fetchresource function")
    if (user && user.role) {
      console.log(user);
      console.log(user.access_token);
      let params = {
        roles: user.role,
      };
      console.log("params: ", params);
      authService
        .getResources(params).then(async (response) => {
          // console.dir(response);
          let _actions = [];
          let actions = response.data.data;
          // console.log("from menubar", response);
          console.log(actions);
          if (actions && actions.length > 0) {
            actions.map((item, index) => {
              console.log(item['children']);
              if (item["children"] && item["children"].length > 0) {
                item["children"].forEach((itm) => {
                  //action array
                  _actions.push(itm["actions"]);
                  console.log(itm);
                });
              }
              return _actions;
            });
            // console.log("_actions");
            console.log("_actions array", _actions);
          }
          localStorage.setItem(
            "user_permission",
            JSON.stringify(response.data.data)
          );
          localStorage.setItem("user_action", JSON.stringify(_actions));
          await setMenuItems(response.data.data);
        })
        .catch((error) => {
          console.log(error);
          NotificationManager.error(
            "Error while fetching resources!",
            "Error!"
          );
        });
    }
  }

  useEffect(() => {
    fetchResources();
  }, []);

  const handleToggler = (event) => {
    event.preventDefault();
    console.log(isExpanded);
    if (isExpanded) {
      setIsExpanded(false);
    } else setIsExpanded(true);
  };

  const editorNav = {
    "pid": 20,
    "orderId": 0,
    "id": 20,
    "name": "Template Editor",
    "level": 0,
    "route": "editor-new",
    "iconClass": "bx-tachometer",
    // "canCreate": 1,
    "createPath": "employee/create",
    "children": []
  }

  return (
    <>
      <aside
        id="layout-menu"
        className={`layout-menu menu-vertical menu bg-menu-theme ${isExpanded ? "" : "Sidebar collapsed"
          }`}
      >
        <div className="app-brand">
          <a href="/dashboard" className="app-brand-link">
            <span className="app-brand-logo"></span>
            <span className="app-brand-text menu-text fw-bolder ms-2">
              <img
                src="https://smartsolutionsme.com/wp-content/uploads/2022/04/sas3.png"
                alt="logo"
              />

              <br></br>
              <h4 className="sub-title">CRM</h4>
            </span>
          </a>
          <a
            href="/"
            onClick={handleToggler}
            className="layout-menu-toggle menu-link text-large ms-auto d-block"
          >
            <i
              className={`bx ${isExpanded ? "bx-chevron-left" : "bx-chevron-right"
                } bx-sm align-middle`}
            ></i>
          </a>
        </div>
        <div className="menu-inner-shadow"></div>

        {/* <ul className="menu-inner py-1" > */}
        {/* <ul className="menu-inner py-1" style={{ backgroundColor: "#222" }}> */}
        <ul
          className="menu-inner py-1"
        // style={{ backgroundColor: "rgba(34, 34, 34, 0.5)", opacity: 0.8 }}
        >
          {menuItems &&
            menuItems.length > 0 &&
            menuItems.map((item, index) => {
              //if (item.access.length > 0 && item.access.includes(user.role)) {
              return <MenubarItem key={index} item={item} />;
              //}
              // else
              // return null
            })}

          <MenubarItem key={56} item={editorNav} />
        </ul>
      </aside>
    </>
  );
}

export default Menubar;
