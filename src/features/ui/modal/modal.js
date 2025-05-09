import React from "react";

const Modal = ({ handleClose, show, children, id, data }) => {
  console.log("Inside Modal");
  return (
    <div class="modal fade" id={id} tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel4">
              {data.title}
            </h3>
          
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            
          </div>
          <div class="modal-body">{children}</div>
          {/* <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save changes
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;




