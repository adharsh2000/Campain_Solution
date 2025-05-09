import instance from "./api";

const invoiceService = {

    getInvoice: () =>
    instance({
      method: "GET",
      url: "/invoice",
    }),
    getInvoiceId: (id) =>
    instance({
      method: "GET",
      url: "/invoice/" + id,
    }),

};

export default invoiceService;

