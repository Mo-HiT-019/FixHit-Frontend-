import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const TechnicianSidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/technician/dashboard" },
    { name: "My Services", path: "/technician/services" },
    { name: "Chats", path: "/technician/chats" },
    { name: "My Profile", path: "/technicians/profile" },
    { name: "Service Requests", path: "/technician/service-requests" },
    { name: "Wallet", path: "/technician/wallet" },
  ];

  return (
    <>
      
      <div className="md:hidden bg-gray-900 text-white">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 border rounded"
        >
          {isOpen ? "<-" : "->"}
        </button>
      </div>

   
      <aside
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-64 bg-gray-900 text-white h-full md:h-full md:sticky md:top-0 shadow-md`}
      >
        <nav className="flex flex-col p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`p-3 rounded hover:bg-gray-700 transition ${
                pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default TechnicianSidebar;
