import { Outlet } from "react-router-dom";
import UserHeader from "./HeaderUser";


export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <UserHeader />
      <main className="flex-grow overflow-y-auto ">
        <Outlet />
      </main>

    </div>
  );
}