import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginForm.css";
import { NotificationManager } from "react-notifications";
import authService from "../../../services/authService";

const EmployeeLogin = (name) => {
  const user = name;

  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [form, setForm] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };
  const navigate = useNavigate();
  const redirect = (path) => {
    if (path != null) {
      navigate(path, { replace: true });
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // prevent default form submission
    console.log(form);
    if (form && form.username !== "" && form.password !== "") {
      await employeeLogin(form);
    } else {
      NotificationManager.error("Username & Password is invalid!", "Error!");
    }
  };


  const employeeLogin = async (form) => {
    console.log(form);
    authService
      .employeeSignIn(form)
      .then(async (response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          const userObj = response.data.data ? response.data.data : "";
          console.log("userObj:", userObj);
          if (userObj) {
            localStorage.setItem("user", JSON.stringify(userObj));
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user);
            console.log(user.access_token);
            if (user.access_token) {
              localStorage.setItem("token", JSON.stringify(user.access_token));
              redirect("/dashboard");
            }
          }
        } else {
          // NotificationManager.error(
          //   "Username & Password is invalid!",
          //   "Error!"
          // );
          NotificationManager.error(response.data.message)
        }
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error("Error while login Employee!", "Error!");
      });
  };

  return (
    <>
      <div>
        <img
          src="https://smartsolutionsme.com/wp-content/uploads/2022/04/sas3.png"
          alt="smartPOS"
        />
      </div>
      <h1 style={{ marginLeft: "100px" }}>CRM</h1>
      <p className="mb-4">
        <h3>
          <strong> Employee SignIn</strong>
        </h3>
      </p>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group first">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            id="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group last mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          value="Log In"
          className="btn btn-block btn-primary"
        />
      </form>
    </>
  );
};

export default EmployeeLogin;
