import instance from "./api";

const campaignService = {
  createCampaign: (requestBody) =>
    instance({
      method: "POST",
      url: "/campaign", 
      data: requestBody,
    }),
    getCampaign: () =>
    instance({
      method: "GET",
      url: "/campaign",
    }),
    getCampaignId: (id) =>
    instance({
      method: "GET",
      url: "/campaign/" + id,
    }),
  updateCampaign: (campaignId, requestBody) =>
    instance({
      method: "PUT",
      // url: `/campaign/${campaignId}`, 
      url: "/campaign/" + campaignId,
      data: requestBody,
    }),

  deleteCampaign: (id) =>
  instance({
    method: "DELETE",
    url: "/campaign/" + id,
  }),

  sendCampaign: (id) =>
  instance({
    method: "POST",
    url: "/campaignSend/" + id, 
    // data: requestBody,
  }),
  getCampaignRequests: () =>
  instance({
    method: "GET",
    url: "/campaign/requests/all",
  }),
  campaignRequestAction: (requestBody) =>
  instance({
    method: "PATCH",
    url: "/campaign",
    data: requestBody
  }),
  enableRecurring : (requestBody,id) => 
    instance({
      method: "POST",
      url:"/campaign/recurring/"+ id,
      data: requestBody
    }), 
    campaignStop: (id) =>
      instance({
        method: "PUT",
        url: "/campaign/stop/" + id,
      }),
};

export default campaignService;



