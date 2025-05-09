import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "../../features/ui/modal/modal";
import ActionButtonGroup from "../Employee/components/ActionButtonGroup";
import campaignService from "../../services/campaignService";
import clientService from "../../services/clientService";
import { NotificationManager } from "react-notifications";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-multi-date-picker";

const RecurringModel = ({ user, isEdit, reloadCallback, showUpdateButton }) => {
  const INITIAL_STATE = {
    startDate: "",
    endDate: "",
    frequency: "",
  };

  const getEndOfMonth = () => {
    let date = new Date();
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
  };

  const [form, setForm] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(getEndOfMonth());

  useEffect(() => {
    console.log("Inside recurring model");
    console.log(user);
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // setSubmitting(true);

    console.log(form);
    try {
      if (user && user.id) await saveFormData(form);
    } catch (error) {
      alert(`Registration failed! ${error.message}`);
    }
  };

  const handleChange = (event) => {
    console.log("event: ", event.target.value);
    setForm({
      ...form,
      [event.target.id]: event.target.value,
      from: user.id,
    });
  };

  const saveFormData = async (form) => {
    console.log("Form:", form);
    console.log(user.id);

      const result = await campaignService.enableRecurring(form, user.id);
if(result.data.status == 200){
      console.log(result);
      setSubmitting(false);
      setForm(INITIAL_STATE);
      NotificationManager.success(result.data.message);
} else{
      // console.log(error);
      NotificationManager.error(result.data.error);
    }
  };

  const resetCallback = () => {
    console.log("resetCallback");
    setForm(INITIAL_STATE);
  };

  const reloadCallbackFn = () => {
    reloadCallback();
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row"></div>

          <div className="mb-3 row">
            <label className="col-md-4 col-form-label">Start Date</label>
            <div className="col-md-8">
              <div className="form-select">
                <DatePicker
                  className="form-control"
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setForm((prevState) => ({
                      ...prevState,
                      startDate: date.format("YYYY-MM-DD"),
                    }));
                  }}
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  maxDate={getEndOfMonth()}
                />
              </div>
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-md-4 col-form-label">End Date</label>
            <div className="col-md-8">
              <div className="form-select">
                <DatePicker
                  className="form-control"
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    setForm((prevState) => ({
                      ...prevState,
                      endDate: date.format("YYYY-MM-DD"),
                    }));
                  }}
                  dateFormat="yyyy-MM-dd"
                  minDate={startDate}
                  maxDate={getEndOfMonth()}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="col">
          <div className="mb-3 row">
            <label className="col-md-4 col-form-label">Campaign Frquency</label>
            <div className="col-md-8">
              <select
                className="form-select"
                name="frequency"
                id="frequency"
                value={form.frequency}
                onChange={handleChange}
              >
                <option value="">Select campaign frequency</option>
                <option value="1">Daily</option>
                <option value="2">Custom Dates</option>
              </select>
            </div>
          </div>
          {form.frequency === "2" && (
            <div className="mb-3 row">
              <label className="col-md-4 col-form-label">Custom Dates</label>
              <div className="col-md-8">
                <div className="form-select">
                  <DatePicker
                    className="form-control"
                    value={values}
                    onChange={(dates) => {
                      setForm((prevState) => ({
                        ...prevState,
                        scheduledDate: dates.map((date) =>
                          date.format("YYYY-MM-DD")
                        ),
                      }));
                      console.log(
                        dates.map((date) => date.format("YYYY-MM-DD"))
                      );
                    }}
                    multiple
                    minDate={startDate}
                    maxDate={endDate}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <br />

      <ActionButtonGroup
        isEdit={isEdit}
        resetCallback={resetCallback}
        isSubmit={submitting}
      />
    </form>
  );
};

export default RecurringModel;
