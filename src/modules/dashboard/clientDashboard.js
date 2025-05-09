import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import dashboardService from "../../services/dashboardService";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import RefreshIcon from "@mui/icons-material/Refresh";
import { mkConfig, generateCsv, download } from "export-to-csv";
import campaignService from "../../services/campaignService";
import clientService from "../../services/clientService";

const ClientDashboard = () => {
  const [totalContacts, setTotalCustomers] = useState(0);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [totalEmails, setTotalEmails] = useState();
  const [remainingEmails, setRemainingEmails] = useState(0);
  const [campaignStat, setCampaignStat] = useState([]);
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.role);

  const fetchClientData = async () => {
    const { data } = await dashboardService.getClientData();
    console.log("ClientData: ", data);

    const campaignData = data.data.statistics;
    const campaignsByMonth = data.data.campaignsByMonth;

    console.log(data.data.remainingEmails[0].remaining);
    if (campaignData) {
      setCampaignStat(campaignData);
    } else {
      console.log("Response is null or undefined");
    }

    setTotalCustomers(data.data.totalContacts | "");
    setTotalCampaigns(data.data.totalCampaigns | "");
    setRemainingEmails(data.data.remainingEmails[0].remaining | "");
    const series = campaignsByMonth.map((data) => data.total);
    const labels = campaignsByMonth.map((data) =>
      new Date(0, data.month - 1).toLocaleString("default", { month: "long" })
    );
    setSeries(series);
    setLabels(labels);
    // if (user.role == 3) {
    //  setTotalEmails(data.data.statistics != {} ? data.data.statistics.clientData.stats[0].delivered.total : 0)
    if (data.data.statistics) {
      setTotalEmails(data.data.Clientstatistics.totalDelivered);
    } else {
      setTotalEmails("No data Available");
    }
    // } else if (user.role == 4) {
    //   const empData = await dashboardService.getEmployeeData();
    //   // const { data: { data: empData } } = await dashboardService.getEmployeeData();
    //   console.log(empData.data.data.statistics);
    //   if (Object.keys(empData.data.data.statistics).length === 0) {
    //     setTotalEmails("No data Available");
    //   } else {
    //     setTotalEmails(empData.data.data.statistics.totalDelivered);
    //   }
    // }
  };
  useEffect(() => {
    fetchClientData();
  }, []);

  // Pie Chart Data and Options
  const pieChartData = {
    options: {
      labels: labels,
      legend: {
        position: "bottom",
      },
    },
    series: series,
  };

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    console.log("DATA: ", campaignStat);
    let slNo = 0;
    const modifiedData = campaignStat.flatMap((item) => {
      return item.campaign_recurring_mappings.map((mapping) => {
        return {
          No: ++slNo,
          Campaign_Name: item.campaignName,
          Total_delivered: mapping?.stat_response?.delivered ?? 0,
          Total_Opened: mapping?.stat_response?.opened ?? 0,
          Total_Failed: mapping?.stat_response?.failed ?? 0,
        };
      });
    });

    console.log("NEWDATA: ", modifiedData);

    const csv = generateCsv(csvConfig)(modifiedData);
    download(csvConfig)(csv);
  };

  const handleRefresh = async () => {
    const refreshedData = await dashboardService.getCampaignRefresh();
    console.log("refreshedData: ", refreshedData);
    refreshedData
      ? setCampaignStat(refreshedData.data.data)
      : setCampaignStat("No data Available");
  };

  return (
    <div className="content-wrapper">
      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          {/* First Row */}
          <div className="col-lg-3">
            {/* Contacts */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Contacts</h5>
              </div>
              <div className="card-body">
                <h2>{totalContacts}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            {/* Campaigns */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Campaigns</h5>
              </div>
              <div className="card-body">
                <h2>{totalCampaigns}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            {/* Emails Send */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Emails Send</h5>
              </div>
              <div className="card-body">
                <h2>{totalEmails}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            {/* Emails Balance */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Emails Remaining</h5>
              </div>
              <div className="card-body">
                <h2>{remainingEmails}</h2>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="col-lg-6">
            {/* Growth Pie Chart */}
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Campaigns Created per Month</h5>
              </div>
              <div className="card-body">
                <Chart
                  options={pieChartData.options}
                  series={pieChartData.series}
                  type="pie"
                  width="100%"
                  height="400px"
                  id="growthChart"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            {/* Usage Bar Chart */}
            <div className="card">
              <div
                className="card-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h5 className="card-title">Campaign statistics</h5>

                <Button
                  color="primary"
                  //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                  onClick={handleExportData}
                  startIcon={<FileDownloadIcon />}
                  variant="contained"
                ></Button>
                <Button
                  color="secondary"
                  //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                  onClick={handleRefresh}
                  startIcon={<RefreshIcon />}
                  variant="contained"
                ></Button>
              </div>
              <div className="card-body" style={{ overflowX: "scroll" }}>
                {/* <Chart
                options={barChartData.options}
                series={barChartData.series}
                type="bar"
                width="100%"
                height="400px"
                id="emailUsageChart"
              /> */}

                <div className="text-nowrap">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Campaign Name</th>
                        {/* <th>Start Date</th>
                        <th>End Date</th> */}
                        <th>Date</th>
                        <th>Delivered</th>
                        <th>Opened</th>
                        <th>Failed</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      {campaignStat.map((campaign, index) =>
                        campaign.campaign_recurring_mappings.map(
                          (recurringMapping, recIndex) => {
                            const statResponse = recurringMapping.stat_response;
                            const startDate = recurringMapping.start_date;
                            const endDate = recurringMapping.end_date;
                            const delivered =
                              statResponse && typeof statResponse === "object"
                                ? statResponse.delivered
                                : 0;
                            const opened =
                              statResponse && typeof statResponse === "object"
                                ? statResponse.opened
                                : 0;
                            const failed =
                              statResponse && typeof statResponse === "object"
                                ? statResponse.failed
                                : 0;

                            return (
                              <tr key={`${index}-${recIndex}`}>
                                <td>{campaign.campaignName}</td>
                                {/* <td>{startDate}</td>
                                <td>{endDate}</td> */}
                                <td>{`${startDate} to ${endDate}`}</td>
                                <td>{delivered}</td>
                                <td>{opened}</td>
                                <td>{failed}</td>
                              </tr>
                            );
                          }
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientDashboard;
