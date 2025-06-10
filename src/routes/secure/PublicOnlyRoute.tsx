import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "@/redux/store";

const PublicOnlyRoute = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicOnlyRoute