// import React, { useEffect, useRef, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// function MenubarItem(props) {

//   const [isOpen, setIsOpen] = useState(false);
//   // const [isActive, setIsActive] = useState(null);
//   const { item } = props;
//   const isChildren = item.subNav && item.subNav.length > 0;
//   // const isChildren = item.children && item.children.length > 0;
//   const navigate = useNavigate();
//   const parentRef = useRef();
//   useEffect(() => {
//     if (parentRef.current.classList.contains("rm-active")) {
//       parentRef.current.classList.remove("active");
//     }
//   }, []);
//   const redirect = (path) => {
//     if (path != null) {
//       navigate(path, { replace: true });
//     }
//   };

//   return (
//     <>
//       <li style={{ width: "100%" }}>
//         <NavLink
//           ref={parentRef}
//           to={item.path && item.path !== "" ? item.path : "#"}
//           className={`menu-item ${item.parent ? "rm-active" : ""}`}
          
//         >
//           <a
//             href={item.path && item.path !== "" ? item.path : "#"}
//             className={`menu-link ${isChildren ? "menu-toggle" : ""} ${
//               item.createIcon ? "menu-add-icon" : ""
//             }`}
//             onClick={() => {
//               setIsOpen(!isOpen);
//             }}
//           >
//             <i
//               className={`menu-icon tf-icons bx ${item.icon ? item.icon : ""}`}
//             ></i>
//             <div>{item.title}</div>
//           </a>
//         </NavLink>

//         <i
//           className={`menu-icon tf-icons bx ${
//             item.createIcon ? item.createIcon : ""
//           }`}
//           style={{ float: "right", marginTop: "-30px", cursor: "pointer" }}
//           onClick={() => redirect(item.createIconPath)}
//         ></i>

//         <ul className={`${isOpen ? "sub-menu" : "no-sub-menu"}`}>
//           {isChildren &&
//             item.subNav.map((itm, i) => {
//               return (
//                 <>
//                   <MenubarItem key={i} item={itm} />
//                 </>
//               );
//             })}
//         </ul>
//       </li>
//     </>
//   );
// }

// export default MenubarItem;

// // //=============================================================================================

import React, { useEffect, useRef, useState, useContext } from "react";
import { NavLink, json, useNavigate } from "react-router-dom";
// import DataContext from "../../../context/DataContext";

function MenubarItem(props) {
  // const {role} = useContext(DataContext);
  // console.log("role "+ role);

  const [isOpen, setIsOpen] = useState(false);
  // const [isActive, setIsActive] = useState(null);
  const { item } = props;
  // const isChildren = item.subNav && item.subNav.length > 0;
  const isChildren = item.children && item.children.length > 0;
  const navigate = useNavigate();
  const parentRef = useRef();
  useEffect(() => {
    if (parentRef.current.classList.contains("rm-active")) {
      parentRef.current.classList.remove("active");
    }
  }, []);
  const redirect = (path) => {
    if (path != null) {
      navigate(path, { replace: true });
    }
  };

  return (
    <>
    <li style={{ width: "100%" }}>
        <NavLink
          ref={parentRef}
          to={item.route && item.route !== "" ? "/"+item.route : "#"}
          className={`menu-item ${item.route === "#" ? "rm-active" : ""}`}
        >
          <a
            href={item.route && item.route !== "" ? "/"+item.route : "#"}
            className={`menu-link ${isChildren ? "menu-toggle" : ""} ${
              item.canCreate ? "menu-add-icon" : ""
            }`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <i
              className={`menu-icon tf-icons bx ${item.iconClass ? item.iconClass : ""}`}
            ></i>
            <div>{item.name}</div>
          </a>
        </NavLink>

        <i
          className={`menu-icon tf-icons bx ${
            item.canCreate ? "bx-message-square-add" : ""
          }`}
          style={{ float: "right", marginTop: "-30px", cursor: "pointer" }}
          onClick={() => redirect("/"+item.createPath)}
        ></i>

        <ul className={`${isOpen ? "sub-menu" : "no-sub-menu"}`}>
          {isChildren &&
            item.children.map((itm, i) => {
              return (
                <>
                  <MenubarItem key={i} item={itm} />
                </>
              );
            })}
        </ul>
      </li>
      {/* <li style={{ width: "100%" }}>
        <NavLink
          ref={parentRef}
          to={item.path && item.path !== "" ? item.path : "#"}
          className={`menu-item ${item.parent ? "rm-active" : ""}`}
        >
          <a
            href={item.path && item.path !== "" ? item.path : "#"}
            className={`menu-link ${isChildren ? "menu-toggle" : ""} ${
              item.createIcon ? "menu-add-icon" : ""
            }`}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <i
              className={`menu-icon tf-icons bx ${item.icon ? item.icon : ""}`}
            ></i>
            <div>{item.title}</div>
          </a>
        </NavLink>

        <i
          className={`menu-icon tf-icons bx ${
            item.createIcon ? item.createIcon : ""
          }`}
          style={{ float: "right", marginTop: "-30px", cursor: "pointer" }}
          onClick={() => redirect(item.createIconPath)}
        ></i>

        <ul className={`${isOpen ? "sub-menu" : "no-sub-menu"}`}>
          {isChildren &&
            item.subNav.map((itm, i) => {
              return (
                <>
                  <MenubarItem key={i} item={itm} />
                </>
              );
            })}
        </ul>
      </li> */}
    </>
  );
}

export default MenubarItem;
