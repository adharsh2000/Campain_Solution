
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx"
import reportService from "../../../services/reportService";
import { NotificationManager } from "react-notifications";


const ReportGenerator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [generatedData, setGeneratedData] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await reportService.getReport(data);
      setGeneratedData(response.data);
    } catch (error) {
      console.error("Error fetching report", error);
      setGeneratedData(null);
      NotificationManager.error("Error fetching report!", "Error!")

    }
    // // Dummy data generation logic
    // const dummyData = {
    //   // Generated report data
    //   fromDate: data.fromDate,
    //   toDate: data.toDate,
    //   reportType: data.reportType,
    // };
    // setGeneratedData(dummyData);
  };

  const exportToExcel = () => {
    if (generatedData) {
      const worksheet = XLSX.utils.json_to_sheet([generatedData]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook,worksheet,"Report");

      // Generate and download the Excel file
      XLSX.writeFile(workbook,"report.xlsx");
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 row">
            <label className="col-md-2 col-form-label" htmlFor="fromDate">
              From:
            </label>
            <div className="col-md-4">
              <input
                type="date"
                id="fromDate"
                // className={`form-control ${errors.fromDate ? 'is-invalid' : ''}`}
                className="form-control"
                {...register("fromDate", { required: "From Date Required"})}
              />
              {/* {errors.fromDate && <div className="invalid-feedback">From Date is required.</div>} */}
              {errors.fromDate && (
                <div
                  className="text-danger"
                  style={{ marginTop: "0.25rem", fontSize: "80%" }}
                >
                  {errors.fromDate.message}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-md-2 col-form-label" htmlFor="toDate">
              To:
            </label>
            <div className="col-md-4">
              <input
                type="date"
                id="toDate"
                className="form-control"
                {...register("toDate", { required: "To Date Required" })}
              />
            {errors.toDate && (
                <div
                  className="text-danger"
                  style={{ marginTop: "0.25rem", fontSize: "80%" }}
                >
                  {errors.toDate.message}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-md-2 col-form-label" htmlFor="reportType">
              Report Type:
            </label>
            <div className="col-md-4">
              <select
                id="reportType"
                className="form-control"
                {...register("reportType", { required: "Report type Required" })}
              >
                <option value="">Select report type</option>
                <option value="customer">Customer</option>
                <option value="contact">Contact</option>
                <option value="invoice">Invoice</option>
              </select>
              {errors.reportType && (
                <div
                  className="text-danger"
                  style={{ marginTop: "0.25rem", fontSize: "80%" }}
                >
                  {errors.reportType.message}
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Generate Report
            </button>
          </div>
        </form>
        {generatedData && (
          <div className="card-body mt-4">
            <h3>Generated Report</h3>
            <p>From: {generatedData.fromDate}</p>
            <p>To: {generatedData.toDate}</p>
            <p>Report Type: {generatedData.reportType}</p>
            {/* Render additional report data */}
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={exportToExcel}
              >
                Export to Excel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;
