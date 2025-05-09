import instance from "./api";

const contactService = {

  createContact: (requestBody) =>
    instance({
      method: "POST",
      url: "/contact",
      data: requestBody,
    }),
  getContact: () =>
    instance({
      method: "GET",
      url: "/contact",
    }),
  getContactById: (id) =>
    instance({
      method: "GET",
      url: "/contact/" + id,
    }),
  updateContact: (requestBody, id) =>
    instance({
      method: "PUT",
      url: "/contact/" + id,
      data: requestBody,
    }),
  deleteContact: (id) =>
    instance({
      method: "DELETE",
      url: "/contact/" + id,
    }),
    csvUpload: (requestBody) =>
    instance({
      method: "POST",
      url: "/contact/upload",
      data: requestBody,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
};

export default contactService;
