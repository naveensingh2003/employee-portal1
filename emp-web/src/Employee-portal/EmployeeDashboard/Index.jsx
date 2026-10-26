import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import EmployeeDashboard from "./EmployeeDashBoard";
import NewEmployee from "../AddEmployee/NewEmployee";
import { Edit } from "../EditEmployee/Edit";
import { Delete } from "../DeleteEmployee/Delete";
import AdminLogin from "../Admin&EmployeeLogin/AdminLogin";
import EmployeeLogin from "../Admin&EmployeeLogin/EmployeeLogin";
import EmpDashBoard from "../EmpVerginolDashboard/EmpDashboard";


 export default function Index(){
    return(
        <div>
            <BrowserRouter>
              <Routes>
                 <Route path="/" element={<Home/>}>

                       {/* 👇 Default page when "/" opens */}
                      <Route index element={<AdminLogin />} />
                      <Route path="adminlogin" element={<AdminLogin />} />
                      <Route path="employeelogin" element={<EmployeeLogin />} />

                 </Route>
                 <Route path="/dashboard" element={<EmployeeDashboard />} />
                 <Route path="/addemployee" element={<NewEmployee />}/>
                 <Route path="/edit/:id" element={<Edit/>}/>
                 <Route path="/delete/:id" element={<Delete />}/>
                 <Route path="/empdashboard/:eid" element={<EmpDashBoard />} />
                 <Route path="*" element={ <h3 className="text-danger m-3 text-center">⚠️ Oops! Page Not Found !!</h3>}/>
              </Routes>
            </BrowserRouter>
        </div>
    )
 }