import instance from "./api";

const clientService = {
  createClient: (requestBody) =>
    instance({
      method: "POST",
      url: "/client", // Replace with the actual endpoint for creating an employee
      data: requestBody,
    }),
  getClient: () =>
    instance({
      method: "GET",
      url: "/client",
    }),
  getClientId: (id) =>
    instance({
      method: "GET",
      url: "/client/" + id,
    }),
  updateClient: (clientId, requestBody) =>
    instance({
      method: "PUT",
      url: "/client/" + clientId,
      data: requestBody,
    }),
  // updateClient: (requestBody) =>
  //   instance({
  //     method: "PUT",
  //     url: "/client",
  //     data: requestBody,
  //   }),
  deleteClient: (id) =>
    instance({
      method: "DELETE",
      url: "/client/" + id,
    }),
  getClientEmail: () =>
    instance({
      method: "GET",
      url: "/client/email/campaign",
    }),
  getClientRequests: () =>
    instance({
      method: "GET",
      url: "/client/request/all",
    }),
  clientAction: (requestBody) =>
    instance({
      method: "PATCH",
      url: "/client",
      data: requestBody,
    }),
};

export default clientService;
