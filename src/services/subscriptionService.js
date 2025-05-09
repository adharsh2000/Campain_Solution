import instance from "./api";

const subscriptionService = {

    getSubscription: () =>
    instance({
      method: "GET",
      url: "/subscription",
    }),
    getSubscriptionId: (id) =>
    instance({
      method: "GET",
      url: "/subscription/" + id,
    }),
 
  deleteSubscription: (id) =>
  instance({
    method: "DELETE",
    url: "/subscription/" + id,
  }),
};

export default subscriptionService;

