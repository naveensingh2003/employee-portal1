import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Index from './Employee-portal/EmployeeDashboard/Index';
import { CookiesProvider } from 'react-cookie';
import EmpDashBoard from './Employee-portal/EmpVerginolDashboard/EmpDashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
      <CookiesProvider>
         <Index />
      </CookiesProvider>
  )
}

export default App
