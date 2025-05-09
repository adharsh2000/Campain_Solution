// import React from "react";
// import { Outlet } from "react-router-dom";

// const EmployeeLayout = (props) => {
//   return (
//     <>
//       <div className="container-xxl flex-grow-1 container-p-y">
//         <div className="row">
//           <div className="col">
//             <div className="card mb-4">
//               <div className="card-body">
//                 <div className="row" id="content_area">
//                   {/* Content Area */}
//                   <Outlet />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
//   // if (!user) {
//   //   // user is not authenticated
//   //   return <Navigate to="/" />;
//   // }
//   // return children;
// };

// export default EmployeeLayout;

////=======================================================================================
import React from "react";
import { Outlet } from "react-router-dom";

const EmployeeLayout = (props) => {
  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col">
          <div className="card bg-white shadow-sm mb-4">
            <div className="card-body">
              <div className="row" id="content_area">
                {/* Content Area */}
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;


