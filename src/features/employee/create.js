import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import ActionButtonGroup from "./components/actionButtonGroup";

const CreateEditEmployee = ({ user, isEdit, reloadCallback }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const title =
    isEdit && user && user.first_name
      ? `Employee - ${user.first_name} ${user.middle_name} ${user.last_name}`
      : "";

  useEffect(() => {
    if (isEdit && user && user.first_name) {
      setValue("first_name", user.first_name);
      setValue("middle_name", user.middle_name);
      setValue("last_name", user.last_name);
      setValue("phone", user.phone);
      setValue("email", user.email);
      setValue("address", user.address);
      setValue("status", user.is_active ? "1" : "2");
      setValue("role", user.role && user.role[0] ? user.role[0].name : "");
    }
  }, [isEdit, user, setValue]);

  const onSubmitHandler = (data) => {
    // Simulate API call
    if (isEdit && user && user.id) {
      updateFormData(user.id, data);
    } else {
      saveFormData(data);
    }
  };

  const saveFormData = (data) => {
    // Simulate API call
    const newEmployee = { ...data, id: Math.floor(Math.random() * 1000) };
    console.dir(newEmployee);
    reset(); // Reset the form fields
    NotificationManager.success("Added a new employee!", "Success!", 2000);
  };

  const updateFormData = (userId, data) => {
    // Simulate API call
    const updatedEmployee = { ...data, id: userId };
    console.dir(updatedEmployee);
    NotificationManager.success("Updated employee!", "Success!", 2000);
    reloadCallbackFn();
  };

  const resetCallback = () => {
    reset(); // Reset the form fields
  };

  const reloadCallbackFn = () => {
    reloadCallback();
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
            <span className="text-muted fw-light">{title ? title : ""}</span>
          </h4>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="mb-3 row">
                  <label
                    htmlFor="first_name"
                    className="col-md-4 col-form-label"
                  >
                    First Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className={`form-control ${
                        errors.first_name ? "is-invalid" : ""
                      }`}
                      type="text"
                      id="first_name"
                      {...register("first_name", { required: true })}
                    />
                    {errors.first_name && (
                      <div className="invalid-feedback">First name is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                  <label
                    htmlFor="middle_name"
                    className="col-md-4 col-form-label"
                  >
                    Middle Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="middle_name"
                      {...register("middle_name")}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                  <label htmlFor="last_name" className="col-md-4 col-form-label">
                    Last Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className={`form-control ${
                        errors.last_name ? "is-invalid" : ""
                      }`}
                      type="text"
                      id="last_name"
                      {...register("last_name", { required: true })}
                    />
                    {errors.last_name && (
                      <div className="invalid-feedback">Last name is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-100"></div>
              <div className="col">
                <div className="mb-3 row">
                  <label htmlFor="phone" className="col-md-4 col-form-label">
                    Phone
                  </label>
                  <div className="col-md-8">
                    <input
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      type="text"
                      id="phone"
                      {...register("phone", { required: true })}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">Phone number is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-md-4 col-form-label">
                    Email
                  </label>
                  <div className="col-md-8">
                    <input
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      type="text"
                      id="email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">Email is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                  <label
                    htmlFor="address"
                    className="col-md-4 col-form-label"
                  >
                    Address
                  </label>
                  <div className="col-md-8">
                    <textarea
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      type="text"
                      rows="2"
                      id="address"
                      {...register("address", { required: true })}
                    />
                    {errors.address && (
                      <div className="invalid-feedback">Address is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-100"></div>
              <div className="col">
                <div className="mb-3 row">
                  <label htmlFor="status" className="col-md-4 col-form-label">
                    Status
                  </label>
                  <div className="col-md-8">
                    <select
                      id="status"
                      className={`form-select ${errors.status ? "is-invalid" : ""}`}
                      {...register("status", { required: true })}
                    >
                      <option value="">Select status</option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                    {errors.status && (
                      <div className="invalid-feedback">Status is required</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                  <label htmlFor="role" className="col-md-4 col-form-label">
                    Role
                  </label>
                  <div className="col-md-8">
                    <select
                      id="role"
                      className={`form-select ${errors.role ? "is-invalid" : ""}`}
                      {...register("role", { required: true })}
                    >
                      <option value="">Select role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                    {errors.role && (
                      <div className="invalid-feedback">Role is required</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ActionButtonGroup
          isEdit={isEdit}
          resetCallback={resetCallback}
          submitting={false}
        />
      </form>
    </>
  );
};

export default CreateEditEmployee;
