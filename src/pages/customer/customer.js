import React from "react";

import "./css/customer.css";
import CustomerList from "../../features/customer/list";

const Customer = ({name}) => {
  return (
    <>

                <div className="row">
                  <div className="col">
                    <h4
                      className="fw-bold"
                      style={{ textAlign: "-webkit-left" }}
                    >
                      <span className="text-muted fw-light"></span> {name}
                    </h4>
                  </div>                  
                </div>
                <div className="row" id="content_area">
                    {/* Content Area */}
                    {/* Customer list table component */}
                    <CustomerList />
                </div>
            
    </>
  );
};

Customer.propTypes = {};

export default Customer;
