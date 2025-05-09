import instance from "./api";



const authService = {
   adminSignIn: (requestBody) =>
    instance({
      method: "POST",
      url: "/auth/admin",
      data: requestBody      
    }),
  clientSignIn: (requestBody) =>
    instance({
      method: "POST",
      url: "/auth/client",
      data: requestBody
    }),
   employeeSignIn: (requestBody) =>
    instance({
      method: "POST",
      url: "/auth/employee",
      data: requestBody
    }),
  getResources: (role) =>
    instance({
      method: "POST",
      url: "/resources",
      data: role
    }),
  updateClient: (requestBody) =>
    instance({
      method: "PUT",
      url: "/client",
      data: requestBody,
    }),
  getClientById: (id) =>
    instance({
      method: "GET",
      url: "/client/" + id,
    }),
  deleteClient: (id) =>
    instance({
      method: "DELETE",
      url: "/client/" + id,
    }),
};

export default authService;
