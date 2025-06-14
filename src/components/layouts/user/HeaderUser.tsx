import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearUser } from "@/redux/slices/userSlice";
import {HomeIcon,CalendarIcon,BellIcon,Bars3Icon,XMarkIcon,UserCircleIcon,} from "@heroicons/react/24/outline";
import axiosInstance from "@/api/axios";

const UserHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("user from store,",user)

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    dispatch(clearUser());
    axiosInstance.post("/users/logout")
    navigate("/login");
  };

  return (
    <header className="bg-black text-white px-6 py-3 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">F!xH!t</h1>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/home" className="hover:text-gray-300 flex items-center space-x-1">
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/bookings" className="hover:text-gray-300 flex items-center space-x-1">
            <CalendarIcon className="h-5 w-5" />
            <span>Bookings</span>
          </Link>
          <Link to="/notifications" className="hover:text-gray-300 flex items-center space-x-1">
            <BellIcon className="h-5 w-5" />
            <span>Notifications</span>
          </Link>

          {user && (
            <div className="flex items-center space-x-3">
              <Link to="/profile" className="hover:text-gray-300 flex items-center space-x-2">
                <UserCircleIcon className="h-6 w-6" />
                <span className="text-sm">{user.fullname? (user.fullname.split(" ")[0]) : ""}</span>
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
          {user && (
            <div className="flex items-center justify-between mt-2">
              <Link to="/user/profile" className="flex items-center space-x-2">
                <UserCircleIcon className="h-6 w-6" />
                <span className="text-sm">{user.fullname? (user.fullname.split(" ")[0]) : ""}</span>
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

export default UserHeader;
