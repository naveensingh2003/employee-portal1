
import { useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["ename"]);
  const [empid, setEmpId] = useState("");
  const [password, setPassword] = useState("");
     const[msg ,setMsg] =useState("");

  {
    /* setting emp_id */
  }
  function handleEmpId(e) {
      setEmpId(e.target.value)
  }
  function handleEmpPassword(e) {
      setPassword(e.target.value)
  }

  function handleLoginClick(e) {
    e.preventDefault(); // STOP refresh

    //  console.log('EmpId'+ empid)
    //  console.log('password' +password)
   
   
    axios.get(`http://localhost:9898/employes`).then((response) => {
          // console.log(response.data.emps)
                        const empid1     = Number(empid);
       
      var result = response.data.emps.find((item) => item.eid === empid1);
      if (result) {
        if (result.password === password) {
           setCookie("ename", result.ename);
           setMsg("Login Sucess")
          alert("🎉 Welcome back! Redirecting to the Employee Dashboard...");
           navigate(`/empdashboard/${result.eid}`)
          
        } else {
          alert("❌ Incorrect password. Please try again.");
        }
      } else {
         alert("❌ Invalid Employee ID. Please try again.");
      }
    });
  }

  return (
   <div className="container-fluid">
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "60vh" }}
  >
    <div className="col-md-4 col-lg-3">

      <form className="card shadow border-0 rounded-4 p-3 bg-white">

        {/* HEADER */}
        <div className="text-center mb-3">
          <i className="bi bi-person-circle fs-1 text-warning"></i>
          <h3 className="fw-bold mt-2 mb-1">Employee Login</h3>
          <small className="text-muted">
            Access your dashboard
          </small>
        </div>

        {/* FORM */}
        <dl className="mb-2">

          <dt className="fw-semibold mb-1">
            <i className="bi bi-person-badge me-2 text-primary"></i>
            Employee ID
          </dt>
          <dd className="mb-2">
            <input
              type="text"
              onChange={handleEmpId}
              name="eid"
              value={empid}
              placeholder="Enter Employee ID"
              className="form-control shadow-sm"
            />
          </dd>

          <dt className="fw-semibold mb-1">
            <i className="bi bi-lock-fill me-2 text-danger"></i>
            Password
          </dt>
          <dd className="mb-3">
            <input
              type="password"
              onChange={handleEmpPassword}
              value={password}
              name="password"
              placeholder="Enter Password"
              className="form-control shadow-sm"
            />
          </dd>

        </dl>

        {/* BUTTON */}
        <button
          className="btn btn-warning fw-bold w-100"
          onClick={handleLoginClick}
        >
          <i className="bi bi-box-arrow-in-right me-2"></i>
          Login
        </button>

        {/* FOOTER TEXT */}
        <div className="text-center mt-2">
          <small className="text-muted">
            Employee Management System
          </small>
        </div>

      </form>

    </div>
  </div>
</div>
  );
}
