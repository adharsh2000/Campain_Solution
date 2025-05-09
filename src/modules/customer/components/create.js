import React, { useEffect, useState } from "react";
import ActionButton from "../../../features/ui/components/actionButton";
import axios from "axios";
// React Notification
import { NotificationManager } from "react-notifications";
import '../css/customer.css'

const CreateEditContacts = ({ name, user, isEdit, reloadCallback }) => {

  const INITIAL_STATE = {
    name: "",
    address: "",
    vat: "",
    location: "",
    city: "",
    country: "",
    status: '',
    fname: "",
    mname: "",
    lname: "",
    phone: "",
    email: "",
  };

  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState('');

  // async function fetchRoleData() {
  //   // Fetch roles
  //   await axios.get("http://localhost:8000/role").then(async (response) => {
  //     console.dir(response);
  //     await setRoles(response.data);
  //   });
  // }
  // useEffect(() => {
  //   fetchRoleData();
  // }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // prevent default form submission
    setSubmitting(true); // set form submited or not
    console.dir(form);
    try {
      // Update form object
      // status field
      if (form && form.status && form.status === "1") form.status = true;
      else form.status = false;

      // role field
      // let roleArr = [];
      // if (form && form.role) {
      //   let obj = {
      //     name: form.role,
      //   };
      //   roleArr.push(obj);
      //   form.role = roleArr;
      // }

      // Created/Updated By
      // form.created_by = 1;
      // form.updated_by = 1;

      // if(isEdit && user && user.id)
      // await updateFormData(user.id);
      // else      
      // await saveFormData();
    } catch (error) {
      alert(`Registration failed! ${error.message}`);
    }
  };

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const saveFormData = async () => {
    console.dir(form);
    await axios
      .post("http://localhost:8000/user/", form)
      .then(async (response) => {
        console.dir(response);
        await setSubmitting(false);
        await setForm(INITIAL_STATE);
        NotificationManager.success("Added a new employee!", "Success!", 2000);
        
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          "Error while creating new employee!",
          "Error!"
        );
      });
  };

  const updateFormData = async (userId) => {
    console.dir(form);
    await axios
      .put("http://localhost:8000/user/"+userId+"/", form)
      .then(async (response) => {
        console.dir(response);
        await setSubmitting(false);        
        NotificationManager.success("Updated employee!", "Success!", 2000);
        reloadCallbackFn()
      })
      .catch((error) => {
        console.log(error);
        NotificationManager.error(
          "Error while updating employee!",
          "Error!"
        );
      });
  };

  const resetCallback = () => {
    console.log('resetCallback');
    setForm(INITIAL_STATE);
  }

  // Edit Option - Update Values

  useEffect(() => {
    console.log("isEdit "+isEdit);
    if(isEdit && user && user.name) {
      console.log("isEdit "+isEdit);
      setTitle("User - " + user.first_name + " " + user.middle_name + " " + user.last_name);

      setForm({
        name: user.name,
        address: user.address,
        vat: user.vat,
        location: user.location,
        city: user.city,
        country: user.country,
        status: user.status,
        phone: user.phone,
        email: user.email,
        fname: user.firstname,
        // status: user.is_active ? '1' : '2',
        mname: user.middlename,
        lname: user.lastname,
      })
    }
  }, [user])
  

  const reloadCallbackFn = () => {
    reloadCallback();
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
            <span className="text-muted fw-light">
              {/* {
              title ? title : "Create/Update Employee"
              } */}
              
            </span>
            {
              name ? name : (title ? title : "Create/Update Employee")
              }
          </h4>
        </div>
      </div>
      <form onSubmit={onSubmitHandler}>
      <div className="card mb-4">
          <div className="card-body">
            <div className="row">
            <div className="col">
                <div className="mb-3 row">
                  <label for="c_name" className="col-md-1 col-form-label highlight">
                    Name
                  </label>
                  <div className="col-md-11">
                    <input
                      className="form-control"
                      style={{'width':'97%', 'marginLeft': '30px'}}
                      type="text"
                      id="c_name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="w-100"></div>
              <div className="col">
              <div className="mb-3 row">
                  <label for="address" className="col-md-4 col-form-label">
                    Address
                  </label>
                  <div className="col-md-8">
                    <textarea
                      className="form-control"
                      type="text"
                      rows="2"
                      id="address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              {/* <div className="col">
                <div className="mb-3 row">
                  <label for="phone" className="col-md-4 col-form-label">
                    VAT #
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div> */}
              <div className="col">
                <div className="mb-3 row">
                  <label for="location" className="col-md-4 col-form-label">
                    Location
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="email"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="w-100"></div>
              <div className="col">
                <div className="mb-3 row">
                <label for="email" className="col-md-4 col-form-label">
                    City
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="email"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                <label for="status" className="col-md-4 col-form-label">
                    Country
                  </label>
                  <div className="col-md-8">
                    <select
                      id="status"
                      className="form-select"
                      onChange={handleChange}
                      value={form.country}
                    >
                      <option value="">Select Country</option>
                      <option value="1">UAE</option>
                      <option value="2">India</option>
                    </select>
                  </div>            
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                <label for="status" className="col-md-4 col-form-label">
                    Status
                  </label>
                  <div className="col-md-8">
                    <select
                      id="status"
                      className="form-select"
                      onChange={handleChange}
                      value={form.status}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="2">InActive</option>
                    </select>
                  </div>               
                </div>
              </div>
              
              
              <div className="w-100"></div>
                      <div class="divider divider-success">
                        <div class="divider-text">Contact Details</div>
                      </div>
              <div className="col">
                <div className="mb-3 row">
                  <label for="first_name" className="col-md-4 col-form-label">
                    First Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="first_name"
                      value={form.fname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                  <label for="middle_name" className="col-md-4 col-form-label">
                    Middle Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="middle_name"
                      value={form.mname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                  <label for="last_name" className="col-md-4 col-form-label">
                    Last Name
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="last_name"
                      value={form.lname}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="w-100"></div>
              <div className="col">
                <div className="mb-3 row">
                  <label for="phone" className="col-md-4 col-form-label">
                    Phone
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                  <label for="email" className="col-md-4 col-form-label">
                    Email
                  </label>
                  <div className="col-md-8">
                    <input
                      className="form-control"
                      type="text"
                      id="email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-3 row">
                 
                 
                </div>
              </div>

              
              <div className="w-100"></div>
              <div className="col">
                <div className="mb-3 row">
                  <ActionButton isEdit={isEdit} isSubmit={submitting} resetCallback={resetCallback} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateEditContacts;
