import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearTechnician } from "@/redux/slices/technicianSlice";
import {HomeIcon,CalendarIcon,BellIcon,Bars3Icon,XMarkIcon,UserCircleIcon,} from "@heroicons/react/24/outline";

const HeaderTechnician: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const technician = useSelector((state:RootState)=>state.technician.technician)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Technician from store,",technician)

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    dispatch(clearTechnician());
    navigate("/technicians/login");
  };

  return (
    <header className="bg-black text-white px-6 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">F!xH!t Technicians</h1>

        <nav className="hidden md:flex items-center space-x-6">

          <Link to="/notifications" className="hover:text-gray-300 flex items-center space-x-1">
            <BellIcon className="h-5 w-5" />
            <span>Notifications</span>
          </Link>

          {technician && (
            <div className="flex items-center space-x-3">
              <Link to="/user/profile" className="hover:text-gray-300 flex items-center space-x-2">
                <UserCircleIcon className="h-6 w-6" />
                <span className="text-sm">{technician.fullname? (technician.fullname.split(" ")[0]) : ""}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link to="/home" className="block hover:text-gray-300">
            Home
          </Link>
          <Link to="/bookings" className="block hover:text-gray-300">
            Bookings
          </Link>
          <Link to="/notifications" className="block hover:text-gray-300">
            Notifications
          </Link>
          {technician && (
            <div className="flex items-center justify-between mt-2">
              <Link to="/user/profile" className="flex items-center space-x-2">
                <UserCircleIcon className="h-6 w-6" />
                <span className="text-sm">{technician.fullname? (technician.fullname.split(" ")[0]) : ""}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderTechnician;
