import React, { useState, useEffect } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";

import DataList from "../../features/mail/pull_merge";

const TempData = () => {
  const [data, setData] = useState([]);

  // Load Temp Data
  async function fetchTempData() {
    // Fetch data from datasource
    await axios.get("http://localhost:8000/datasource").then(async (response) => {
      console.dir(response);
      await setData(response.data);
    });
  }

  useEffect(() => {
    fetchTempData();
  }, []);


  const pullData = async () => {
    // Fetch data from datasource
    await axios.post("http://localhost:8000/datasource/pull/").then(async (response) => {
    console.log('pull data');  
    console.dir(response.data);
      NotificationManager.success(response.data.message, "Success!", 2000);
      fetchTempData();
    }).catch(err => {
      console.log(err);
      NotificationManager.error(
        "Error while importing data!",
        "Error!"
      );
    });
    }

  return(
  <>
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="row">
        <div className="col">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h4 className="fw-bold" style={{ textAlign: "-webkit-left" }}>
                    <span className="text-muted fw-light"></span> Pull & Merge -
                    Data read from Mail
                  </h4>
                </div>
                <div className="col">
                  <button type="button" className="btn btn-info  float-end"
                  onClick={() => {
                    pullData();
                  }}>
                    Pull Data
                  </button>
                </div>
              </div>

              <DataList data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default TempData;
