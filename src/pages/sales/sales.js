import React from "react";
import { Outlet } from "react-router-dom";

import "../customer/css/customer.css";

const SalesLayout = () => {
  return (
    <>
        <Outlet />
    </>
  );
  // if (!user) {
  //   // user is not authenticated
  //   return <Navigate to="/" />;
  // }
  // return children;
};

export default SalesLayout;
