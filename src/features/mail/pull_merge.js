import React, { useState } from "react";
import Modal from "../ui/modal/modal";
import JobDetail from "../job/detail";

const DataList = ({data}) => {
  console.log("Render DataList");
  const [selectedRow, setSelectedRow] = useState(-1);
  const [modalTitle, setModalTitle] = useState([]);
  const [jobData, setJobData] = useState(null);
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [show, setShow] = useState(false);

  

  const hideModal = () => {
    setShow(false);
    console.log('close');
  };

  const userModal = async (t) => {
    console.dir(t);
    await setJobData(t);
    if(t && t.name) {      
      await setModalIsOpen(true);
      let title = "Job Details - " + t.name
      setModalTitle(title);
    }
  };

  return (
    <>
      {/* <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h4
                      className="fw-bold"
                      style={{ textAlign: "-webkit-left" }}
                    >
                      <span className="text-muted fw-light"></span> Pull & Merge
                      - Data read from Mail
                    </h4>
                  </div>
                  <div className="col">
                    <button type="button" className="btn btn-info  float-end">
                      Pull Data
                    </button>
                  </div>
                </div> */}
                <div className="table-responsive text-nowrap">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Agent</th>
                        <th>Link</th>                        
                        <th>Extension</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {data?.map((t, index) => {
                        return (
                          <tr
                            key={index}
                            onClick={() => setSelectedRow(index)}
                            className={"clickable-row ".concat(
                              selectedRow === index ? "selected" : ""
                            )}
                          >
                            <td>
                              <input type="checkbox" />
                            </td>                            
                            <td>{t.name}</td>
                            <td>{t.agent}</td>
                            <td><a href={t.link} target="_blank" rel="noreferrer">Link</a></td>
                            <td>{t.extension}</td>
                            <td><span className="badge bg-label-primary me-1">{t.extension === 1 ? "HIGH" : "LOW"}</span></td>
                            <td>
                              <span className="badge bg-label-primary me-1">Pending</span>
                            </td>
                            <td>
                              <span
                              onClick={() => {
                                userModal(t);
                              }}
                                data-bs-toggle="modal"
                                data-bs-target="#exLargeModal"
                                
                              >
                                <i class="menu-icon tf-icons bx bx-show"></i>
                              </span>
                            </td>
                            <td>
                              <span>
                                <i class="menu-icon tf-icons bx bx-trash"></i>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              {/* </div>
            </div>
          </div>
        </div>
      </div> */}

      <Modal
        show={show}
        isOpen={modalIsOpen && jobData}
        handleClose={hideModal}
        id="exLargeModal"
        data={{ title: modalTitle }}
      >
        <JobDetail job={jobData}/>
      </Modal>
    </>
  );
};

export default DataList;
