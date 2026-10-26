import { Link, Outlet } from "react-router-dom";

import "./Home.css";

export default function Home() {
  return (
    <div className="bg-light min-vh-100" style={{ paddingTop: "80px" }}>
      {/* HEADER */}
      <header className="bg-dark text-white p-2  shadow fixed-top">
        <div className="d-flex justify-content-between ">
         
          <div className="card bg-light rounded rounded-2">
            <img src="/Olive Logo.jpeg" alt="Logo" width="150" height="40" />
          </div>

          <div className="me-3">
            <h3 className="mb-0">
              <span className="bi bi-house-door me-2"></span>
              Employee Management System
            </h3>
          </div>

          <div className="text-end" style={{ width: "180px" }}>
      <small className="fw-bold text-warning d-block">
        Olive 24*7
      </small>
      <small className="text-white">
        Transactional Intelligence
      </small>
    </div>
         </div>
      </header>

      {/* NAV BUTTONS */}
      <div className="d-flex justify-content-center mt-1 gap-3 sty">
        <Link to="adminlogin" className="btn btn-primary px-4">
          <i className="bi bi-person-lock me-2"></i>
          Admin Login
        </Link>

        <Link to="employeelogin" className="btn btn-warning px-4">
          <i className="bi bi-person me-2"></i>
          Employee Login
        </Link>
      </div>

      {/* CHILD PAGE AREA */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <Outlet />
      </div>

      {/* ADVANTAGES SECTION */}
      <section className="container my-5">
        <h2 className="text-center fw-bold mb-4">
          <i className="bi bi-award-fill text-success me-2"></i>
          Why Choose Our Employee Management System?
        </h2>

        <div className="row g-4">
          <div className="col-md-3">
            <div className="card shadow border-0 text-center h-100 hover-card">
              <div className="card-body">
                <i className="bi bi-clock-history text-primary fs-1"></i>
                <h5 className="mt-3">24×7 Availability</h5>
                <p className="text-muted">
                  Access employee records anytime and from anywhere.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 text-center h-100 hover-card">
              <div className="card-body">
                <i className="bi bi-lightning-charge text-warning fs-1"></i>
                <h5 className="mt-3">Fast & Easy</h5>
                <p className="text-muted">
                  Quickly add, update, and manage employee information.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 text-center h-100 hover-card">
              <div className="card-body">
                <i className="bi bi-shield-check text-success fs-1"></i>
                <h5 className="mt-3">Secure Data</h5>
                <p className="text-muted">
                  Protect employee information with secure access control.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow border-0 text-center h-100 hover-card">
              <div className="card-body">
                <i className="bi bi-graph-up-arrow text-danger fs-1"></i>
                <h5 className="mt-3">High Efficiency</h5>
                <p className="text-muted">
                  Reduce paperwork and improve organizational productivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-1 ">
        <small>
          © {new Date().getFullYear()} Employee Management System | Developed by
          Naveen
        </small>
      </footer>
    </div>
  );
}
