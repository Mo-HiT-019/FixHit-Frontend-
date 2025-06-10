import { Navigate, Route, Routes } from "react-router-dom";
import UserLogin from "../pages/user/UserLogin";
import UserSignup from "../pages/auth/user/UserSignup";
import VerifyOtpPage from "../pages/auth/user/VerifyOtp";
import UserHomePage from "../pages/user/UserHomePage";
import PublicOnlyRoute from "./secure/PublicOnlyRoute";
import ProtectedRoute from "./secure/ProtectedRoute";
import ForgotPassword from "@/pages/auth/user/ForgotPassword";
import VerifyResetOtp from "@/pages/auth/user/VerifyResetOtp";
import ResetPassword from "@/pages/auth/user/ResetPassword";
import UserProfile from "@/pages/user/UserProfilePage";
import UserLayout from "@/components/layouts/user/UserLayout";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="signup" element={<UserSignup />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="verify-otp" element={<VerifyOtpPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />                   
        <Route path="verify-reset-otp" element={<VerifyResetOtp />} />                   
        <Route path="reset-password" element={<ResetPassword />} />
        

      </Route>

      <Route element={<ProtectedRoute />}>
       <Route path='/' element={<UserLayout/>}>
            <Route path="home" element={<UserHomePage />} />
            <Route path="profile" element={<UserProfile/>} />
       </Route> 
      </Route>
    </Routes>
  );
};

export default UserRoutes;
