
 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export function Delete() {

  const { id } = useParams();          // 🔥 get id from URL
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  // 🔹 Fetch employee details (optional but good UI)
  useEffect(() => {
    axios.get(`http://localhost:9898/employee/${id}`)
      .then(res => {
        // console.log(res.data.data);
        setEmployee(res.data.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  // 🔹 Delete API call
  const handleDelete = () => {
    axios.delete(`http://localhost:9898/deleteById/${id}`)
      .then(() => {
        alert("Employee Deleted ✅");
        navigate("/dashboard"); // 🔥 go back to dashboard
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5  bg-dark rounded rounded-2">

      <div className="card  shadow text-center p-4">

        <h3 className="text-danger mb-3 bi bi-trash"> Delete Employee</h3>

        {/* Show employee info */}
        {employee && (
          <div className="mb-3">
            <p><strong>Empoloyee ID:</strong> {employee.eid}</p>
            <p><strong>Name:</strong> {employee.ename}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Department:</strong> {employee.dept}</p>
            <p><strong>Joining Date :</strong> {employee.joiningDate}</p>
            <p><strong>Account Status :</strong> {employee.status===true?"Active":"Inactive"}</p>
          </div>
        )}

        <p>Are you sure you want to delete this employee?</p>

        {/* Buttons */}
        <div className="mt-3">
          <button 
            className="btn btn-danger me-2"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>

          <button 
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
        </div>

      </div>

    </div>
  );
}