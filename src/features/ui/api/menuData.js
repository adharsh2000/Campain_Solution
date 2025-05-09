const menuItems = [
  {
    title: "Dashboard",
    alias: "dashboard",
    icon: "bx-tachometer",
    path: "/dashboard",
    default: true,
    subNav: [],
    access: ["ADMIN", "CLIENT", "SALES"],
  },

  {
    title: "Employees",
    // icon: "bx-book-content",
    icon: "bx-group",

    path: "/employee",
    default: "",
    createIcon: "bx-message-square-add",
    createIconPath: "/employee/create",
    subNav: [],
    access: ["ADMIN", "CLIENT"],
  },
  // {
  //   title: "Roles",
  //   icon: "bx-briefcase-alt-2",
  //   path: "/role",
  //   default: "",
  //   subNav: [],
  //   access: ["ADMIN", "CLIENT"],
  // },
  {
    title: "Clients",
    icon: "bx-user-plus",
    path: "/account",
    default: "",
    createIcon: "bx-message-square-add",
    createIconPath: "/account/create",
    subNav: [],
    access: ["ADMIN"],
  },
  {
    title: "Contacts",
    icon: "bx-phone-call",
    default: "",
    parent: true,
    path: "#",
    access: ["ADMIN", "CLIENT", "SALES"],
    subNav: [
      {
        title: "All",
        path: "/contacts/all",
        default: "",
        createIcon: "bx-message-square-add",
        createIconPath: "/contacts/create",
        subNav: [],
      },
    ],
  },

  {
    title: "Groups",
    icon: "bx-user-voice",
    path: "/group",
    default: "",
    createIcon: "bx-message-square-add",
    createIconPath: "/group/create",
    subNav: [],
    access: ["ADMIN", "CLIENT", "SALES"],
  },

  {
    title: "Plans",
    icon: "bx-store",
    path: "/plan",
    default: "",
    createIcon: "bx-message-square-add",
    createIconPath: "/plan/create",
    subNav: [],
    access: ["ADMIN", "CLIENT", "SALES"],
  },

  {
    title: "Templates",
    icon: "bx-book-content",
    path: "/template",
    default: "",

    subNav: [
      {
        title: "Create Template",
        path: "/template/create",
        subNav: [],
      },
    ],
    access: ["ADMIN", "CLIENT", "SALES"],
  },
  {
    title: "Campaigns",
    icon: "bx-message-square",
    path: "/campaign",
    default: "",
    subNav: [
      {
        title: "New Campaign",
        path: "/campaign/create",
        subNav: [],
      },
    ],
    access: ["ADMIN", "CLIENT", "SALES"],
  },

  // {
  //   title: "Subscriptions",
  //   icon: "bx-purchase-tag",
  //   path: "/subscription",
  //   default: "",

  //   subNav: [],
  //   access: ["ADMIN", "CLIENT"],
  // },
  // {
  //   title: "Invoice",
  //   icon: "bx-credit-card",
  //   path: "/invoice",
  //   default: "",

  //   subNav: [],
  //   access: ["ADMIN", "CLIENT"],
  // },
  // {
  //   title: "Reports",
  //   icon: "bx-spreadsheet",
  //   path: "/report",
  //   default: "",

  //   subNav: [],
  //   access: ["ADMIN", "CLIENT"],
  // },
];

export default menuItems;
