import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/redux/store";

const PublicOnlyRouteAdmin = () => {
  const admin = useSelector((state: RootState) => state.admin.admin);
  return admin ? <Navigate to="/admin/dashboard" /> : <Outlet />;
};

export default PublicOnlyRouteAdmin;
