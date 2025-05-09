const EmployeeMockData = [
  {
    id: 1,
    first_name: "John",
    middle_name: "Henry",
    last_name: "Daniel Client",
    phone: "+919778546338",
    email: "john@abc.org",
    address: "ABC Lane, City 1234567,Address 4563155",
    is_active: true
  },
  {
    id: 2,
    first_name: "Jane",
    middle_name: "Prob C",
    last_name: "Will Smith Joy",
    phone: "+919998877665",
    email: "jane@abc.org",
    address: "YBC",
    is_active: false
  },
  {
    id: 3,
    first_name: "Robo",
    middle_name: "",
    last_name: "Walt",
    phone: "+919987566523",
    email: "robo@abc.org",
    address: "CDS lane, City 22,New Delhi",
    is_active: true
  },
];
const clientMockData = [
  {
    clientName: "ABC Company",
    address: "ABC Tower, City 1",
    firstname: "Person 1",
    phone: "+9197568243885",
    email: "person22@abc.org",
    is_active: false,
  },
  {
    clientName: "XYZ Company",
    address: "XYZ Tower, City 1",
    firstname: "Person 2",
    phone: "+9197568248963",
    email: "person2@xyz.org",
    is_active: true,
  },
];

const contactMockData = [
  {
    name: "Customer 1",
    address: "Address 1",
    contactName: "John",
    phone: "+9197568243885",
    email: "john@customer1.org",
    is_active: true,
  },
  {
    name: "Customer 2",
    address: "Address 2",
    contactName: "Jackson",
    phone: "+9197568248963",
    email: "jackson2@customer2.org",
    is_active: false,
  },
];

const plansMockData = [
  {
    name: "Basic",
    price: "AED 200",
    is_active: true,
    description: "100 Email",
  },
  {
    name: "Exclusive",
    price: "AED 500",
    is_active: true,
    description: "700 Email",
  },
  {
    name: "Pro",
    price: "AED 1000",
    is_active: false,
    description: "2000 Email",
  },
];

const templateMockData = [
  {
    id: 1,
    templateName: "Template 1",
    templateContent: "This is a test template"
  },
  {
    id: 2,
    templateName: "Template 2",
    templateContent: "Test template 2"
  },
  {
    id: 3,
    templateName: "Template 3",
    templateContent: "TEST TEMPLATE 3"
  },
];

const campaignMockData = [
  {
    id: 1,
    from: "Sender's Name",
    to: "ABC 1",
    name: "Campaign 1",
    startDate: "2023-06-01",
    endDate: "2023-06-15",
    template: "Template 1",
    content: "Template 1 Content"
  },
  {
    id: 2,
    from: "Sender's Name",
    to: "ABC 2",
    name: "Campaign 2",
    startDate: "2023-06-10",
    endDate: "2023-06-20",
    template: "Template 2",
    content: "Template 2 Content"
  },
  {
    id: 3,
    from: "Sender's Name",
    to: "ABC 3",
    name: "Campaign 33",
    startDate: "2023-06-15",
    endDate: "2023-06-30",
    template: "",
    content: "Template 3 Content"
  },
];

const subscriptionMockData = [
  { 
    id: 1,
    name: "John Doe", 
    expiryDate: "2023-06-30", 
    plan: "Premium" 
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    expiryDate: "2023-07-15", 
    plan: "Basic" 
  },
  { 
    id: 3, 
    name: "Michael Johnson", 
    expiryDate: "2023-08-01", 
    plan: "Pro" 
  },
];

const invoiceMockData = [
  {
    number : "INV001",
    date: "2023-06-30",
  },
  {
    number : "INV002",
    date: "2023-07-10",
  },

];



export {
  EmployeeMockData,
  clientMockData,
  contactMockData,
  plansMockData,
  templateMockData,
  campaignMockData,
  subscriptionMockData,
  invoiceMockData
};
