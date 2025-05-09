import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import ActionButtonGroup from "./ActionButtonGroup";
import employeeService from "../../../services/employeeService";

const CreateEditEmployee = ({
  user,
  isEdit,
  reloadCallback,
  showUpdateButton,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const title =
    isEdit && user && user.firstName
      ? `Employee - ${user.firstName} ${user.middleName} ${user.lastName}`
      : "";

  useEffect(() => {
    if (isEdit && user && user.firstName) {
      setValue("firstName", user.firstName);
      setValue("middleName", user.middleName);
      setValue("lastName", user.lastName);
      setValue("phone", user.phone);
      setValue("email", user.email);
      setValue("address", user.address);
      setValue("status", user.status);
      setValue("role", user.roleId);
    }
  }, [isEdit, user, setValue]);

  const onSubmitHandler = async (data) => {
    try {
      if (data.status === "1") data.status = true;
      else data.status = false;

      if (isEdit && user && user.id) {
        await updateFormData(user.id, data);
      } else {
        await saveFormData(data);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const saveFormData = async (data) => {
    try {
      const response = await employeeService.createEmployee(data);
      
      if (response.data.status === 409){
        NotificationManager.error(response.data.message, "Error!", 2500)
      } else if (response.data.status === 500) {
        NotificationManager.error('Internal server error', "Error!", 2500);
      } else {
        NotificationManager.success(response.data.message, "Success!", 2500);
        reset();
      }
      
     
    } catch (error) {
      console.error("Error creating employee:", error);
      NotificationManager.error(`${error.response.data.error}`, "Error!", 2500);
    }
  };

  const updateFormData = async (userId, data) => {
    try {
      const response = await employeeService.updateEmployee(userId, data);
      const updatedEmployee = response.data;
      console.dir(updatedEmployee);
      
      NotificationManager.success(response.data.message, "Success!", 2000);
      reset();
      reloadCallback();
    } catch (error) {
      console.error("Error updating employee:", error);
      NotificationManager.error(error.response.data.error, "Error", 2000);
    }
  };

  const resetCallback = () => {
    reset(); // Reset the form fields
  };

  const reloadCallbackFn = () => {
    reloadCallback();
  };

  const validatePassword = (value) => {
    const password = watch("password"); // Get the value of the password field
    return value === password || "Passwords do not match";
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
                    htmlFor="firstName"
                    className="col-md-2 col-form-label"
                  >
                    First Name
                  </label>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      type="text"
                      id="firstName"
                      {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        First name is required
                      </div>
                    )}
                  </div>
                  <label
                    htmlFor="middleName"
                    className="col-md-2 col-form-label"
                  >
                    Middle Name
                  </label>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      type="text"
                      id="middleName"
                      {...register("middleName")}
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="lastName" className="col-md-2 col-form-label">
                    Last Name
                  </label>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      type="text"
                      id="lastName"
                      {...register("lastName", { required: true })}
                    />
                    {errors.last_name && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        Last name is required
                      </div>
                    )}
                  </div>
                  <label htmlFor="phone" className="col-md-2 col-form-label">
                    Phone
                  </label>
                  <div className="col-md-4">
                  <input
                      className="form-control"
                      type="text"
                      id="phone"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                         
                          value : /^[\+0-9]{6,15}$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                    />
                     {errors.phone && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {errors.phone.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-md-2 col-form-label">
                    Email
                  </label>
                  <div className="col-md-4">
                  <input
                      className="form-control"
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                     {errors.email && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <label htmlFor="address" className="col-md-2 col-form-label">
                    Address
                  </label>
                  <div className="col-md-4">
                    <textarea
                      className="form-control"
                      rows="2"
                      id="address"
                      {...register("address", { required: true })}
                    />
                    {errors.address && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        Address is required
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3 row">
                  <label htmlFor="role" className="col-md-2 col-form-label">
                    Role
                  </label>
                  <div className="col-md-4">
                    <select
                      id="role"
                      className="form-control"
                      {...register("role", { required: true })}
                    >
                      {/* <option value="">Select role</option> */}

                      {/* <option value="2">Admin</option> */}
                      <option value="4">Manager</option>
                    </select>
                    {errors.role && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        Role is required
                      </div>
                    )}
                  </div>
                  <label htmlFor="status" className="col-md-2 col-form-label">
                    Status
                  </label>
                  <div className="col-md-4">
                    <select
                      id="status"
                      className="form-control"
                      {...register("status", { required: true })}
                    >
                      <option value="">Select status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                    {errors.status && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        Status is required
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="col"> */}
            {/* {!isEdit ? ( */}
              <div className="mb-3 row">
                <label htmlFor="password" className="col-md-2 col-form-label">
                  Password
                </label>
                <div className="col-md-4">
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    {...register("password", {
                      required: !isEdit ? "Password is required": false,
                    })}
                  />
                  {errors.password && (
                    <div
                      className="text-danger"
                      style={{ marginTop: "0.25rem", fontSize: "80%" }}
                    >
                      {errors.password.message}
                    </div>
                  )}
                </div>
              {/* </div> */}
            {/* ) : (
              ""
            )} */}
            {/* </div> */}
            {/* <div className="w-100"></div> */}
            {/* <div className="row">
            <div className="col"> */}
              {/* {!isEdit ? ( */}
                {/* <div className="mb-3 row"> */}
                  <label htmlFor="confirmPassword" className="col-md-2 col-form-label">
                    Confirm Password
                  </label>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      type="password"
                      id="cpassword"
                      {...register("cpassword", {
                        required: !isEdit ? "Confirm Password is required": false,
                        validate: validatePassword,
                      })}
                    />
                    {errors.cpassword && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {errors.cpassword.message}
                      </div>
                    )}
                  </div>
                </div>
              {/* ) : (
                ""
              )}        */}
            </div>

            </div>
          {/* </div>
        </div> */}

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

{
  /* <div className="row">
<div className="col">
                {!isEdit ? 
                <div className="mb-3 row">
                  <label for="email" className="col-md-4 col-form-label">
                    Password
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div> : ''
                }
              </div>

              <div className="w-100"></div>
              <div className="col">
              {!isEdit ? 
                <div className="mb-3 row">
                  <label for="email" className="col-md-4 col-form-label">
                    Confirm Password
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="password"
                      id="cpassword"
                      {...register("cpassword", {
                        required: "Confirm Password is required",
                        validate: validatePassword,
                      })}
                    />
                    {errors.cpassword && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {errors.cpassword.message}
                      </div>
                    )}
                  </div>
                </div> : ''
              } */
}
