import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import ActionButton from "../../../features/ui/components/actionButton";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import planService from "../../../services/planService";
import { plansMockData } from "../../client/MockData";

const CreateEditPlans = ({ name, user, isEdit, reloadCallback }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  // const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    console.log("isEdit "+isEdit);
    if (isEdit && user && user.planName) {
      setValue("planName", user.planName);
      setValue("status", user.status ? "1" : "2");
      setValue("price", user.price);
      setValue("description", user.description);
      setValue("emailLimit", user.emailLimit)

    }
  },[user])

  const onSubmitHandler = async (data) => {
    console.log(data);
    try {
      if (data.status === "1") data.status = true;
      else data.status = false;

      if (isEdit && user && user.id) {
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
   planService
      .createPlan(data)
      .then(async (response) => {
      console.dir(response);
        reset();
        NotificationManager.success("Added new Plan!", "Success", 2000);
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while creating new Plan!", "Error");
      });
  };

  const updateFormData = async (userId, data) => {
    // data.id = userId;
   planService
      .updatePlan(userId,data)
      .then( async(response) => {
        console.dir(response);
        NotificationManager.success("Plan Updated !", "Success", 2000);
        reloadCallbackFn();
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while updating Plan!", "Error!");
      });
  };


  // const resetCallback = () => {
  //   reset();
  // };
  
  const reloadCallbackFn = () => {
    reloadCallback();
  };


  const handleReset = () => {
    reset(); // Reset the form fields
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
                    htmlFor="planName"
                    className="col-md-4 col-form-label"
                  >
                    Plan Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="planName"
                      {...register("planName", {
                        required: "Plan Name is required",
                      })}
                    />
                    {errors.planName && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {errors.planName.message}
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
                        required: "Status is required",
                      })}
                    >
                      <option value="">Select</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                    {errors.status && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {errors.status.message}
                      </div>
                    )}
                  </div>
                </div>

                
                  <div className="mb-3 row">
                  <label htmlFor="emailLimit" className="col-md-4 col-form-label">
                    Email Limit
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="emailLimit"
                      {...register("emailLimit", { required: "Email Limit is required" })}
                    />
                    {errors.emailLimit && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {errors.emailLimit.message}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              <div className="col">
                <div className="mb-3 row">
                  <label htmlFor="price" className="col-md-4 col-form-label">
                    Price
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="price"
                      {...register("price", { required: "Price is required" })}
                    />
                    {errors.price && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {errors.price.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    htmlFor="description"
                    className="col-md-4 col-form-label"
                  >
                    Description
                  </label>
                  <div className="col-md-8">
                    <textarea
                      className="form-control"
                      rows="2"
                      id="description"
                      {...register("description", {
                        required: "Description is required",
                      })}
                    ></textarea>
                    {errors.description && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "0.25rem", fontSize: "80%" }}
                      >
                        {errors.description.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="mb-3 row"></div>
              </div>
              <div className="col">
                <div className="mb-3 row"></div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                  <ActionButton
                    isEdit={isEdit}
                    isSubmit={false}
                    onSubmit={handleSubmit(onSubmitHandler)}
                    onReset={handleReset}
                  />
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
