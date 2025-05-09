import React from "react";

import "../customer/css/customer.css";

const SalesList = (props) => {
  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
          <span className="text-muted fw-light"></span> Sales
        </h4>
 
          <div className="row">
            <div className="col">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="table-responsive text-nowrap">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Project</th>
                          <th>Client</th>
                          <th>Users</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="table-border-bottom-0">
                        <tr>
                          <td>
                            <i className="fab fa-angular fa-lg text-danger me-3"></i>{" "}
                            <strong>Angular Project</strong>
                          </td>
                          <td>Albert Cook</td>
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
                                <a
                                  className="dropdown-item"
                                  href="/"
                                >
                                  <i className="bx bx-edit-alt me-1"></i> Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="/"
                                >
                                  <i className="bx bx-trash me-1"></i> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="fab fa-react fa-lg text-info me-3"></i>{" "}
                            <strong>React Project</strong>
                          </td>
                          <td>Barry Hunter</td>
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
                                <a
                                  className="dropdown-item"
                                  href="/"
                                >
                                  <i className="bx bx-edit-alt me-1"></i> Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="/"
                                >
                                  <i className="bx bx-trash me-1"></i> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="fab fa-vuejs fa-lg text-success me-3"></i>{" "}
                            <strong>VueJs Project</strong>
                          </td>
                          <td>Trevor Baker</td>
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
                            <span className="badge bg-label-info me-1">
                              Scheduled
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
                                <a
                                  className="dropdown-item"
                                  href="/"
                                >
                                  <i className="bx bx-edit-alt me-1"></i> Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  href="/"
                                >
                                  <i className="bx bx-trash me-1"></i> Delete
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <i className="fab fa-bootstrap fa-lg text-primary me-3"></i>{" "}
                            <strong>Bootstrap Project</strong>
                          </td>
                          <td>Jerry Milton</td>
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
                            <span className="badge bg-label-warning me-1">
                              Pending
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
                </div>
              </div>
            </div>
          </div>
      
      </div>
    </>
  );
};

export default SalesList;
