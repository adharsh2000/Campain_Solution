import instance from "./api";

const groupService = {
  createGroup: (requestBody) =>
    instance({
      method: "POST",
      url: "/group",
      data: requestBody,
    }),
  getGroup: () =>
    instance({
      method: "GET",
      url: "/group",
    }),
  getGroupsName: () =>
    instance({
      method: "GET",
      url: "/group",
    }),
  getGroupById: (id) =>
    instance({
      method: "GET",
      url: "/group/" + id,
    }),
  updateGroup: (requestBody, id) =>
    instance({
      method: "PUT",
      url: "/group/" + id,
      data: requestBody,
    }),
  deleteGroup: (id) =>
    instance({
      method: "DELETE",
      url: "/group/" + id,
    }),
    getContactsfromGroups: (id) => 
    instance({
      method: "GET",
      url: "/group/contact/" + id,
    }),
    deleteContactFromGroup: (id,groupId) =>
    instance({
      method: "DELETE",
      url: "/group/contact/" + id + '/'+groupId,
    }),
  // addToGroup: (groupId, contactIds) =>
  //   instance({
  //     method: "POST",
  //     url: `/group/${groupId}/addContacts`,
  //     data: {
  //       contactIds: contactIds,
  //     },
  //   }),
  addToGroup: (groupId, contactIds) =>
  instance({
    method: "POST",
    url: "/assignContacts",
    data: {
      contactIds: contactIds,
      groupId: groupId
    },
  }),
};

export default groupService;
