import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const redirect = (path) => {
    if(path != null) {
      navigate(path, { replace: true })
    }
  }

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user:", user.role);
  // console.log("user name: ", user.user.name);
  //

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    console.log(user.role)
    if (user.role == "1") {
      redirect("/admin-login");
    } 
    else if (user.role == "3") {
      redirect("/client-login");
    } 
    else if (user.role == "2") {
      redirect("/employee-login");
    } 
    else 
    redirect("/");
  };
  console.log("Navbar");
  return (
    <>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-4" href="#">
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div
          className="navbar-nav-right d-flex align-items-center"
          id="navbar-collapse"
        >
          {/* Search */}
          {/* <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              <i className="bx bx-search fs-4 lh-0"></i>
              <input
                type="text"
                className="form-control border-0 shadow-none"
                placeholder="Search..."
                aria-label="Search..."
              />
            </div>
          </div> */}
          {/* /Search  */}

          
          <span style={{'width':'100%', 'textAlign':'center'}}>
            <h3 className="display-6 mb-0 menu-text"><b>CRM</b></h3>
            
          </span>
          <p style={{'textAlign':'right'}}>{user.user.name}</p>
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* Place this tag where you want the button to render.  */}
            <li className="nav-item lh-1 me-3">
              
            </li>

            {/* User */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a
                className="nav-link dropdown-toggle hide-arrow"
                href="javascript:void(0);"
                data-bs-toggle="dropdown"
              >
                <div className="avatar avatar-online">
                  <img
                    src="../assets/img/avatars/1.png"
                    alt="pic"
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {/* <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <img
                            src="../assets/img/avatars/1.png"
                            alt
                            className="w-px-40 h-auto rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">John Doe</span>
                        <small className="text-muted">Admin</small>
                      </div>
                    </div>
                  </a>
                </li> */}
                {/* <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-user me-2"></i>
                    <span className="align-middle">My Profile</span>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-cog me-2"></i>
                    <span className="align-middle">Settings</span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li> */}
                <li>
                  <a className="dropdown-item" href="#" onClick={() =>{logout()}}>
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Log Out</span>
                  </a>
                </li>
              </ul>
            </li>
            {/* / User  */}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

////----------------------------------------------------
// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();
//   const redirect = (path) => {
//     if (path != null) {
//       navigate(path, { replace: true });
//     }
//   };

//   console.log("Navbar");
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <a className="navbar-brand" href="#">
//         CRM
//       </a>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarNav"
//         aria-controls="navbarNav"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav ml-auto">
//           <li className="nav-item">
//             <a className="nav-link" href="#" onClick={() => redirect('/signin')}>
//               Log Out
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#">
//               <img
//                 src="../assets/img/avatars/1.png"
//                 alt="pic"
//                 className="avatar"
//               />
//               <span className="ml-2">John Doe</span>
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

