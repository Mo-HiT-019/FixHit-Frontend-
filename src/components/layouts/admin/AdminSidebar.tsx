import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Technicians", path: "/admin/technicians" },
    { name: "Services", path: "/admin/services" },
    { name: "Wallet", path: "/admin/wallet" },
    { name: "Logout", path: "/logout" },
  ];

  return (
    <>
      
      <div className="md:hidden bg-gray-900 text-white p-4">
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
        } md:block w-64 bg-gray-900 text-white h-screen md:h-[calc(100vh-64px)] md:mt-0 md:sticky top-16 shadow-md`}
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

export default AdminSidebar;


