import React from "react";
import { useEffect } from "react";
import parse from 'html-react-parser';

const JobDetail = ({job}) => {

    useEffect(() => {
    console.log(job);
  }, [job])

  const htmlEntities = (str) => {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return (
    <>
    <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <div className="mb-6 row">
                  <label for="first_name" className="col-md-2 col-form-label">
                    Name
                  </label>
                  <div className="col-md-8 view-text" >
                    {job?.name}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-6 row">
                  <label for="middle_name" className="col-md-2 col-form-label">
                    Agent
                  </label>
                  <div className="col-md-8 view-text">
                  {job?.agent}
                  </div>
                </div>
              </div>
              
              <div className="w-100"></div>
              <div className="col">
                <div className="mb-12 row">
                  <label for="link" className="col-md-1 col-form-label">
                    Link
                  </label>
                  <div className="col-md-11 view-text">
                    <a href={job?.link}>{job?.link}</a>
                  </div>
                </div>
              </div>
              
             
              <div className="w-100"></div>

              <div className="col">
                <div className="mb-6 row">
                  <label for="first_name" className="col-md-2 col-form-label">
                    Ext.
                  </label>
                  <div className="col-md-8 view-text" >
                    {job?.extension}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-6 row">
                  <label for="first_name" className="col-md-2 col-form-label">
                    Duration
                  </label>
                  <div className="col-md-8 view-text" >
                    {job?.audio_duration}
                  </div>
                </div>
              </div>
              
              <div className="w-100"></div>
             
              <div className="col">
                <div className="mb-6 row">
                  <label for="first_name" className="col-md-2 col-form-label">
                    Priority
                  </label>
                  <div className="col-md-8 view-text" >
                    {(job?.priority) ? (job?.priority === 1 ? 'HIGH' : 'LOW') : ''}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="mb-6 row">
                  <label for="first_name" className="col-md-2 col-form-label">
                    
                  </label>
                  <div className="col-md-8 view-text" >
                    
                  </div>
                </div>
              </div>

              <div className="w-100"></div>
              <div className="col">
                <div className="mb-12 row">
                  <label for="link" className="col-md-1 col-form-label">
                    Content
                  </label>
                  <div className="col-md-11 view-text">
                    {/* {htmlEntities(job?.content)} */}
                    {(job?.content) ? parse(job?.content) : ''}
                  </div>
                </div>
              </div>
              <div className="w-100"></div>

            </div>
          </div>
        </div>
    </>
  )
}

export default JobDetail