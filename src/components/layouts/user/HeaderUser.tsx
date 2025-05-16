import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, CalendarIcon, BellIcon, Bars3Icon, XMarkIcon,UserCircleIcon } from "@heroicons/react/24/outline";

const UserHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
          <div className="flex items-center space-x-3">
            <Link to="/user/profile" className="flex items-center">
          <UserCircleIcon className="h-8 w-8 text-white hover:text-gray-300" />
        </Link>
            <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Logout</button>
          </div>
        </nav>




        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

    
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <Link to="/home" className="block hover:text-gray-300">Home</Link>
          <Link to="/bookings" className="block hover:text-gray-300">Bookings</Link>
          <Link to="/notifications" className="block hover:text-gray-300">Notifications</Link>
          <div className="flex items-center space-x-3 mt-2">
            <img src="/images/avatar.png" alt="User" className="w-8 h-8 rounded-full" />
            <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">Logout</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
