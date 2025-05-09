import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginForm.css";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import authService from "../../services/authService";



const LoginForm = () => {

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
    if(path != null) {
      navigate(path, { replace: true })
    }
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // prevent default form submission
    console.dir(form);
    // await login();
    // if(form && form.username !== "" && form.password !== "") {
      await login(form);
    // }
    // else {
    //   NotificationManager.error(
    //     "Username & Password is invalid!",
    //     "Error!"
    //   );
    // }
  }

  // const login = async () => {
  //   console.dir(form);
  //   redirect('/dashboard')
  // };
  const login = async (form) => {
    console.dir(form);
    authService.adminSignIn(form).then(async (response) => {
      console.dir(response.data);
      if(response.data.status === 200) {
        const userObj = response.data.data ? response.data.data : '';
        if (userObj) {
          localStorage.setItem('user', JSON.stringify(userObj));
          const user = JSON.parse(localStorage.getItem('user'));
          console.log(user)
          console.log(user.access_token)
          if(user.access_token)
            localStorage.setItem('token', JSON.stringify(user.access_token));
          redirect('/dashboard')
        }
      }
        else {
          NotificationManager.error(
          response.data.message
          );
          // NotificationManager.error(
          //   "Username & Password is invalid!",
          //   "Error!"
          // );
        }
        
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          "Error while logging in!",
          "Error!"
        );
      });
  };

  return (
    <>
    <div>
      <img src="https://smartsolutionsme.com/wp-content/uploads/2022/04/sas3.png" alt="crm"/>
    </div>
      <h1 style={{'marginLeft': '100px'}}>
        CRM
      </h1>
      <p className="mb-4"><h3><strong>Admin SignIn</strong></h3></p>
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

        <div className="d-flex mb-5 align-items-center">
          <label className="control control--checkbox mb-0">
            <span className="caption">Remember me</span>
            <input type="checkbox" />
            <div className="control__indicator"></div>
          </label>
          {/* <span className="ml-auto" style={{ paddingLeft: "20px" }}>
            <a href="/" className="forgot-pass">
              Forgot Password
            </a>
          </span> */}
        </div>
        {/* {`form-group  ${styles.first}`} */}
        {/* <input
          type="button"
          onClick={() => redirect('/dashboard')}
          value="Log In"
          className="btn btn-block btn-primary"
        /> */}

        <input
          type="submit"
          value="Log In"
          className="btn btn-block btn-primary"
        />

      </form>
      {/* <a href="/dashboard" className="forgot-pass">
        Register
      </a> */}

      {/* <div className={`d-lg-flex  ${styles.half}`}>   */}
      {/* <div className='d-lg-flex half'>  
        <div
          className="bg order-1 order-md-2 bg-area"
          
        ></div>
        <div className='contents order-2 order-md-1'>
          <div className='container'>
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7">
                <h3>
                  Login to <strong>ShopsBill</strong>
                </h3>
                <p className="mb-4">
                  ERP software.
                </p>
                <form action="#" method="post">
                  <div className="form-group first"> 
                    <label for="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      id="username"
                    />
                  </div>
                  <div className="form-group last mb-3">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      id="password"
                    />
                  </div>

                  <div className="d-flex mb-5 align-items-center">
                    <label className="control control--checkbox mb-0">
                      <span className="caption">Remember me</span>
                      <input type="checkbox" />
                      <div className="control__indicator"></div>
                    </label>
                    <span className="ml-auto" style={{paddingLeft: '20px'}}>
                      <a href="/" className="forgot-pass">
                        Forgot Password
                      </a>
                    </span>
                  </div>
                  <input
                    type="submit"
                    value="Log In"
                    className="btn btn-block btn-primary"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default LoginForm;
