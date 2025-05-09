import instance from "./api";

const dashboardService = {
  getAdminDashboard: () =>
    instance({
      method: "GET",
      url: "/dashboard/admin",
      // data: requestBody,
    }),

  // Client dashboard
  getClientData: (requestBody) =>
    instance({
      method: "GET",
      url: "/dashboard/client",
      data: requestBody,
    }),
  getCampaignRefresh: (requestBody) =>
    instance({
      method: "GET",
      url: "/dashboard/campaignStat",
      data: requestBody,
    }),

  // Employee dashboard
  getEmployeeData: (requestBody) =>
    instance({
      method: "GET",
      url: "/dashboard/employee",
      data: requestBody,
    }),
};

export default dashboardService;
