import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "../ui/modal/modal";
import CreateEditUser from "./create";

const CustomerList = ({ name }) => {
  const [selectedRow, setSelectedRow] = useState(-1);

  return (
    <>
      <div className="row">
        <div className="col">
          <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
            <span className="text-muted fw-light"></span>
            {name}
          </h4>
        </div>
      </div>
      <div className="text-nowrap">
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
           
          </tbody>
        </table>
      </div>

     
    </>
  );
};

export default CustomerList;
