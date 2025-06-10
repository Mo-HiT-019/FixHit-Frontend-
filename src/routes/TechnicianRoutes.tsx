import { Route, Routes, Navigate } from "react-router-dom";
import TechnicianSignup from "../pages/auth/technician/TechnicianSignup";
import TechnicianLogin from "../pages/auth/technician/TechnicianLogin";
import VerifyOtpTech from "../pages/auth/technician/VerifyOtpTech";
import TechnicianLayout from "@/components/layouts/technician/TechnicianLayout";
import TechnicianDashboard from "@/pages/technicians/TechnicianDashboard";
import PublicOnlyRouteTech from "./secure/PublicOnlyRouteTech";
import ProtectedRouteTech from "./secure/ProtectedRouteTech";
import TechnicianProfilePage from "@/pages/technicians/TechnicianProfile";
import TechnicianCompleteProfilePage from "@/pages/technicians/TechnicianCompleteProfilePage";




const TechnicianRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="login" />} />


      <Route element={<PublicOnlyRouteTech />}>
        <Route path="signup" element={<TechnicianSignup />} />
        <Route path="login" element={<TechnicianLogin />} />
        <Route path="verify-otp" element={<VerifyOtpTech />} />
      </Route>

      
      <Route element={<ProtectedRouteTech />}>
        <Route path="/" element={<TechnicianLayout />}>
          <Route index element={<TechnicianDashboard />} />
          <Route path="dashboard" element={<TechnicianDashboard />} />
          <Route path="profile" element={<TechnicianProfilePage/>} />
          <Route path="complete-profile" element={<TechnicianCompleteProfilePage/>} />
          
        </Route>
      </Route>
    </Routes>
  );
};

export default TechnicianRoutes;
