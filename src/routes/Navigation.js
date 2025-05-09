import React from "react";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";

// React Notification
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import MainLayout from "../pages/layout/mainLayout";
import AuthLayout from "../pages/layout/authLayout";
import EmployeeLayout from "../pages/employee/employeeLayout";
import Content from "../pages/layout/content";

import NotFound from "../features/notfound/NotFound";
import TempData from "../pages/pull_merge/temp";

import Login from "../pages/auth/login";
import SignUp from "../pages/auth/signup";
// import Dashboard from "../pages/dashboard/dashboard";
import Dashboard from "../modules/dashboard";

import UserLoginForm from "../modules/auth/client/UserLoginForm";
import EmployeeLogin from "../modules/auth/client/employeeLogin";

import UserList from "../features/user/list";
import CreateEditUser from "../features/user/create";
import Agents from "../features/agent/list";

// import EmpList from "../features/employee/list";
// import CreateEditEmployee from "../features/employee/create";
import CreateEditEmployee from "../modules/Employee/components/CreateEditEmployee";
import EmpList from "../modules/Employee/components/EmpList";

import Role from "../modules/role";

// import Client from "../pages/client/client";
// import Client from "../modules/client";
import CreateEditClient from "../modules/client/components/create";
import ClientList from "../modules/client/components/list";
import ClientRequestList from "../modules/client/components/clientRequest";

// import CreateEditContacts from "../modules/customer/components/create";
import CreateEditContact from "../modules/contact/components/CreateEditContact";
import ContactList from "../modules/contact/components/ContactList";

//
import CreateEditGroup from "../modules/Group/create";
import GroupList from "../modules/Group/list";

import PlansList from "../modules/Plans/components/PlansList";
import CreateEditPlans from "../modules/Plans/components/CreateEditPlans";

import TemplateLoader from "../modules/templates/components/list";
import TemplateEditor from "../modules/templates/components/editor";

import Campaign from "../modules/Campaign/components/create";
import CampaignList from "../modules/Campaign/components/list";
import EmailCampaign from "../modules/Campaign/emailCampaign";
import CampaignRequestList from "../modules/Campaign/components/requestList";

import SubscriptionList from "../modules/Subscription/components/list";
import Invoice from "../modules/Invoice/Invoice";
import ReportGenerator from "../modules/Reports/components/Report";

import CreateEditAdmin from "../modules/admin/create";
import AdminList from "../modules/admin/list";
import TemplateEditorIDE from "../modules/templates/TemplateEditorIDE";

export const Navigation = () => {
  return (
    <BrowserRouter basename="/email">
      <Routes>
        {/** Private routes for logged users */}
        {/* <Route element={<PrivateNavigation />}>
      
    </Route> */}

        {/** Main layout for logged user pages  */}
        <Route element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="admin-login" element={<Login />} />
          <Route path="client-login" element={<UserLoginForm />} />
          <Route path="employee-login" element={<EmployeeLogin />} />
        </Route>

        {/** Main layout for logged user pages  */}

        <Route element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />

          {/** Temp Data - Pull & Merge routing group */}
          <Route path="temp">
            <Route index element={<TempData />} />
          </Route>

          {/** User routing group */}
          <Route path="user" element={<EmployeeLayout />}>
            <Route index element={<UserList name="Users" />} />
            <Route path="create" element={<CreateEditUser name="New User" />} />
          </Route>

          {/* Admin user */}
          <Route path="admin_user" element={<EmployeeLayout />}>
            <Route index element={<AdminList name="Admin" />} />
            <Route
              path="create"
              element={
                <Content name="New Admin" children={<CreateEditAdmin />} />
              }
            />
            <Route
              path="list"
              element={<Content name="Admin List" children={<AdminList />} />}
            />
          </Route>

          {/** Employee routing group */}
          <Route path="employee" element={<EmployeeLayout />}>
            <Route index element={<EmpList name="Employees" />} />
            <Route
              path="create"
              element={
                <Content
                  name="New Employee"
                  children={<CreateEditEmployee />}
                />
              }
            />
          </Route>

          {/** Role routing group */}
          <Route path="role" element={<EmployeeLayout />}>
            <Route
              index
              element={<Content name="Roles" children={<Role />} />}
            />
            {/* <Route path="create" element={<Content name="New Role" children={<CreateEditRole />} />} />      */}
          </Route>

          {/** Client routing group */}
          <Route path="account" element={<EmployeeLayout />}>
            {/* <Route index element={<Client name="Clients" />} /> */}
            <Route index element={<ClientList name="Clients" />} />

            <Route
              path="create"
              element={
                <Content
                  name="New Client"
                  children={<CreateEditClient name="client" />}
                />
              }
            />
            <Route
              path="request"
              element={
                <Content
                  name="Client Requests"
                  children={<ClientRequestList />}
                />
              }
            />
          </Route>

          {/** Contacts routing group */}
          <Route path="contact" element={<EmployeeLayout />}>
            {/* <Route path="all" element={<Customer name="Contacts" />} /> */}
            <Route index element={<ContactList name="Contacts" />} />

            <Route
              path="create"
              element={
                // <Content name="New Contact" children={<CreateEditContact />} />
                <Content
                  name="New Contact"
                  children={<CreateEditContact name="Contacts" />}
                />
              }
            />
          </Route>

          {/* Group List routing Group */}
          <Route path="group" element={<EmployeeLayout />}>
            <Route
              index
              element={<Content name="Groups List" children={<GroupList />} />}
            />
            <Route
              path="create"
              element={
                <Content name="New Group" children={<CreateEditGroup />} />
              }
            />
          </Route>

          {/** Plan routing group */}
          <Route path="plan" element={<EmployeeLayout />}>
            <Route
              index
              element={<Content name="Price Plans" children={<PlansList />} />}
            />
            <Route
              path="create"
              element={
                <Content name="New Plan" children={<CreateEditPlans />} />
              }
            />
          </Route>

          {/** Template routing group */}
          <Route path="template" element={<EmployeeLayout />}>
            <Route
              index
              element={
                <Content name="Templates" children={<TemplateLoader />} />
              }
            />
            <Route
              path="create"
              element={
                <Content name="New Template" children={<TemplateEditor />} />
              }
            />
          </Route>

          {/** Campaign routing group */}
          <Route path="campaign" element={<EmployeeLayout />}>
            <Route
              index
              element={<Content name="Campaigns" children={<CampaignList />} />}
            />
            <Route
              path="create"
              element={<Content name="New Campaign" children={<Campaign />} />}
            // element={<Content name="New Campaign" children={<EmailCampaign/>} />}
            />
            <Route
              path="request"
              element={<CampaignRequestList name="Campaign Requests" />}
            />
          </Route>

          {/** Subscription routing group */}
          <Route path="subscription" element={<EmployeeLayout />}>
            <Route
              index
              element={
                <Content name="Subscriptions" children={<SubscriptionList />} />
              }
            />
          </Route>
          {/** Invoice routing group */}
          <Route path="invoice" element={<EmployeeLayout />}>
            <Route
              index
              element={<Content name="Invoice" children={<Invoice />} />}
            />
          </Route>
          {/** Report routing group */}
          <Route path="report" element={<EmployeeLayout />}>
            <Route
              index
              element={<Content name="Report" children={<ReportGenerator />} />}
            />
          </Route>

          <Route path="/editor-new" element={<TemplateEditorIDE />} />

        </Route>
        {/* <Route path="/editor-new" element={<TemplateEditorIDE />} /> */}
      </Routes>
      <NotificationContainer />
    </BrowserRouter>
  );
};
