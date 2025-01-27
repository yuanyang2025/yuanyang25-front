// router config

// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./layout";
import { NotFoundPage } from "./pages/404";
import { HomePage } from "./pages/home";
import { DashboardPage } from "./pages/dashboard";
import { UserRegisterPage } from "./pages/userRegister";
import { UserLoginPage } from "./pages/userLogin";
import { TeamManagementPage } from "./pages/Team";
import { StaffOraclePage } from "./pages/staff";

// import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Navbar
        children={
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/userLogin" element={<UserLoginPage />} />
            <Route path="/userRegister" element={<UserRegisterPage />} />
            <Route path="/team" element={<TeamManagementPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/staff" element={<StaffOraclePage />} />
          </Routes>
        }
      />
    </Router>
  );
}

export default App;
