import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState({
    data: null,
    emps: [
      {
        dept: null,
        eid: 0,
        email: null,
        ename: null,
        manager: null,
        mob: null,
        salary: null,
        status: null,
      },
    ],
    error: null,
    message: null,
  });
  const [total, setTotal] = useState();
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState(`http://localhost:9898/employes`);
  const [msg, setMsg] = useState("");
  const [allEmployees, setAllEmployees] = useState([]); // 🔥 backup
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["admin_id"]);
  const [filter, setFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (!cookie.admin_id) {
      navigate("/");
    } else {
      axios.get(url).then((response) => {
        setEmployees(response.data);
        setAllEmployees(response.data.emps); // ✅ backup
        setTotal(response.data.emps.length);
      });
    }
  }, [cookie, navigate]);
  function handleInput(e) {
    setSearch(e.target.value);
  }

  function handleSerachClick() {
    // if empty → show all
    if (!search) {
      setEmployees({
        ...employees,
        emps: allEmployees,
      });
      setMsg("");
      return;
    }

    const result = allEmployees.filter(
      (emp) =>
        emp.ename && emp.ename.toLowerCase().includes(search.toLowerCase()),
    );

    if (result.length > 0) {
      // ✅ show filtered
      setEmployees({
        ...employees,
        emps: result,
      });
      setMsg("");
    } else {
      // ❌ not found → show message + restore ALL data
      setMsg("No employee found ❌");

      setEmployees({
        ...employees,
        emps: allEmployees,
      });
    }
  }
  // useCallBack() hook
  const handleLogout = useCallback(() => {
    removeCookie("admin_id");
    alert("✅ Logged out successfully!");
    navigate("/");
  }, [navigate, removeCookie]);

  const filteredEmployees = employees.emps.filter((emp) => {
    const joinDate = new Date(emp.joiningDate);

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchStatus =
      filter === "all"
        ? true
        : filter === "active"
          ? emp.status === true
          : emp.status === false;

    const matchFrom = from ? joinDate >= from : true;
    const matchTo = to ? joinDate <= to : true;

    return matchStatus && matchFrom && matchTo;
  });

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* ================= SIDEBAR ================= */}
      <div className="bg-dark text-white p-3" style={{ width: "180px" }}>
        <h4 className="mb-4">
          {" "}
          <i className="bi bi-person-circle fs-4 text-primary"></i> Admin
          Dashboard
        </h4>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link
              to="/dashboard"
              className="btn btn-primary w-100 my-2 d-flex align-items-center justify-content-center gap-2"
            >
              <i className="bi bi-bar-chart"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li className="nav-item">
            <button
              className="btn btn-danger w-100 bi bi-box-arrow-in-left"
              onClick={handleLogout}
            >
              {" "}
              Logout
            </button>
          </li>

          {/* Back to Home Button
          <li className="nav-item">
            <Link
              to="/"
              className="text-decoration-none btn btn-primary my-2 w-100"
            >
              <span className="nav-link text-white bi bi-house-door-fill">
                {" "}
                Back to Home
              </span>
            </Link>
          </li> */}
        </ul>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-grow-1">
        {/* ================= HEADER ================= */}
        <div className="d-flex justify-content-between align-items-center p-2 border-bottom bg-light">
          <h4 className="mb-0 bi bi-people-fill">
            {" "}
            Employee Management System
          </h4>

          <div className="card bg-primary rounded rounded-2">
            <img src="/Olive Logo.jpeg" alt="Logo" width="150" height="40" />
          </div>

          <div className="input-group w-25">
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={handleInput}
              placeholder="Search name of employee..."
            />
            <span className="input-group-text">
              <i onClick={handleSerachClick} className="bi bi-search"></i>
            </span>
          </div>
        </div>

        {/* ================= DASHBOARD ================= */}
        <div className="p-4">
          {/* Title + Add Button */}
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h3 className="">
              Admin Dashboard <span className="bi bi-grid"></span>
            </h3>

            {/* Admin Name*/}
            <div className="d-flex justify-content-end align-items-center bg-light p-3 shadow-sm rounded">
              <span className="me-2 fs-5">👋</span>
              <span className="fw-bold text-primary">
                Welcome, {cookie.admin_id}
              </span>
            </div>

            {/* 🔥 Add Employee Button */}
            <Link to="/addemployee">
              <button className="btn btn-success bi bi-person-plus-fill">
                {" "}
                Add Employee
              </button>
            </Link>
          </div>

          {/* Card */}
          <div className="card shadow-sm mb-2" style={{ width: "150px" }}>
            <div className="card-body text-center p-1">
              <h6 className="mb-1 small">Total Employees</h6>

              <h4 className="text-success mb-0">
                {total}
                <span
                  className="d-inline-block ms-1"
                  style={{ fontSize: "14px" }}
                >
                  +
                </span>
              </h4>
            </div>
          </div>

          {/* Table */}
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-1">
                <h5 className="mb-3 bi bi-people-fill"> Employee List</h5>

                {/*Active Inactive Filter*/}
                <div className="d-flex flex-wrap gap-3 mb-3 align-items-center p-1 bg-light rounded shadow-sm">
                  {/* From */}
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold text-muted">From</span>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      style={{ width: "170px" }}
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>

                  {/* To */}
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold text-muted">To</span>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      style={{ width: "170px" }}
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>

                  {/* Status */}
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold text-muted">Status</span>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "140px" }}
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Reset */}
                  <button
                    className="btn btn-outline-secondary btn-sm ms-auto"
                    onClick={() => {
                      setFromDate("");
                      setToDate("");
                      setFilter("all");
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>

              {msg && <div className="alert alert-danger">{msg}</div>}

              <table className="table table-bordered table-hover table-striped ">
                <thead className="table-dark">
                  <tr>
                    {employees.emps.length > 0 &&
                      Object.keys(employees.emps[0]).map((key) => (
                        <th key={key}>{key.toUpperCase()}</th>
                      ))}
                    <th>ACTIONS</th>
                  </tr>
                </thead>

                <tbody>
                  {currentEmployees.map((employee, index) => (
                    <tr key={index}>
                      {Object.values(employee).map((value, i) => (
                        <td key={i}>
                          {typeof value === "boolean"
                            ? value
                              ? "Active"
                              : "Inactive"
                            : value}
                        </td>
                      ))}

                      <td>
                        <div className="d-flex">
                          <Link
                            to={`/edit/${employee.eid}`}
                            className="text-decoration-none"
                          >
                            <button className="btn btn-sm btn-primary me-2 d-flex align-items-center gap-1">
                              <i className="bi bi-pen"></i>
                              Edit
                            </button>
                          </Link>

                          <Link
                            to={`/delete/${employee.eid}`}
                            className="text-decoration-none"
                          >
                            <button className="btn btn-sm btn-danger d-flex align-items-center gap-1">
                              <i className="bi bi-trash"></i>
                              Delete
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: "10px", textAlign: "center" }}>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-outline-primary"
                >
                  <i className="bi bi-arrow-left"></i> Previous
                </button>

                <span style={{ margin: "0 10px" }}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={indexOfLast >= filteredEmployees.length}
                  className="btn btn-outline-primary "
                >
                  Next <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
