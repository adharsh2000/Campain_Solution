import React from "react";
import Agent from "../../features/agent/list";

const AgentList = (props) => {

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h4
                      className="fw-bold"
                      style={{ textAlign: "-webkit-left" }}
                    >
                      <span className="text-muted fw-light"></span> Agents
                    </h4>
                  </div>                  
                </div>
                <div className="row" id="content_area">
                    {/* Content Area */}
                    {/* Agent list table component */}
                    <Agent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentList;
