import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ActionButton from "../../../features/ui/components/actionButton";
import axios from "axios";
// React Notification
import { NotificationManager } from "react-notifications";

const CreateEditRole = ({ name, user, isEdit, reloadCallback }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const onSubmitHandler = async (data) => {
    try {
      setSubmitting(true);
      // Make API request
      console.log(data);
      reset();
      // Show success notification
      NotificationManager.success("Success");
    } catch (error) {
      console.error(error);
      NotificationManager.error("Attempt Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="mb-3 row">
                  <label
                    htmlFor="role_name"
                    className="col-md-4 col-form-label"
                  >
                    Role Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="role_name"
                      {...register("roleName", {
                        required: "true",
                      })}
                    />
                    {errors.roleName && (
                     <div
                     className="text-danger"
                     style={{ marginTop: "0.25rem", fontSize: "80%" }}
                   >Role Name is required
                   </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="mb-3 row">
                  <label htmlFor="status" className="col-md-4 col-form-label">
                    Status
                  </label>
                  <div className="col-md-8">
                    <select
                      id="status"
                      className="form-select"
                      {...register("status", {
                        required: "true",
                      })}
                    >
                      <option value="">Select</option>
                      <option value="1">Active</option>
                      <option value="2">InActive</option>
                    </select>
                    {errors.status && (
                     <div
                     className="text-danger"
                     style={{ marginTop: "0.25rem", fontSize: "80%" }}
                   >Status is Required
                   </div>
                    )}
                  </div>
                </div>
              </div>
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

export default CreateEditRole;
