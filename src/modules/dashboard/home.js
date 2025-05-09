import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import dashboardService from "../../services/dashboardService";

const Home = () => {
  const [totalClients, setTotalClients] = useState(0);
  const [activeClients, setActiveClients] = useState(0);
  const [clientPlanData, setClientPlanData] = useState([]);
  const [clientPerMonth, setClientPerMonth] = useState([]);
  const [emailSend, setEmailSend] = useState();

  const fetchAdminData = async () => {
    const { data } = await dashboardService.getAdminDashboard();
    console.log(data.data.clientPerMonth);
    setTotalClients(data.data.totalClients);
    setActiveClients(data.data.activeClients);
    setClientPlanData(data.data.clientPlanCount);
    setClientPerMonth(data.data.clientPerMonth);

    // setEmailSend(data.data.statistics.adminData.stats[0].delivered.total)
    if (
      data.data.statistics.adminData &&
      data.data.statistics.adminData.stats &&
      data.data.statistics.adminData.stats.length > 0
    ) {
      setEmailSend(data.data.statistics.adminData.stats[0].delivered.total);
    } else {
      setEmailSend("No data Available");
    }
  };
  useEffect(() => {
    fetchAdminData();
  }, []);

  // Line Chart Data and Options
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = monthNames.map((month, index) => {
    const item = clientPerMonth.find(item => item["MONTH(`createdAt`)"] === index + 1);
    return item ? item.count : null;
  });

  const lineChartData = {
    series: [
      {
        name: "Client count",
        // data: clientPerMonth.map((item) => item.count),
        data: data
      },
    ],

    options: {
      chart: {
        height: 350,
        // type: "line",
        // zoom: {
        //   enabled: false,
        // },
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        connectNulls : true,
      },
      xaxis: {
        // categories: clientPerMonth.map(
        //   (item) => monthNames[item["MONTH(`createdAt`)"] - 1]
        // ),
        categories: monthNames
      },
      yaxis: {
        min: 0,
        // tickAmount: Math.max(...clientPerMonth.map((item) => item.count)),
        tickAmount: Math.max(...data),
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  // Pie Chart Data and Options
  const pieChartData = {
    series: clientPlanData.map((item) => item.clientCount),
    options: {
      labels: clientPlanData.map((item) => item.plan.planName),
    },
  };

  return (
    <div className="content-wrapper">
      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          {/* First Grid */}
          <div className="col-lg-12">
            <div className="row">
              {/* Total Clients */}
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title">Total Clients</h5>
                  </div>
                  <div className="card-body">
                    <h2>{totalClients}</h2>
                  </div>
                </div>
              </div>

              {/* Active Clients */}
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title">Active Clients</h5>
                  </div>
                  <div className="card-body">
                    <h2>{activeClients}</h2>
                  </div>
                </div>
              </div>

              {/* Email Send */}
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title">Email Send</h5>
                  </div>
                  <div className="card-body">
                    <h2>{emailSend} of 50K</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Client per Month */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Client Created per Month</h5>
              </div>
              <div className="card-body">
                <Chart
                  options={lineChartData.options}
                  series={lineChartData.series}
                  type="bar"
                  width="100%"
                  height="500px"
                />
              </div>
            </div>
          </div>

          {/* Client Plan Data */}
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Client Plan Data</h5>
              </div>
              <div className="card-body">
                <Chart
                  options={pieChartData.options}
                  series={pieChartData.series}
                  // type="pie"
                  type="donut"
                  width="100%"
                  height="500px"
                  id="growthChart"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
