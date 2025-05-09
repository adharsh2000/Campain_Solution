import React from "react";
import { useState } from "react";
import CreateEditRoute from "./components/create";
import RouteList from "./components/list";


const SalesRoute = () => {

  return (
    <>
          <CreateEditRoute />
          <RouteList />
    </>
  );
};

export default SalesRoute;
