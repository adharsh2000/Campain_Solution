import React from "react";
import DataList from "../../features/job/all";

const JobList = (props) => {

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
                      <span className="text-muted fw-light"></span> Jobs
                    </h4>
                  </div>                  
                </div>
                <div className="row" id="content_area">
                    {/* Content Area */}
                    {/* Job list table component */}
                    <DataList />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobList;
