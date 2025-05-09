import React from "react";

function InvoiceView(user) {
  const title = user && user.number ? `Invoice - ${user.number} ` : "";
  console.dir(user);
 
  return (
    <>
    
      <div className="row">
        <div className="col">
          <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
            <span className="text-muted fw-light">{title}</span>
          </h4>
        </div>
      </div>
      
        
      
      {/* {user} */}
       {/* {user && ( */}
       {Array.isArray(user) && user.map((item, index) => (
        <div className="card-body mt-4" key={index}>
          <p>Invoice Number: {item.number}</p>
          <p>Date: {item.date}</p>

          {/* Render additional invoice data */}
        </div>
      ))}
    </>
  );
}

export default InvoiceView;
