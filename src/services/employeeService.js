import instance from "./api";

const employeeService = {
  createEmployee: (requestBody) =>
    instance({
      method: "POST",
      url: "/employee", 
      data: requestBody,
    }),
    getEmployee: () =>
    instance({
      method: "GET",
      url: "/employee",
    }),
    getEmployeeId: (id) =>
    instance({
      method: "GET",
      url: "/employee/" + id,
    }),
  updateEmployee: (employeeId, requestBody) =>
    instance({
      method: "PUT",
      url: `/employee/${employeeId}`,
      data: requestBody,
    }),
  deleteEmployee: (id) =>
  instance({
    method: "DELETE",
    url: "/employee/" + id,
  }),
  verificationResent: (id) =>
    instance({
      method: "POST",
      url: "/employee/resent/" + id,
    }),
};

export default employeeService;


