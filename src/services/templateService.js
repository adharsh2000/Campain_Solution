import instance from "./api";

const templateService = {
  createTemplate: (requestBody) =>
    instance({
      method: "POST",
      url: "/template",
      data: requestBody,
    }),
  getTemplate: () =>
    instance({
      method: "GET",
      url: "/template",
    }),
  getTemplateId: (id) =>
    instance({
      method: "GET",
      url: "/template/" + id,
    }),
  updateTemplate: (id, requestBody) =>
    instance({
      method: "PUT",
      url: "/template/" + id,
      data: requestBody,
    }),

  deleteTemplate: (id) =>
    instance({
      method: "DELETE",
      url: "/template/" + id,
    }),
};

export default templateService;
