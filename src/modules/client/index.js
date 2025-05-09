import React from "react";
import ClientList from "./components/list";

const Client = ({name}) => {
  return (
    <>

                <div className="row">
                  <div className="col">
                    <h4
                      className="fw-bold"
                      style={{ textAlign: "-webkit-left" }}
                    >
                      <span className="text-muted fw-light">{name}</span> 
                    </h4>
                  </div>                  
                </div>
                <div className="row" id="content_area">
                    {/* Content Area */}
                    {/* Client list table component */}
                    
                    <ClientList moduleType="client" />
                </div>
            
    </>
  );
};

Client.propTypes = {};

export default Client;
