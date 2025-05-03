import { Route, Routes } from "react-router-dom";
import LandingPage from "../LandingPage/Landingpage";
import Dashboard from "../Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
// Import useAuth

import Signuppage from "../Signup/Signup";
import Login from "../Login/Login";

export default function Routespage() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/Login"
          element={<Login />} // Redirect if not signed in
        />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}
