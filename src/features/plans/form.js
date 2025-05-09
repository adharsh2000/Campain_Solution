import React, { useEffect, useState } from "react";
import ActionButton from "../ui/components/actionButton";
import axios from "axios";
// React Notification
import { NotificationManager } from "react-notifications";

const CreateEditPlans = ({ name, user, isEdit, reloadCallback }) => {
  const [roles, setRoles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // prevent default form submission
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="mb-3 row">
                  <label for="first_name" className="col-md-4 col-form-label">
                    Plan Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="first_name"
                    />
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="mb-3 row">
                  <label for="last_name" className="col-md-4 col-form-label">
                    Price
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="last_name"
                    />
                  </div>
                </div>
              </div>
              <div className="w-100"></div>

              <div className="col">
                <div className="mb-3 row">
                  <label for="email" className="col-md-4 col-form-label">
                    Status
                  </label>
                  <div className="col-md-8">
                    <select id="status" className="form-select">
                      <option value="1">Active</option>
                      <option value="2">InActive</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="w-100"></div>
             
              <div className="col">
                <div className="mb-3 row">
                  <label for="address" className="col-md-4 col-form-label">
                    Description
                  </label>
                  <div className="col-md-8">
                    <textarea
                      className="form-control"
                      type="text"
                      rows="2"
                      id="address"
                    />
                  </div>
                </div>
              </div>
              <div className="w-100"></div>

              <div className="col">
                <div className="mb-3 row"></div>
              </div>
              <div className="col">
                <div className="mb-3 row"></div>
              </div>
              <div className="w-100"></div>
              <div className="col">
                <div className="mb-3 row">
                  <ActionButton isEdit={isEdit} isSubmit={submitting} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateEditPlans;
