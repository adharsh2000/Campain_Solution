import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ActionButton from "../../../features/ui/components/actionButton";
import ActionButtonGroup from "../../Employee/components/ActionButtonGroup";
import { NotificationManager } from "react-notifications";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import contactService from "../../../services/contactService";

const CreateEditContact = ({
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
    control,
  } = useForm();

  const title =
    isEdit && user && user.firstName ? `Contact - ${user.firstName}  ` : "";

  useEffect(() => {
    console.log("isEdit", isEdit);
    if (isEdit && user) {
      const formattedDate = new Date(user?.dateOfBirth).toISOString().split("T")[0];
      
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("dateOfBirth", formattedDate ?? '');
      setValue("gender", user.gender);
      setValue("address", user.address);
      setValue("city", user.city);
      setValue("stateProvince", user.stateProvince);
      setValue("postalZip", user.postalZip); // Added postal code
      setValue("country", user.country);
      setValue("religion", user.religion);
      setValue("phone", user.phone);
      setValue("workNumber", user.workNumber);
      setValue("homeNumber", user.homeNumber);
      setValue("email", user.email);
      setValue("company", user.company);
    }
  }, [isEdit, user, setValue]);

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
    console.log("DATA: ",data)
    contactService
      .createContact(data)
      .then(async (response) => {
        console.dir(response);
        if (response.data.status === 409) {
          NotificationManager.error(response.data.message, "Error!", 2500);
        } else if (response.data.status === 500) {
          NotificationManager.error("Internal server error", "Error!", 2500);
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
    data.id = userId;
    contactService
      .updateContact(data, userId)
      .then(() => {
        NotificationManager.success("Updated Contact!", "Success", 2000);
        reloadCallbackFn();
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while updating Contact!", "Error!");
      });
  };

  const resetCallback = () => {
    reset();
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
              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="firstName" className="col-md-4 col-form-label">
                    First Name *
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="firstName"
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                    />
                    {errors.firstName && (
                      <div className="text-danger" style={{ marginTop: "0.25rem", fontSize: "80%" }}>
                        {errors.firstName.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="lastName" className="col-md-4 col-form-label">
                    Last Name *
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="lastName"
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                    />
                    {errors.lastName && (
                      <div className="text-danger" style={{ marginTop: "0.25rem", fontSize: "80%" }}>
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="dateOfBirth" className="col-md-4 col-form-label">
                    Date of Birth *
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="date"
                      id="dateOfBirth"
                      {...register("dateOfBirth", {
                        required: "Date of birth is required",
                      })}
                    />
                    {errors.dateOfBirth && (
                      <div className="text-danger" style={{ marginTop: "0.25rem", fontSize: "80%" }}>
                        {errors.dateOfBirth.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="gender" className="col-md-4 col-form-label">
                    Gender *
                  </label>
                  <div className="col-md-8">
                    <select
                      className="form-control"
                      id="gender"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <div className="text-danger" style={{ marginTop: "0.25rem", fontSize: "80%" }}>
                        {errors.gender.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="address" className="col-md-4 col-form-label">
                    Address
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="address"
                      {...register("address")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="city" className="col-md-4 col-form-label">
                    City
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="city"
                      {...register("city")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="state" className="col-md-4 col-form-label">
                    State/Province
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="stateProvince"
                      {...register("stateProvince")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="postalCode" className="col-md-4 col-form-label">
                    Postal/Zip Code
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="postalZip"
                      {...register("postalZip")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="country" className="col-md-4 col-form-label">
                    Country
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="country"
                      {...register("country")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="religion" className="col-md-4 col-form-label">
                    Religion
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="religion"
                      {...register("religion")}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="mobileNumber" className="col-md-4 col-form-label">
                    Mobile Number *
                  </label>
                  <div className="col-md-8">
                    <Controller
                      name="phone"
                      control={control}
                      rules={{
                        required: "Mobile number is required",
                        validate: (value) => isValidPhoneNumber(value) || "Please enter a valid mobile number",
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          className="form-control"
                          value={value}
                          onChange={onChange}
                          defaultCountry="AE"
                          id="phone"
                        />
                      )}
                    />
                    {errors.phone && (
                      <div className="text-danger" style={{ marginTop: "0.25rem", fontSize: "80%" }}>
                        {errors.phone.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="workNumber" className="col-md-4 col-form-label">
                    Work Number
                  </label>
                  <div className="col-md-8">
                    <Controller
                      name="workNumber"
                      control={control}
                      rules={{
                        validate: (value) => !value || isValidPhoneNumber(value) || "Please enter a valid work number",
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          className="form-control"
                          value={value}
                          onChange={onChange}
                          defaultCountry="AE"
                          id="workNumber"
                        />
                      )}
                    />
                    {errors.workNumber && (
                      <div className="text-danger" style={{ marginTop: "0.25rem", fontSize: "80%" }}>
                        {errors.workNumber.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="homeNumber" className="col-md-4 col-form-label">
                    Home Number
                  </label>
                  <div className="col-md-8">
                    <Controller
                      name="homeNumber"
                      control={control}
                      rules={{
                        validate: (value) => !value || isValidPhoneNumber(value) || "Please enter a valid home number",
                      }}
                      render={({ field: { onChange, value } }) => (
                        <PhoneInput
                          className="form-control"
                          value={value}
                          onChange={onChange}
                          defaultCountry="AE"
                          id="homeNumber"
                        />
                      )}
                    />
                    {errors.homeNumber && (
                      <div className="text-danger" style={{ marginTop: "0.25rem", fontSize: "80%" }}>
                        {errors.homeNumber.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-md-4 col-form-label">
                    Email ID *
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
                      <div className="text-danger" style={{ marginTop: "0.25rem", fontSize: "80%" }}>
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3 row">
                  <label htmlFor="company" className="col-md-4 col-form-label">
                    Company
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="company"
                      {...register("company")}
                    />
                  </div>
                </div>
              </div>
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

export default CreateEditContact;