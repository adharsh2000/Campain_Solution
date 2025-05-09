import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../features/ui/footer";
import Menubar from "../../features/ui/menubar/menubar";
import Navbar from "../../features/ui/navbar";

const MainLayout = () => {
  return (
    <>
      {/* Layout wrapper */}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Menubar />

          {/* Layout container */}
          {/* <div className="layout-page"> */}
          <div className="layout-page" style={{ backgroundColor: "#E0E0E0" }}>
            <Navbar />

            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <main>
                <Outlet />  
              </main>
              {/* / Content */}
              <Footer />

              <div className="content-backdrop fade"></div>
            </div>
            {/* / Content wrapper */}
          </div>
          {/* / Layout container */}
        </div>

        {/* Overlay */}
        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
      {/* / Layout wrapper */}
    </>
  );
};

export default MainLayout;
