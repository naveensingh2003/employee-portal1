import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["admin_id"]);
  const [admin_id, setAdmin_ID] = useState("");
  const [password, setpassword] = useState("");
  const[msg ,setMsg] =useState("");

  {
    /* setting admin_id */
  }
  function handleAdminId(e) {
    setAdmin_ID(e.target.value);
  }
  function handleAdminPassword(e) {
    setpassword(e.target.value);
  }

  function handleLoginClick(e) {
    e.preventDefault(); // STOP refresh

    axios.get(`http://localhost:4400/admins`).then((response) => {
      var result = response.data.find((item) => item.admin_id === admin_id);
      if (result) {
        if (result.password === password) {
          setCookie("admin_id", admin_id);
           setMsg("Login Sucess")
           alert(`🎉 Welcome back ${admin_id} ! Redirecting to the Admin Dashboard...`);
          navigate("/dashboard");
        } else {
          alert("❌ Incorrect password. Please try again.");
        }
      } else {
        alert("❌ Invalid Admin ID. Please try again.");
      }
    });
  }

  return (
     <div className="container-fluid">
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "55vh" }}
  >
    <div className="col-md-4 col-lg-3">
      <form className="card shadow border-0 rounded-4 p-3">

        {/* HEADER */}
        <div className="text-center mb-3">
          <i className="bi bi-person-lock fs-1 text-primary"></i>
          <h3 className="fw-bold mt-2 mb-1">Admin Login</h3>
          <small className="text-muted">
            Manage employees & system
          </small>
        </div>

        {/* FORM */}
        <dl className="mb-2">

          <dt className="fw-semibold mb-1">
            <i className="bi bi-shield-lock me-2 text-primary"></i>
            Admin ID
          </dt>
          <dd className="mb-2">
            <input
              type="text"
              onChange={handleAdminId}
              name="admin_id"
              value={admin_id}
              placeholder="Enter Admin ID"
              className="form-control shadow-sm"
            />
          </dd>

          <dt className="fw-semibold mb-1">
            <i className="bi bi-key-fill me-2 text-danger"></i>
            Password
          </dt>
          <dd className="mb-3">
            <input
              type="password"
              onChange={handleAdminPassword}
              value={password}
              name="password"
              placeholder="Enter Password"
              className="form-control shadow-sm"
            />
          </dd>
        </dl>

        {/* BUTTON */}
        <button
          className="btn btn-primary fw-bold w-100"
          onClick={handleLoginClick}
        >
          <i className="bi bi-box-arrow-in-right me-2"></i>
          Login
        </button>

        {/* FOOTER TEXT */}
        <div className="text-center mt-2">
          <small className="text-muted">
            Admin Panel
          </small>
        </div>

      </form>
    </div>
  </div>
</div>
  );
}
