import React from "react";
import { useState } from "react";
import RoleList from "./components/list";
import CreateEditRole from "./components/create";

const Role = () => {

  return (
    <>
          <CreateEditRole />
          <RoleList />
    </>
  );
};

export default Role;
