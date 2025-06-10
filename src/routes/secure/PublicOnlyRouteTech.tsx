import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/redux/store";

const PublicOnlyRouteTech = () => {
  const technician = useSelector((state: RootState) => state.technician.technician);
  return technician ? <Navigate to="/technicians/dashboard" /> : <Outlet />;
};

export default PublicOnlyRouteTech;
