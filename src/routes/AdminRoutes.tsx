import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/auth/admin/AdminLogin";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLayout from "../components/layouts/admin/AdminLayout";
import AdminTechniciansPage from "@/pages/admin/AdminTechnicianPage";
import AdminSignup from "@/pages/auth/admin/AdminSignup";
import ProtectedRouteAdmin from "./secure/ProtectedRouteAdmin";
import PublicOnlyRouteAdmin from "./secure/PublicOnlyRouteAdmin";
import AdminServicesPage from "@/pages/admin/AdminServicePage";
import AdminVerificationRequestsPage from "@/pages/admin/AdminVerificationRequestsPage";
import TechnicianDetailPage from "@/pages/admin/TechnicianDetailPage";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicOnlyRouteAdmin/>}>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/signup" element={<AdminSignup />} />
      </Route>
      
      <Route element={<ProtectedRouteAdmin />}>
        
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> 
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="technicians" element={<AdminTechniciansPage />} />
          <Route path="services" element={<AdminServicesPage/>} />
          <Route path="verification-requests" element={<AdminVerificationRequestsPage/>} />
          <Route path="/technicians/:id" element={<TechnicianDetailPage />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default AdminRoutes;
