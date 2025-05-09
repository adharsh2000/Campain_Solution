import React from "react";

import "../customer/css/customer.css";
import AddDeleteTableRows from "../../features/ui/table/AddDeleteTableRows";

const CreateSales = (props) => {
  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
          <span className="text-muted fw-light"></span> Create Sales
        </h4>
        <form>
          <div className="row">
            <div className="col">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-12">
                      <div class="divider text-start-center">
                        <div class="divider-text">
                          <h6 class="mb-0">Basic Details</h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          
                          <div className="row mb-3">
                            <label
                              className="col-sm-2 col-form-label"
                              for="basic-default-name"
                            >
                              Contact
                            </label>
                            <div className="col-sm-3">
                              <input
                                type="text"
                                className="form-control"
                                id="name-title"
                                placeholder="Salutation"
                              />
                            </div>
                            <div className="col-sm-7">
                              <input
                                type="text"
                                id="first-name"
                                className="form-control"
                                placeholder="First Name"
                                aria-label="First Name"
                                aria-describedby="first-name"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              className="col-sm-2 col-form-label"
                              for="company-name"
                            >
                              Company
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="company-name"
                                placeholder="Company Name"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              className="col-sm-2 col-form-label"
                              for="basic-default-email"
                            >
                              Email
                            </label>
                            <div className="col-sm-10">
                              <div className="input-group input-group-merge">
                                <input
                                  type="text"
                                  id="basic-default-email"
                                  className="form-control"
                                  placeholder="john.doe"
                                  aria-label="john.doe"
                                  aria-describedby="basic-default-email2"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          
                          <div className="row mb-3">
                            <label
                              className="col-sm-3 col-form-label"
                              for="last-name"
                            >
                              Last Name
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                id="last-name"
                                placeholder="Last Name"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              className="col-sm-3 col-form-label"
                              for="basic-default-message"
                            >
                              Display Name
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                id="display-name"
                                className="form-control"
                                placeholder="Customer Display Name"
                                aria-label="Customer Display Name"
                                aria-describedby="display-name"
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              className="col-sm-3 col-form-label"
                              for="basic-default-message"
                            >
                              Phone
                            </label>
                            <div className="col-sm-9">
                              <div class="input-group">
                                <input
                                  type="text"
                                  aria-label="First name"
                                  class="form-control"
                                  placeholder="Work"
                                />
                                <input
                                  type="text"
                                  aria-label="Last name"
                                  class="form-control"
                                  placeholder="Mobile"
                                />
                              </div>
                            </div>
                          </div>
                          {/* <div className="row justify-content-end">
                          <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">
                              Send
                            </button>
                          </div>
                        </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div class="divider text-start-center">
                        <div class="divider-text">
                          <h6 class="mb-0">Other Details</h6>
                        </div>
                      </div>
                      <div class="demo-inline-spacing mt-3">
                        <div class="list-group list-group-horizontal-md text-md-center">
                          <a
                            class="list-group-item list-group-item-action active"
                            id="gst-list-item"
                            data-bs-toggle="list"
                            href="#horizontal-gst"
                          >
                            GST
                          </a>
                          <a
                            class="list-group-item list-group-item-action"
                            id="address-list-item"
                            data-bs-toggle="list"
                            href="#horizontal-address"
                          >
                            Address
                          </a>
                          <a
                            class="list-group-item list-group-item-action"
                            id="contact-list-item"
                            data-bs-toggle="list"
                            href="#horizontal-contact"
                          >
                            Contact Persons
                          </a>
                          <a
                            class="list-group-item list-group-item-action"
                            id="custom-fields-list-item"
                            data-bs-toggle="list"
                            href="#horizontal-custom-fields"
                          >
                            Custom Fields
                          </a>
                        </div>
                        <div class="tab-content px-0 mt-0">
                          <div
                            class="tab-pane fade show active"
                            id="horizontal-gst"
                          >
                            <div className="row">
                              <div className="col">
                                <div className="row mb-3">
                                  <label
                                    className="col-sm-2 col-form-label"
                                    for="basic-default-name"
                                  >
                                    GST Type
                                  </label>
                                  <div className="col-sm-10">
                                    <select
                                      id="defaultSelect"
                                      class="form-select"
                                    >
                                      <option>GST Type</option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col">
                                <div className="row mb-3">
                                  <label
                                    className="col-sm-3 col-form-label"
                                    for="basic-default-message"
                                  >
                                    GST No.
                                  </label>
                                  <div className="col-sm-9">
                                    <input
                                      type="text"
                                      id="gst-no"
                                      className="form-control"
                                      placeholder="GST Number"
                                      aria-label="GST Number"
                                      aria-describedby="gst-no"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="tab-pane fade" id="horizontal-address">
                            {/* --------------- Address --------------- */}
                            <div className="row">
                              {/* --------------- Billing Address --------------- */}
                              <div className="col">
                                <div
                                  class="d-flex align-items-center justify-content-between"
                                  style={{ marginTop: "-15px" }}
                                >
                                  <h6 style={{ textTransform: "uppercase" }}>
                                    Billing Address
                                  </h6>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    className="col-sm-2 col-form-label"
                                    for="bill-name"
                                  >
                                    Contact
                                  </label>
                                  <div className="col-sm-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="bill-salutation"
                                      placeholder="Salutation"
                                    />
                                  </div>
                                  <div className="col-sm-7">
                                    <input
                                      type="text"
                                      id="bill-name"
                                      className="form-control"
                                      placeholder="Name"
                                      aria-label="Name"
                                      aria-describedby="bill-name"
                                    />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    class="col-sm-2 col-form-label"
                                    for="bill-address"
                                  >
                                    Address
                                  </label>
                                  <div class="col-sm-10">
                                    <textarea
                                      id="bill-address"
                                      class="form-control"
                                      placeholder="Address"
                                      aria-label="Address"
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    className="col-sm-2 col-form-label"
                                    for="basic-default-message"
                                  >
                                    Location
                                  </label>
                                  <div className="col-sm-10">
                                    <div class="input-group">
                                      <input
                                        type="text"
                                        aria-label="City"
                                        class="form-control"
                                        placeholder="City"
                                      />
                                      <input
                                        type="text"
                                        aria-label="State"
                                        class="form-control"
                                        placeholder="State"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    className="col-sm-2 col-form-label"
                                    for="basic-default-message"
                                  ></label>
                                  <div className="col-sm-10">
                                    <div class="input-group">
                                      <select
                                        id="bill-country"
                                        class="form-select"
                                      >
                                        <option>Country</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                      </select>
                                      <input
                                        type="text"
                                        aria-label="bill-zip"
                                        class="form-control"
                                        placeholder="Zip"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* --------------- Shipping Address --------------- */}
                              <div className="col">
                                <div
                                  className="d-flex align-items-center justify-content-between"
                                  style={{ marginTop: "-15px" }}
                                >
                                  <h6 style={{ textTransform: "uppercase" }}>
                                    Shipping Address
                                  </h6>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    className="col-sm-2 col-form-label"
                                    for="ship-name"
                                  >
                                    Contact
                                  </label>
                                  <div className="col-sm-3">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="ship-title"
                                      placeholder="Salutation"
                                    />
                                  </div>
                                  <div className="col-sm-7">
                                    <input
                                      type="text"
                                      id="ship-name"
                                      className="form-control"
                                      placeholder="Name"
                                      aria-label="Name"
                                      aria-describedby="ship-name"
                                    />
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    class="col-sm-2 col-form-label"
                                    for="ship-address"
                                  >
                                    Address
                                  </label>
                                  <div class="col-sm-10">
                                    <textarea
                                      id="ship-address"
                                      class="form-control"
                                      placeholder="Address"
                                      aria-label="Address"
                                    ></textarea>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    className="col-sm-2 col-form-label"
                                    for="ship-location"
                                  >
                                    Location
                                  </label>
                                  <div className="col-sm-10">
                                    <div class="input-group">
                                      <input
                                        type="text"
                                        aria-label="City"
                                        class="form-control"
                                        placeholder="City"
                                        id="ship-city"
                                      />
                                      <input
                                        type="text"
                                        aria-label="State"
                                        class="form-control"
                                        placeholder="State"
                                        id="ship-state"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row mb-3">
                                  <label
                                    className="col-sm-2 col-form-label"
                                    for="basic-default-message"
                                  ></label>
                                  <div className="col-sm-10">
                                    <div class="input-group">
                                      <select
                                        id="ship-country"
                                        class="form-select"
                                      >
                                        <option>Country</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                      </select>
                                      <input
                                        type="text"
                                        aria-label="ship-zip"
                                        class="form-control"
                                        placeholder="Zip"
                                        id="ship-zip"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="tab-pane fade" id="horizontal-contact">
                            <AddDeleteTableRows />
                          </div>
                          <div
                            class="tab-pane fade"
                            id="horizontal-custom-fields"
                          >
                            Custom Fields
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};


export default CreateSales;
