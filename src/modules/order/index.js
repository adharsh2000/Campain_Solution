import React from "react";
import OrderList from "./components/list";

const Order = ({ name }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
            <span className="text-muted fw-light"></span> {name}
          </h4>
        </div>
      </div>
      <div className="row" id="content_area">
        {/* Content Area */}
        {/* Order list table component */}
        <OrderList />
      </div>
    </>
  );
};

export default Order;
