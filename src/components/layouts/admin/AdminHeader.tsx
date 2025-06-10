import React from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux"; 
import { clearAdmin } from "@/redux/slices/adminSlice";
import { RootState } from "@/redux/store"; 

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.admin.admin);
  const adminUsername = useSelector((state: RootState) => state.admin.admin?.username);


  const handleLogout = () => {

    dispatch(clearAdmin());
    navigate("/admin/login");
  };

  return (
    <header className="flex items-center justify-between bg-black px-6 py-3 shadow-md h-13">
      <Link to="/admin/dashboard" className="text-white text-xl font-bold">
        F!xH!t Admin
      </Link>

      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <>
            
            <button
              onClick={handleLogout}
              className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;