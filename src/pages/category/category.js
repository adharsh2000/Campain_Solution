import React from "react";

const Category = ({name, children}) => {
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
                    {children}
                </div>
            
    </>
  );
};

Category.propTypes = {};

export default Category;
