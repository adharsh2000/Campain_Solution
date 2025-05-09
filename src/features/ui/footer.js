import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="content-footer footer bg-footer-theme">
        <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
          <div className="mb-2 mb-md-0">
            © CRM
            {/* <a
              href="#"
              target="_blank"
              className="footer-link fw-bolder"
            >
              ThemeSelection
            </a> */}
          </div>
          {/* <div>
            <a
              href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
              target="_blank"
              className="footer-link me-4"
            >
              Support
            </a>
          </div> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
