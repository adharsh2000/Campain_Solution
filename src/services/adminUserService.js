import instance from "./api";

const adminUserService = {
  createAdminUser: (requestBody) =>
    instance({
      method: "POST",
      url: "/admin_user",
      data: requestBody
    }),
  getAdminUser: () =>
    instance({
      method: "GET",
      url: "/admin_user",
    }),
  updateAdminUser: (requestBody) =>
    instance({
      method: "PUT",
      url: "/admin_user",
      data: requestBody,
    }),
  getAdminUserById: (id) =>
    instance({
      method: "GET",
      url: "/admin_user/" + id,
    }),
 
  
};

export default adminUserService;
