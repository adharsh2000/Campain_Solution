import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NotificationManager } from "react-notifications";
import ActionButtonGroup from "../../features/employee/components/actionButtonGroup";
import adminService from "../../services/adminUserService";
import adminUserService from "../../services/adminUserService";

const CreateEditAdmin = ({
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

  const title = isEdit && user && user.name ? `Admin - ${user.name} ` : "";

  useEffect(() => {
    if (isEdit && user && user.name) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("status", user.status ? "1" : "0");
    }
  }, [isEdit, user, setValue]);

  const onSubmitHandler = async (data) => {
    try {
      console.log("DATA:", data);
      // console.log("USER ID: ", user.id)
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
      console.log("***", data);
      const response = await adminUserService.createAdminUser(data);
      const newAdmin = response.data;
      console.log(newAdmin);
      reset();
      NotificationManager.success("Added a new Admin!", "Success!", 2000);
    } catch (error) {
      console.error("Error creating Admin:", error);
      NotificationManager.error("Failed to add Admin", "Error", 2000);
    }
  };

  const updateFormData = async (userId, data) => {
    try {
      data.id = userId;
      console.log("data in updateFormData:", data);
      const response = await adminUserService.updateAdminUser(data);
      const updatedAdmin = response.data;
      console.log("updatedAdmin:", updatedAdmin);
      NotificationManager.success("Admin details Updated!", "Success!", 2000);
      reset();
      reloadCallback();
    } catch (error) {
      console.error("Error updating Admin:", error);
      NotificationManager.error("Failed to update Admin", "Error", 2000);
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
                  <label htmlFor="name" className="col-md-2 col-form-label">
                    Name
                  </label>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        Name is required
                      </div>
                    )}
                  </div>

                  <label htmlFor="email" className="col-md-2 col-form-label">
                    Email
                  </label>
                  <div className="col-md-4">
                    <input
                      className="form-control"
                      type="text"
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
                </div>
                <div className="mb-3 row"></div>
              </div>
            </div>

            <div className="mb-3 row">
              <label for="email" className="col-md-2 col-form-label">
                Password
              </label>
              <div className="col-md-4">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  {...register("password", {
                    required: !isEdit ? "Password is required" : false,
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
              <label htmlFor="email" className="col-md-2 col-form-label">
                Confirm Password
              </label>
              <div className="col-md-4">
                <input
                  className="form-control"
                  type="password"
                  id="cpassword"
                  {...register("cpassword", {
                    required: !isEdit ? "Confirm Password is required" : false,
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

            <div className="mb-3 row">
              <label htmlFor="status" className="col-md-2 col-form-label">
                Status
              </label>
              <div className="col-md-4">
                <select
                  id="status"
                  className="form-select"
                  {...register("status", {
                    required: "true",
                  })}
                >
                  <option value="">Select Status</option>
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
              {/* </div> */}
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

export default CreateEditAdmin;

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
