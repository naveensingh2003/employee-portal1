import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

export default function NewEmployee() {
  // 🔹 Form State (based on your backend fields)
  const [employee, setEmployee] = useState({
    dept: "",
    email: "",
    ename: "",
    joiningDate: "",
    manager: "",
    mob: "",
    password: "",
    salary: "",
    status: 1,
  });

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // const [bulkEmployees, setBulkEmployees] = useState([]);
  const [excelFile, setExcelFile] = useState(null);
  const [timemsg, setTimeMsg] = useState("");
  const [jobId, setJobId] = useState(null);
  const intervalRef = useRef(null);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: name === "status" ? Number(value) : value,
    });
  };

  const startPolling = (id) => {
    intervalRef.current = setInterval(async () => {
      try {
        const res = await axios.get(`http://localhost:9898/jobStatus/${id}`);

        console.log("Job Status:", res.data);

        setTimeMsg(`Status: ${res.data.status}`);

        if (res.data.status === "SUCCESS") {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setTimeMsg("Job Completed Successfully ✅");
        }
      } catch (err) {
        console.error(err);
        clearInterval(intervalRef.current);
      }
    }, 5000);
  };

  // 🔹 Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(employee); // check data

    // 🔥 API CALL
    axios
      .post("http://localhost:9898/createEmployee", employee)
      .then((res) => {
        setTimeMsg(
          "Employee Added ✅\nConfirmation email sent successfully 📧",
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setExcelFile(file);

    console.log("Selected File :", file.name);
  };

  const handleBulkSubmit = async () => {
    if (!excelFile) {
      alert("Please select an Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", excelFile);

    try {
      const response = await axios.post(
        "http://localhost:9898/bulkUploadEmployeeExcel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const id = response.data.jobId; // IMPORTANT: backend must return jobId

      setJobId(id);
      setTimeMsg("Upload started... tracking job status");

      startPolling(id); // 👈 start interval
    } catch (error) {
      console.error(error);
      setTimeMsg("Upload failed");
    }
  };
  return (
    <div className="container mt-4 ">
      {/* Title */}
      <div className="mb-3 p-3 bg-light border rounded shadow-sm ">
        <h3 className="mb-2 bi bi-person-plus-fill text-primary">
          {" "}
          Add New Employee
        </h3>

        <p className="mb-0 text-success fw-semibold">
          <i className="bi bi-envelope-check me-2"></i>
          Upon successful registration, the employee will receive a confirmation
          email containing account details and login instructions.
        </p>
      </div>

      <div
        className={`card shadow-sm border-0 text-center fw-bold fs-6 p-3 ${
          timemsg === "Status: COMPLETED"
            ? "text-success"
            : timemsg === "Status: PROCESSING"
              ? "text-primary"
              : "text-danger"
        }`}
      >
         {timemsg}
      </div>

      {/* Card */}
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Department */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Department *</label>
                <input
                  type="text"
                  name="dept"
                  className="form-control"
                  placeholder="Enter department"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Employee Name *</label>
                <input
                  type="text"
                  name="ename"
                  className="form-control"
                  placeholder="Enter name"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* Joining Date */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Joining Date *</label>
                <input
                  type="date"
                  name="joiningDate"
                  className="form-control"
                  placeholder="Enter joining date"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* Manager */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Manager *</label>
                <input
                  type="text"
                  name="manager"
                  className="form-control"
                  required
                  placeholder="Enter manager name"
                  onChange={handleChange}
                />
              </div>

              {/* Mobile */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Mobile *</label>
                <input
                  type="text"
                  name="mob"
                  className="form-control"
                  placeholder="Enter mobile number"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  required
                  placeholder="Enter password"
                  onChange={handleChange}
                />
              </div>

              {/* Salary */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Salary *</label>
                <input
                  type="number"
                  name="salary"
                  className="form-control"
                  required
                  placeholder="Enter salary"
                  onChange={handleChange}
                />
              </div>

              {/* Account status */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Account Status *</label>

                <select
                  className="form-control"
                  required
                  name="status"
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>

            {/* for xls insert */}

            <div className="card border-primary mt-3">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  <i className="bi bi-file-earmark-excel me-2"></i>
                  Bulk Employee Upload
                </h5>

                <div className="row align-items-end">
                  <div className="col-md-8">
                    <label className="form-label">Select Excel File</label>

                    <input
                      className="form-control"
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileUpload}
                    />
                  </div>

                  <div className="col-md-4">
                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleBulkSubmit}
                      >
                        <i className="bi bi-upload me-2"></i>
                        Add All Employees
                      </button>

                      <a
                        href="/emp2.xls"
                        download
                        className="btn btn-outline-success"
                      >
                        <i className="bi bi-download me-2"></i>
                        Download Sample Excel
                      </a>
                    </div>
                  </div>
                </div>

                <small className="text-muted mt-2 d-block">
                  Upload an Excel file containing employee details.
                </small>

                {/* employee records loaded successfully
                    and ready for upload.*/}

                {excelFile && (
                  <div className="alert alert-success mt-3">
                    Selected File : {excelFile.name}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-success bi bi-floppy me-2"
              >
                {" "}
                Save Employee
              </button>

              <button
                type="reset"
                className="btn btn-secondary bi bi-arrow-clockwise"
              >
                {" "}
                Reset
              </button>

              <Link to="/dashboard">
                <button type="reset" className="btn btn-danger mx-2 ">
                  <span className="bi bi-house-door"></span> Back to DashBoard
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
