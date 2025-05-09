import React from "react";
import Home from "./home";
import ClientDashboard from "./clientDashboard";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user: ", user);

  if (user.role == 3 | user.role == 4 ) {
    return <ClientDashboard />;
  } else {
    return <Home />;
  }
};

export default Dashboard;
