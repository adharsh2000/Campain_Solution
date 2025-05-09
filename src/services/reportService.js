import instance from "./api";

const reportService = {

    getReport: (requestBody) =>
    instance({
      method: "GET",
      url: "/report",
      data: requestBody,
    }),
   

};

export default reportService;

