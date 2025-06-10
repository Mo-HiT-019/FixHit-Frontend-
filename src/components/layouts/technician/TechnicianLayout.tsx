import { Outlet } from "react-router-dom";
import HeaderTechnician from "./HeaderTechnician";
import TechnicianSidebar from "./TechniciainSidebar";

export default function TechnicianLayout() {
  return (
    <div className="h-screen flex flex-col m-0 p-0">
      <HeaderTechnician />

      <div className="flex flex-1 overflow-hidden m-0 p-0">
        <TechnicianSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-100 m-0 p-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
