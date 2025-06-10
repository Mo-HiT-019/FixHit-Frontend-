import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/redux/store";

const ProtectedRouteTech = () => {
  const technician = useSelector((state: RootState) => state.technician.technician);
  return technician ? <Outlet /> : <Navigate to="/technicians/login" />;
};

export default ProtectedRouteTech;
