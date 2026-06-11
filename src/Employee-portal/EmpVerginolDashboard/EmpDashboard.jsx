import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import "./EmpDashboard.css";

export default function EmpDashBoard() {
  const [cookie, setCookie, removeCookie] = useCookies(["ename"]);
  const [emp, setEmp] = useState({
    dept: null,
    eid: 0,
    email: null,
    ename: null,
    joiningDate: null,
    manager: null,
    mob: null,
    password: null,
    salary: null,
    status: null,
  });
  const navigate = useNavigate();
  const { eid } = useParams();

  useEffect(() => {
    if (!cookie.ename) {
      navigate("/");
      return;
    }

    axios
      .get(`http://localhost:9898/employee/${eid}`)
      .then((response) => {
        setEmp(response.data.data);
      })
      .catch((error) => {
        console.log("API Error:", error);
      });
  }, [cookie, navigate, eid]);

  //  console.log(eid)

  function handleLogoutClick() {
    removeCookie("ename");
    alert("🚪 Logout successful! 👋");
    navigate("/");
  }
  // console.log(emp);

  function scrollToSection(id) {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });

      el.classList.add("highlight-section");

      setTimeout(() => {
        el.classList.remove("highlight-section");
      }, 1500);
    }
  }
  return (
    <div
      className="d-flex bg-light"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Sidebar */}
      <aside
        className="bg-dark text-white border-end p-3"
        style={{
          width: "250px",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <h4 className="fw-bold text-white bi bi-person mb-4">
          Employee Portal
        </h4>

        <div className="d-grid gap-2">
          <button
            className="btn btn-light bi bi-house-door-fill text-start"
            onClick={() => scrollToSection("Home")}
          >
            {" "}
            Home
          </button>

          <button
            className="btn btn-light text-start bi bi-list-task"
            onClick={() => scrollToSection("task")}
          >
            {" "}
            Recent Tasks
          </button>

          <button
            className="btn btn-light text-start bi bi-calendar-check"
            onClick={() => scrollToSection("leave")}
          >
            {" "}
            Leave Requests
          </button>

          <button
            className="btn btn-light text-start bi bi-lightning-charge"
            onClick={() => scrollToSection("quick")}
          >
            {" "}
            Quick Actions
          </button>

          <button
            className="btn btn-light text-start bi bi-calendar"
            onClick={() => scrollToSection("events")}
          >
            {" "}
            Upcoming Events
          </button>

          <button
            className="btn btn-danger text-start bi bi-box-arrow-left"
            onClick={handleLogoutClick}
          >
            {" "}
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: "250px",
          height: "100vh",
        }}
      >
        {/* Header */}
        <nav
          className="navbar navbar-expand-lg bg-light border-bottom px-4"
          style={{
            position: "fixed",
            top: 0,
            left: "250px",
            right: 0,
            zIndex: 1000,
            height: "70px",
          }}
        >
          <div className="container-fluid ">
            <h4 className="mb-0 ">
             Employee Dashboard <span className="bi bi-grid"></span>
            </h4>

            <div className="card bg-primary rounded rounded-2">
              <img src="/Olive Logo.jpeg" alt="Logo" width="150" height="40" />
            </div>

            <div className="d-flex align-items-center gap-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                style={{ width: "250px" }}
              />

              <button className="btn btn-light">🔔</button>

              <div className="fw-semibold">{cookie.ename}</div>
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div
          className="container-fluid p-4"
          style={{
            marginTop: "70px",
            height: "calc(100vh - 70px)",
            overflowY: "auto",
          }}
        >
          {/* Welcome */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body" id="Home">
              <h3 className="fw-bold">Welcome Back, {cookie.ename} 👋</h3>
              <p className="text-muted mb-0">
                Here's your employee dashboard overview.
              </p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Employee ID</small>
                  <h5>{emp.eid}</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Reporting manger</small>
                  <h4>{emp.manager}</h4>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Salary</small>
                  <h4>Rs {emp.salary}</h4>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <small className="text-muted">Account Status</small>
                  <h4>{emp.status ? "Active" : "Inactive"}</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks & Events */}
          <div className="row g-4 mb-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body" id="task">
                  <h5 className="mb-3">Recent Tasks</h5>

                  <ul className="list-group">
                    <li className="list-group-item">Complete UI Design</li>

                    <li className="list-group-item">Submit Weekly Report</li>

                    <li className="list-group-item">Update Documentation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body" id="events">
                  <h5 className="mb-3">Upcoming Events</h5>

                  <ul className="list-group">
                    <li className="list-group-item">Team Meeting - Dec 15</li>

                    <li className="list-group-item">Sprint Review - Dec 18</li>

                    <li className="list-group-item">Holiday - Dec 25</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Leave Requests */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body" id="leave">
              <div className="d-flex justify-content-between mb-3">
                <h5>Leave Requests</h5>

                <button className="btn btn-primary btn-sm">Apply Leave</button>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Annual Leave</td>
                    <td>10 Dec - 12 Dec</td>
                    <td>
                      <span className="badge bg-success">Approved</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Sick Leave</td>
                    <td>20 Nov</td>
                    <td>
                      <span className="badge bg-warning">Pending</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card border-0 shadow-sm">
            <div className="card-body" id="quick">
              <h5 className="mb-3">Quick Actions</h5>

              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-primary">Apply Leave</button>

                <button className="btn btn-success">Download Payslip</button>

                <button className="btn btn-info text-white">
                  View Attendance
                </button>

                <button className="btn btn-secondary">Update Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
