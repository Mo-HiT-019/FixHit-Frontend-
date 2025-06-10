import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  return (
    <div className="flex flex-col h-screen">
 
      <AdminHeader/>

      <div className="flex overflow-hidden">
        <AdminSidebar />
        <main className=" overflow-y-auto flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
