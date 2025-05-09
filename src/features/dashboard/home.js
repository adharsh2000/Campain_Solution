import React from "react";
import ReactApexChart from "react-apexcharts";

const Home = () => {
  let series = [
    {
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },
  ];
  let options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  let radialBar = {
    series: [67],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: [""],
    },
  };

  var optionsBarChart = {
    series: [
      {
        data: [
          30,
          28,
          28,
          24,
          16,
          15,
          13,
          12
        ]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          
        }
      },
      colors: ['#91AE47'],
      plotOptions: {
        bar: {
          columnWidth: '65%',
          distributed: true,
          
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          [
            'John',
            'Doe'
          ],
          [
            'Joe',
            'Smith'
          ],
          [
            'Jake',
            'Williams'
          ],
          'Amber',
          [
            'Peter',
            'Brown'
          ],
          [
            'Mary',
            'Evans'
          ],
          [
            'David',
            'Wilson'
          ],
          [
            'Lily',
            'Roberts'
          ],
        ],
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
    },
  };
  var optionsCircle = {
    series: [55, 67, 83],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return 249;
              },
            },
          },
        },
      },
      labels: ["December", "January", "February"],
    },
  };

  return (
    <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <div className="row">
          <div className="col-lg-12 col-md-4 order-1">
            <div className="row">
              <div className="col-lg-3 col-md-12 col-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../assets/img/icons/unicons/chart-success.png"
                          alt="chart success"
                          className="rounded"
                        />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">
                      Invoices – Uncollected
                    </span>
                    <h3 className="card-title mb-2">20</h3>
                    <small className="text-success fw-semibold"></small>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../assets/img/icons/unicons/cc-success.png"
                          alt="chart success"
                          className="rounded"
                        />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">
                      Outstanding Amount
                    </span>
                    <h3 className="card-title mb-2">
                      200 <span className="currency-sub-text">AED</span>
                    </h3>
                    <small className="text-success fw-semibold"></small>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 col-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../assets/img/icons/unicons/chart-success.png"
                          alt="chart success"
                          className="rounded"
                        />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">Products</span>
                    <h3 className="card-title mb-2">20</h3>
                    <small className="text-success fw-semibold"></small>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 col-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../assets/img/icons/unicons/wallet-info.png"
                          alt="Credit Card"
                          className="rounded"
                        />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">Customers</span>
                    <h3 className="card-title text-nowrap mb-1">02</h3>
                    <small className="text-success fw-semibold"></small>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-12 col-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="text-center">
                      <div className="dropdown" style={{ float: "right" }}>
                        <button
                          className="btn btn-sm btn-outline-primary dropdown-toggle"
                          type="button"
                          id="growthReportId"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          2023
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="growthReportId"
                        >
                          <a className="dropdown-item" href="javascript:void(0);">
                            2022
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            2021
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            2020
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            2019
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img
                          src="../assets/img/icons/unicons/wallet-info.png"
                          alt="Credit Card"
                          className="rounded"
                        />
                      </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">Sales</span>
                    <h3 className="card-title text-nowrap mb-1">
                      18000 <span className="currency-sub-text">AED</span>
                    </h3>
                    <small className="text-success fw-semibold"></small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 order-1">
            <div className="card">
              <div className="row row-bordered g-0">
                <div className="col-md-12">
                  <h5 className="card-header m-0 me-2 pb-3">Customers</h5>
                  <div id="customerBarChart">
                    <ReactApexChart
                      options={optionsBarChart.options}
                      series={optionsBarChart.series}
                      type="bar"
                      height={350}
                    />
                  </div>
                  {/* <div id="totalRevenueChart1" className="px-2">
                    <ReactApexChart
                      options={optionsCircle.options}
                      series={optionsCircle.series}
                      type="radialBar"
                      height={350}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-8 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
            <div className="card">
              <div className="row row-bordered g-0">
                <div className="col-md-8">
                <div className="text-center" style={{margin: '20px'}}>
                      <div className="dropdown" style={{float: 'right'}}>
                        <button
                          className="btn btn-sm btn-outline-primary dropdown-toggle"
                          type="button"
                          id="growthReportId"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Monthly
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="growthReportId"
                        >
                          <a className="dropdown-item" href="javascript:void(0);">
                            Jan
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            Feb
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            Mar
                          </a>
                        </div>
                      </div>

                      <div className="dropdown"  style={{float: 'right'}}>
                        <button
                          className="btn btn-sm btn-outline-primary dropdown-toggle"
                          type="button"
                          id="growthReportId"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          2023
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="growthReportId"
                        >
                          <a className="dropdown-item" href="javascript:void(0);">
                            2022
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            2021
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            2020
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            2019
                          </a>
                        </div>
                      </div>
                    </div>

                      
                  <h5 className="card-header m-0 me-2 pb-3">Sales</h5>
                  <div id="totalRevenueChart" className="px-2">
                    <ReactApexChart
                      options={options}
                      series={series}
                      type="line"
                      height={350}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card-body">
                    <div className="text-center">
                      <div className="dropdown">
                        <button
                          className="btn btn-sm btn-outline-primary dropdown-toggle"
                          type="button"
                          id="growthReportId"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          2023
                        </button>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="growthReportId"
                        >
                          <a className="dropdown-item" href="javascript:void(0);">
                            2022
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            2021
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            2020
                          </a>
                          <a className="dropdown-item" href="javascript:void(0);">
                            2019
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="growthChart"></div>
                  <ReactApexChart
                    options={radialBar.options}
                    series={radialBar.series}
                    type="radialBar"
                    height={350}
                  />
                  <div className="text-center fw-semibold pt-3 mb-2">
                    Performance Rate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
