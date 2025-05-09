import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ActionButtonGroup from "../../Employee/components/ActionButtonGroup";
import { NotificationManager } from "react-notifications";
import clientService from "../../../services/clientService";
import planService from "../../../services/planService";

const CreateEditClient = ({
  name,
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
    isEdit && user && user.clientName ? `Client - ${user.clientName}` : "";

    const [plans,setPlans] = useState([]);
    const selectedPlan = watch('plan')

    async function fetchPlans() {
      await planService.getPlan()
      .then(async (response) => {
        console.log(response.data.data);
        await setPlans(response.data.data)
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(error.response.error)
      });
    }
    
    useEffect(() => {
       fetchPlans()
    },[])
console.log("plans****:",plans)
  useEffect(() => {
    // console.log("isEdit " + isEdit);
    if (isEdit && user && user.clientName) {
      setValue("clientName", user.clientName);
      setValue("address", user.address);
      setValue("city", user.city);
      setValue("plan", user.planId)
      setValue("location", user.location);
      setValue("country", user.country);
      setValue("status", user.status);
      setValue("firstName", user.firstName);
      setValue("middleName", user.middleName);
      setValue("lastName", user.lastName);
      setValue("phone", user.phone);
      setValue("email", user.email);
    }
  }, [isEdit, user, setValue]);
  // },[user])

  const onSubmitHandler = async (data) => {
    console.log(data);
    try {
      // if (data.status === "1") data.status = true;
      // else data.status = false;

      if (isEdit && user && user.id) {
        console.log("Inside updateFormData");
        await updateFormData(user.id, data);
      } else {
        await saveFormData(data);
      }
    } catch (error) {
      alert(`Registration failed! ${error.message}`);
      console.error("Form submission error:", error);
    }
  };

  const saveFormData = async (data) => {
    clientService
      .createClient(data)
      .then(async (response) => {
        console.dir(response);
        if (response.data.status === 409){
          NotificationManager.error(response.data.message, "Error!")
        } else if (response.data.status === 500) {
          NotificationManager.error('Internal server error', "Error!");
        } else {
          NotificationManager.success(response.data.message, "Success!", 2500);
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          `${error.response.data.error}`,
          "Error!",
          2500
        );
      });
  };

  const updateFormData = async (userId, data) => {
    // data.id = userId;
    clientService
      .updateClient(userId, data)
      .then((response) => {
        console.log(response)
        if (response.data.status === 409){
          NotificationManager.error(response.data.error, "Error!", 2500)
        } else if (response.data.status === 500) {
          NotificationManager.error('Internal server error', "Error!", 2500);
        } else {
          NotificationManager.success(response.data.message, "Success!", 2500);
          reset();
        }
        reloadCallbackFn();
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(error.response.data.error, "Error!");
      });
  };

  const resetCallback = () => {
    reset();
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
              <div className="col-md-6">
                <div className="mb-3 row">
                  <label
                    htmlFor="clientName"
                    className="col-md-4 col-form-label"
                  >
                    Client
                    {/* {moduleType === "client" ? "Client Name" : "Company Name"} */}
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="clientName"
                      {...register("clientName", {
                        required: "true",
                      })}
                    />
                    {errors.clientName && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        Client name is required
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="address" className="col-md-4 col-form-label">
                    Address
                  </label>
                  <div className="col-md-8">
                    <textarea
                      className="form-control"
                      type="text"
                      rows="2"
                      id="address"
                      {...register("address", {
                        required: "true",
                      })}
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

                <div className="mb-3 row">
                  <label htmlFor="city" className="col-md-4 col-form-label">
                    City
                  </label>
                  <div className="col-md-8">
                    <select
                      id="city"
                      className="form-select"
                      {...register("city", { required: "true" })}
                    >
                      <option value="">Select City</option>
                      <option value="0">Abu Dhabi</option>
                      <option value="1">Dubai</option>
                      <option value="2">Sharjah</option>
                      <option value="3">Ajman</option>
                      <option value="4"> Umm Al Quwain</option>
                      <option value="5">Ras Al Khaimah</option>
                      <option value="6">Fujairah</option>
                    </select>
                    {errors.city && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        City is required
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="plan" className="col-md-4 col-form-label">
                    Plans
                  </label>
                  
                  <div className="col-md-8">
                  <select
                      id="plan"
                      name="plan"
                      className="form-select"
                      {...register("plan", { required: "true" })}
                    >
                      <option value="">Select Plan</option>
                      {plans && plans.map((plan) => (
                        <option key={plan.id} value={plan.id}>
                          {plan.planName}
                        </option>
                      ))}
                     
                    </select>
                  
                    {errors.plan && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                       Select a Plan!
                      </div>
                    )}
                  </div>
                </div>

              </div>


              <div className="col-md-6">
                <div className="mb-3 row">
                  <label htmlFor="location" className="col-md-4 col-form-label">
                    Location
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="location"
                      {...register("location", {
                        required: "true",
                      })}
                    />
                    {errors.location && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        Location is required
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="country" className="col-md-4 col-form-label">
                    Country
                  </label>
                  <div className="col-md-8">
                    <select
                      id="country"
                      className="form-select"
                      {...register("country", {
                        required: "true",
                      })}
                    >
                      <option value="">Select Country</option>
                      <option value="1">UAE</option>
                      <option value="2">India</option>
                    </select>
                    {errors.country && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        Country is required
                      </div>
                    )}
                  </div>
                </div>

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
                </div>
              </div>

              <div className="col-12">
                <div className="divider divider-success">
                  <div className="divider-text">Contact Details</div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label
                    htmlFor="firstName"
                    className="col-md-4 col-form-label"
                  >
                    First Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="firstName"
                      {...register("firstName", {
                        required: "true",
                      })}
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
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label
                    htmlFor="middleName"
                    className="col-md-4 col-form-label"
                  >
                    Middle Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="middleName"
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="lastName" className="col-md-4 col-form-label">
                    Last Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="lastName"
                      {...register("lastName", {
                        required: "lastName",
                      })}
                    />
                    {errors.lastName && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        Last name is required
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="phone" className="col-md-4 col-form-label">
                    Phone
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="phone"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^[\+0-9]{6,15}$/,
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
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-md-4 col-form-label">
                    Email
                  </label>
                  <div className="col-md-8">
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
                </div>
              </div>

              {/* {!isEdit ? ( */}
              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="password" className="col-md-4 col-form-label">
                    Password
                  </label>
                  <div className="col-md-8">
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
                </div>
              </div>
              {/* ) : (
                ""
              )} */}
              {/* {!isEdit ? ( */}
              <div className="col-md-4">
                <div className="mb-3 row">
                  <label
                    htmlFor="confirmPassword"
                    className="col-md-4 col-form-label"
                  >
                    Confirm Password
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="password"
                      id="cpassword"
                      {...register("cpassword", {
                        required: !isEdit
                          ? "Confirm Password is required"
                          : false,
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
              </div>
              {/* ) : (
                ""
              )} */}
            </div>

            <ActionButtonGroup
              isEdit={isEdit}
              resetCallback={resetCallback}
              submitting={false}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateEditClient;
