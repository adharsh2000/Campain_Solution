import instance from "./api";

const planService = {
  createPlan: (requestBody) =>
    instance({
      method: "POST",
      url: "/plan", // Replace with the actual endpoint for creating an employee
      data: requestBody,
    }),
    getPlan: () =>
    instance({
      method: "GET",
      url: "/plan",
    }),
  updatePlan: (Id, requestBody) =>
    instance({
      method: "PUT",
      url: "/plan/" + Id,
      data: requestBody,
    }),
  deletePlan: (id) =>
  instance({
    method: "DELETE",
    url: "/plan/" + id,
  }),
};

export default planService;