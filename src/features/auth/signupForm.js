import React from "react";
import "./loginForm.css";

const SignUpForm = () => {
  return (
    <>
      <h3>
        Register <strong></strong>
      </h3>
      <p className="mb-4"></p>
      <form action="#" method="post">
        <div className="form-group first">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            id="username"
          />
        </div>
        <div className="form-group last mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            id="password"
          />
        </div>

        <input
          type="Register"
          value="SignUp"
          className="btn btn-block btn-primary"
          readOnly
        />
      </form>
      <a href="/signin" className="forgot-pass">
        Sign In
      </a>
    </>
  );
};

export default SignUpForm;
