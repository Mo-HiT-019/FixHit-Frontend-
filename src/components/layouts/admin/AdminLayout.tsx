import { Outlet } from "react-router-dom";
import Header from "../Header";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex flex-col h-screen">
 
      <Header />

      <div className="flex overflow-hidden">
        <AdminSidebar />
        <main className="p-4 overflow-y-auto flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
