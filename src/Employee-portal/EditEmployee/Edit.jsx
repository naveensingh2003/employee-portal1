import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

export function Edit() {
  const { id } = useParams(); // 🔥 get id
  const navigate = useNavigate();

  // 🔹 Formik setup
  const formik = useFormik({
    initialValues: {
      dept: "",
      email: "",
      ename: "",
      joiningDate: "",
      manager: "",
      mob: "",
      password: "",
      salary: "",
      status: false,
    },

    onSubmit: (values) => {
      axios
        .put(`http://localhost:9898/updateEmployeeById?id=${id}`, values)
        .then(() => {
          alert("Employee Updated ✅");
          navigate("/dashboard"); // go back to dashboard
        })
        .catch((err) => console.error(err));
    },
  });

  // 🔹 Load employee data
  useEffect(() => {
    axios
      .get(`http://localhost:9898/employee/${id}`)
      .then((res) => {
        formik.setValues(res.data.data); // 🔥 set form values
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4 bi bi-pencil-square"> Edit Employee</h3>

      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              {/* Department */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  name="dept"
                  className="form-control"
                  value={formik.values.dept}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="ename"
                  className="form-control"
                  value={formik.values.ename}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Joining Date */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Joining Date</label>
                <input
                  type="text"
                  name="joiningDate"
                  className="form-control"
                  value={formik.values.joiningDate}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Manager */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Manager</label>
                <input
                  type="text"
                  name="manager"
                  className="form-control"
                  value={formik.values.manager}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Mobile */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  name="mob"
                  className="form-control"
                  value={formik.values.mob}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Password */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Password</label>
                <input
                  type="text"
                  name="password"
                  className="form-control"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Salary */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  name="salary"
                  className="form-control"
                  value={formik.values.salary}
                  onChange={formik.handleChange}
                />
              </div>

              {/* Status */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Current Status</label>

                <input
                  type="text"
                  className="form-control mb-2"
                  value={formik.values.status ? "Active" : "Inactive"}
                  readOnly
                />

                <label className="form-label">Change Status</label>

                <select
                  className="form-control"
                  value={formik.values.status ? "true" : "false"}
                  onChange={(e) =>
                    formik.setFieldValue("status", e.target.value === "true")
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary  me-2">
                Update Employee
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard")}
              >
                Cancel <span className="bi bi-x"></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
