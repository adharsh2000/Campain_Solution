import React from "react";

const LineItems = ({ items }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
            <span className="text-muted fw-light">Items</span> 
          </h4>
        </div>
      </div>
      <div className="row" id="content_area">
      <table className="table table-hover">
          <thead>
            <tr>
              <th>Item</th>
              <th>Image</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="table-border-bottom-0">
            {items.map((item, index) => {
              return (
                <tr
                  key={index}               
                  
                >
                  <td>{item.name}</td>
                  <td><img src={item.images[0]['image']} alt={index}/></td>
                  <td>{item.sku}</td>
                  <td>{item.item.quantity}</td>
                  <td>{item.item.unit} </td>
                  <td>{item.price.current_price} {item.price.currency}</td>
                  <td>{item.item.quantity * item.price.current_price} {item.price.currency}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LineItems;
