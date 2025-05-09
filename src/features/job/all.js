import React from "react";

const DataList = (props) => {

  const [selectedRow, setSelectedRow] = React.useState(-1);

  return (
    <>
      {/* <div className="container-xxl flex-grow-1 container-p-y">
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
                      <span className="text-muted fw-light"></span> Pull & Merge
                      - Data read from Mail
                    </h4>
                  </div>
                  <div className="col">
                    <button type="button" className="btn btn-info  float-end">
                      Pull Data
                    </button>
                  </div>
                </div> */}
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Agent</th>
                        <th>Assigned</th>                        
                        <th>Created</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      <tr key='1' onClick={() => setSelectedRow('1')} className={"clickable-row ".concat(selectedRow === '1' ? "selected" : "")}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td>
                          101
                        </td>
                        <td>
                          Name 1
                        </td>
                        <td>
                          <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                            <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title="Lilian Fuller"
                            >
                              <img
                                src="../assets/img/avatars/5.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </li>                           
                          </ul>
                        </td>
                        <td>
                          <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                            
                            <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title="Sophia Wilkerson"
                            >
                              <img
                                src="../assets/img/avatars/6.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </li>
                            {/* <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title="Christina Parker"
                            >
                              <img
                                src="../assets/img/avatars/7.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </li> */}
                          </ul>
                        </td>
                       
                        <td>
                          03-03-2023
                        </td>
                        <td>
                          <span className="badge bg-label-danger me-1">
                            High
                          </span>
                        </td>                    
                        <td>
                          <span className="badge bg-label-primary me-1">
                            Active
                          </span>
                        </td>
                        
                        <td>
                          <div className="dropdown">
                            <button
                              type="button"
                              class="btn p-0 dropdown-toggle hide-arrow"
                              data-bs-toggle="dropdown"
                            >
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="/">
                                <i className="bx bx-edit-alt me-1"></i> Edit
                              </a>
                              <a className="dropdown-item" href="/">
                                <i className="bx bx-trash me-1"></i> Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr key='2' onClick={() => setSelectedRow('2')} className={"clickable-row ".concat(selectedRow === '2' ? "selected" : "")}>
                      <td>
                          <input type="checkbox" />
                        </td>
                        <td>
                          101
                        </td>
                        <td>
                          Name 1
                        </td>
                        <td>
                        <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                            
                             <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title="Christina Parker"
                            >
                              <img
                                src="../assets/img/avatars/7.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </li> 
                          </ul>
                        </td>
                        <td>
                        <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                            
                            <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title="Sophia Wilkerson"
                            >
                              <img
                                src="../assets/img/avatars/6.png"
                                alt="Avatar"
                                className="rounded-circle"
                              />
                            </li>
                           
                          </ul>
                        </td>
                        
                        <td>
                          03-03-2023
                        </td>
                        <td>
                          <span className="badge bg-label-danger me-1">
                            High
                          </span>
                        </td>                    
                        <td>
                          <span className="badge bg-label-success me-1">
                            Completed
                          </span>
                        </td>
                        <td>
                          <div className="dropdown">
                            <button
                              type="button"
                              className="btn p-0 dropdown-toggle hide-arrow"
                              data-bs-toggle="dropdown"
                            >
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="/">
                                <i className="bx bx-edit-alt me-1"></i> Edit
                              </a>
                              <a className="dropdown-item" href="/">
                                <i className="bx bx-trash me-1"></i> Delete
                              </a>
                            </div>
                          </div>
                        </td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
              {/* </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default DataList;
